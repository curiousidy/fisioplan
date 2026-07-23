'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { clientSchema, ClientFormValues } from '@/lib/schemas/client.schema'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

interface ClientFormProps {
  defaultValues?: Partial<ClientFormValues>
  onSubmit: (data: ClientFormValues) => Promise<void>
  onCancel: () => void
  submitLabel?: string
  isLoading?: boolean
}

export default function ClientForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel = 'Guardar',
  isLoading = false,
}: ClientFormProps) {
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      contact: defaultValues?.contact ?? '',
    },
  })

  const isPending = isLoading || isSubmitting

  async function handleFormSubmit(data: ClientFormValues) {
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
        placeholder="Nombre completo del cliente"
        error={errors.name?.message}
        disabled={isPending}
        {...register('name')}
      />

      <Input
        label="Contacto"
        placeholder="Email o teléfono"
        error={errors.contact?.message}
        disabled={isPending}
        {...register('contact')}
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
          disabled={isPending}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          loading={isPending}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
