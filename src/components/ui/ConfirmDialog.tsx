'use client'

import Modal from './Modal'
import Button from './Button'
import { FiAlertTriangle } from '@/lib/icons'

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmLabel?: string
  confirmVariant?: 'danger' | 'primary'
  loading?: boolean
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirmar',
  confirmVariant = 'danger',
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col gap-4">
        {/* Mensaje con icono de advertencia */}
        <div className="flex items-start gap-3">
          <FiAlertTriangle
            className="text-warning-500 mt-0.5 shrink-0 text-xl"
            aria-hidden="true"
          />
          <p className="text-neutral-700 text-sm">{message}</p>
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-2 mt-2">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={loading}
            type="button"
          >
            Cancelar
          </Button>
          <Button
            variant={confirmVariant}
            onClick={onConfirm}
            loading={loading}
            type="button"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
