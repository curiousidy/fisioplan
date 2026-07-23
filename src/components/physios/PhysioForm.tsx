'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { physioSchema, PhysioFormValues } from '@/lib/schemas/physio.schema'
import { Input, Button } from '@/components/ui'

interface PhysioFormProps {
  defaultValues?: PhysioFormValues
  onSubmit: (data: PhysioFormValues) => Promise<void>
  onCancel: () => void
  submitLabel?: string
}

export default function PhysioForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel = 'Guardar',
}: PhysioFormProps) {
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PhysioFormValues>({
    resolver: zodResolver(physioSchema),
    defaultValues: defaultValues ?? { name: '' },
  })

  const handleFormSubmit = async (data: PhysioFormValues) => {
    setServerError(null)
    try {
      await onSubmit(data)
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : 'Ocurrió un error inesperado'
      )
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
      <Input
        label="Nombre"
        placeholder="Ej: María García"
        error={errors.name?.message}
        {...register('name')}
      />

      {serverError && (
        <p className="text-danger-500 text-sm" role="alert">
          {serverError}
        </p>
      )}

      <div className="flex justify-end gap-2 mt-2">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          loading={isSubmitting}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
