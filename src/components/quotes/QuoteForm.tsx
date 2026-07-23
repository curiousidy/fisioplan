'use client'

import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  quoteCreateSchema,
  quoteUpdateSchema,
  QuoteCreateFormValues,
  QuoteUpdateFormValues,
} from '@/lib/schemas/quote.schema'
import Button from '@/components/ui/Button'

interface Physio {
  id: string
  name: string
}

interface Client {
  id: string
  name: string
}

interface QuoteFormProps {
  mode: 'create' | 'edit'
  physios: Physio[]
  clients: Client[]
  defaultValues?: Partial<QuoteCreateFormValues & QuoteUpdateFormValues>
  onSubmit: (data: QuoteCreateFormValues | QuoteUpdateFormValues) => Promise<void>
  onCancel: () => void
  submitLabel?: string
  isPending?: boolean
}

const statusOptions: { value: 'agendada' | 'completada' | 'cancelada'; label: string }[] = [
  { value: 'agendada', label: 'Agendada' },
  { value: 'completada', label: 'Completada' },
  { value: 'cancelada', label: 'Cancelada' },
]

const inputClasses =
  'border border-neutral-300 rounded-md px-3 py-2 w-full text-neutral-900 ' +
  'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ' +
  'bg-white transition-colors duration-150'

const errorInputClasses =
  'border border-red-500 rounded-md px-3 py-2 w-full text-neutral-900 ' +
  'focus:outline-none focus:ring-2 focus:ring-red-500 ' +
  'bg-white transition-colors duration-150'

export default function QuoteForm({
  mode,
  physios,
  clients,
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel,
  isPending = false,
}: QuoteFormProps) {
  const isCreate = mode === 'create'
  const schema = isCreate ? quoteCreateSchema : quoteUpdateSchema

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuoteCreateFormValues | QuoteUpdateFormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ?? {},
  })
  const [submissionError, setSubmissionError] = useState<string | null>(null)
  const isMountedRef = useRef(true)
  const isSubmitLockedRef = useRef(false)
  const submissionPending = isPending || isSubmitting

  useEffect(() => () => {
    isMountedRef.current = false
  }, [])

  const handleFormSubmit = handleSubmit(async (data) => {
    if (isSubmitLockedRef.current) return

    isSubmitLockedRef.current = true
    setSubmissionError(null)
    try {
      await onSubmit(data)
    } catch (error) {
      if (isMountedRef.current) {
        setSubmissionError(error instanceof Error ? error.message : 'Ocurrió un error inesperado')
      }
    } finally {
      isSubmitLockedRef.current = false
    }
  })

  // Type narrowing helpers for error access
  const createErrors = errors as Partial<Record<keyof QuoteCreateFormValues, { message?: string }>>
  const updateErrors = errors as Partial<Record<keyof QuoteUpdateFormValues, { message?: string }>>

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4" noValidate>
      {/* Fisioterapeuta — solo en create */}
      {isCreate && (
        <div className="flex flex-col gap-1">
          <label htmlFor="physio_id" className="text-sm font-medium text-neutral-700">
            Fisioterapeuta <span className="text-red-500">*</span>
          </label>
          <select
            id="physio_id"
            {...register('physio_id' as keyof QuoteCreateFormValues)}
            disabled={submissionPending}
            className={createErrors.physio_id ? errorInputClasses : inputClasses}
          >
            <option value="">Seleccioná un fisioterapeuta</option>
            {physios.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          {createErrors.physio_id && (
            <p className="text-red-500 text-sm" role="alert">
              {createErrors.physio_id.message}
            </p>
          )}
        </div>
      )}

      {/* Cliente — solo en create */}
      {isCreate && (
        <div className="flex flex-col gap-1">
          <label htmlFor="client_id" className="text-sm font-medium text-neutral-700">
            Cliente <span className="text-red-500">*</span>
          </label>
          <select
            id="client_id"
            {...register('client_id' as keyof QuoteCreateFormValues)}
            disabled={submissionPending}
            className={createErrors.client_id ? errorInputClasses : inputClasses}
          >
            <option value="">Seleccioná un cliente</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {createErrors.client_id && (
            <p className="text-red-500 text-sm" role="alert">
              {createErrors.client_id.message}
            </p>
          )}
        </div>
      )}

      {/* Fecha y hora */}
      <div className="flex flex-col gap-1">
        <label htmlFor="startDate" className="text-sm font-medium text-neutral-700">
          {isCreate ? 'Fecha y hora' : 'Fecha de inicio'} <span className="text-red-500">*</span>
        </label>
        <input
          id="startDate"
          type="datetime-local"
          {...register('startDate')}
          disabled={submissionPending}
          className={
            (isCreate ? createErrors.startDate : updateErrors.startDate)
              ? errorInputClasses
              : inputClasses
          }
        />
        {isCreate && createErrors.startDate && (
          <p className="text-red-500 text-sm" role="alert">
            {createErrors.startDate.message}
          </p>
        )}
        {!isCreate && updateErrors.startDate && (
          <p className="text-red-500 text-sm" role="alert">
            {updateErrors.startDate.message}
          </p>
        )}
      </div>

      {/* Fecha de fin — solo en edit */}
      {!isCreate && (
        <div className="flex flex-col gap-1">
          <label htmlFor="endDate" className="text-sm font-medium text-neutral-700">
            Fecha de fin
          </label>
          <input
            id="endDate"
            type="datetime-local"
            {...register('endDate')}
            disabled={submissionPending}
            className={updateErrors.endDate ? errorInputClasses : inputClasses}
          />
          {updateErrors.endDate && (
            <p className="text-red-500 text-sm" role="alert">
              {updateErrors.endDate.message}
            </p>
          )}
        </div>
      )}

      {/* Status — solo en edit */}
      {!isCreate && (
        <div className="flex flex-col gap-1">
          <label htmlFor="status" className="text-sm font-medium text-neutral-700">
            Estado
          </label>
          <select
            id="status"
            {...register('status' as keyof QuoteUpdateFormValues)}
            disabled={submissionPending}
            className={updateErrors.status ? errorInputClasses : inputClasses}
          >
            <option value="">Sin cambios</option>
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {updateErrors.status && (
            <p className="text-red-500 text-sm" role="alert">
              {updateErrors.status.message}
            </p>
          )}
        </div>
      )}

      {/* Error raíz (refine cross-field) */}
      {errors.root && (
        <p className="text-red-500 text-sm" role="alert">
          {errors.root.message}
        </p>
      )}
      {submissionError && (
        <p className="text-red-500 text-sm" role="alert">
          {submissionError}
        </p>
      )}

      {/* Acciones */}
      <div className="flex justify-end gap-2 pt-2">
        <Button
          variant="secondary"
          type="button"
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          type="submit"
          loading={submissionPending}
        >
          {submissionPending
            ? (isCreate ? 'Creando cita...' : 'Guardando cambios...')
            : (submitLabel ?? (isCreate ? 'Crear cita' : 'Guardar cambios'))}
        </Button>
      </div>
    </form>
  )
}
