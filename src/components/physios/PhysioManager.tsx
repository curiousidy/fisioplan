'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Modal, Button, ConfirmDialog, SearchInput } from '@/components/ui'
import { FiPlus } from '@/lib/icons'
import PhysioList, { type Physio } from './PhysioList'
import PhysioForm from './PhysioForm'
import { createPhysio, updatePhysio, deletePhysio } from '@/app/physios/actions'
import type { PhysioFormValues } from '@/lib/schemas/physio.schema'

interface PhysioManagerProps {
  initialPhysios: Physio[]
}

export default function PhysioManager({ initialPhysios }: PhysioManagerProps) {
  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null)
  const [selectedPhysio, setSelectedPhysio] = useState<Physio | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Physio | null>(null)
  const [isPending, startTransition] = useTransition()
  const [search, setSearch] = useState('')

  const handleOpenCreate = () => {
    setSelectedPhysio(null)
    setModalMode('create')
  }

  const handleOpenEdit = (physio: Physio) => {
    setSelectedPhysio(physio)
    setModalMode('edit')
  }

  const handleOpenDelete = (physio: Physio) => {
    setDeleteTarget(physio)
  }

  const handleCloseModal = () => {
    setModalMode(null)
    setSelectedPhysio(null)
  }

  const handleCloseConfirm = () => {
    setDeleteTarget(null)
  }

  const handleSubmit = async (data: PhysioFormValues): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      startTransition(async () => {
        try {
          let result
          if (modalMode === 'edit' && selectedPhysio) {
            result = await updatePhysio(selectedPhysio.id, data)
          } else {
            result = await createPhysio(data)
          }

          if ('error' in result) {
            toast.error(result.error ?? 'Error al guardar')
            reject(new Error(result.error))
          } else {
            toast.success(
              modalMode === 'edit'
                ? 'Fisioterapeuta actualizado correctamente'
                : 'Fisioterapeuta creado correctamente'
            )
            handleCloseModal()
            resolve()
          }
        } catch (err) {
          reject(err)
        }
      })
    })
  }

  const handleConfirmDelete = () => {
    if (!deleteTarget) return
    startTransition(async () => {
      const result = await deletePhysio(deleteTarget.id)
      if ('error' in result) {
        toast.error(result.error ?? 'Error al eliminar')
      } else {
        toast.success('Fisioterapeuta eliminado correctamente')
      }
      handleCloseConfirm()
    })
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header con botón de agregar */}
      <div className="flex justify-end">
        <Button
          type="button"
          variant="primary"
          onClick={handleOpenCreate}
        >
          <FiPlus aria-hidden="true" />
          Agregar Fisioterapeuta
        </Button>
      </div>

      {/* Búsqueda */}
      <SearchInput
        placeholder="Buscar fisioterapeuta..."
        value={search}
        onChange={setSearch}
      />

      {/* Lista */}
      <div className="bg-white rounded-lg border border-neutral-200 p-4">
        <PhysioList
          physios={initialPhysios.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
          )}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />
      </div>

      {/* Modal Create/Edit */}
      <Modal
        isOpen={modalMode !== null}
        onClose={handleCloseModal}
        title={modalMode === 'edit' ? 'Editar Fisioterapeuta' : 'Nuevo Fisioterapeuta'}
      >
        <PhysioForm
          key={selectedPhysio?.id ?? 'create'}
          defaultValues={selectedPhysio ? { name: selectedPhysio.name } : undefined}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          submitLabel={modalMode === 'edit' ? 'Guardar cambios' : 'Crear'}
        />
      </Modal>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteTarget !== null}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirmDelete}
        title="Eliminar Fisioterapeuta"
        message={`¿Estás seguro que querés eliminar a "${deleteTarget?.name}"? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        loading={isPending}
      />
    </div>
  )
}
