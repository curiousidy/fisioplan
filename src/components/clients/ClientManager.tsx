'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { FiPlus } from '@/lib/icons'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import SearchInput from '@/components/ui/SearchInput'
import ClientList, { Client } from './ClientList'
import ClientForm from './ClientForm'
import { createClient, updateClient, deleteClient } from '@/app/clients/actions'
import type { ClientFormValues } from '@/lib/schemas/client.schema'

interface ClientManagerProps {
  initialClients: Client[]
}

export default function ClientManager({ initialClients }: ClientManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [deletingClient, setDeletingClient] = useState<Client | null>(null)
  const [isPending, startTransition] = useTransition()
  const [search, setSearch] = useState('')

  function handleAdd() {
    setEditingClient(null)
    setIsModalOpen(true)
  }

  function handleEdit(client: Client) {
    setEditingClient(client)
    setIsModalOpen(true)
  }

  function handleDelete(client: Client) {
    setDeletingClient(client)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    setEditingClient(null)
  }

  function handleCloseConfirm() {
    setDeletingClient(null)
  }

  async function handleSubmit(data: ClientFormValues) {
    return new Promise<void>((resolve, reject) => {
      startTransition(async () => {
        try {
          let result
          if (editingClient) {
            result = await updateClient(editingClient.id, data)
          } else {
            result = await createClient(data)
          }

          if ('error' in result) {
            toast.error(result.error ?? 'Error al guardar')
            reject(new Error(result.error))
          } else {
            toast.success(
              editingClient
                ? 'Cliente actualizado correctamente'
                : 'Cliente creado correctamente'
            )
            handleCloseModal()
            resolve()
          }
        } catch {
          const msg = 'Ocurrió un error inesperado'
          toast.error(msg)
          reject(new Error(msg))
        }
      })
    })
  }

  function handleConfirmDelete() {
    if (!deletingClient) return
    startTransition(async () => {
      const result = await deleteClient(deletingClient.id)
      if ('error' in result) {
        toast.error(result.error ?? 'Error al eliminar')
      } else {
        toast.success('Cliente eliminado correctamente')
        handleCloseConfirm()
      }
    })
  }

  return (
    <div className="space-y-4">
      {/* Header con botón de acción */}
      <div className="flex justify-end">
        <Button
          variant="primary"
          onClick={handleAdd}
          disabled={isPending}
        >
          <FiPlus aria-hidden="true" />
          Agregar Cliente
        </Button>
      </div>

      {/* Búsqueda */}
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Buscar cliente..."
      />

      {/* Lista de clientes */}
      <ClientList
        clients={initialClients.filter((c) =>
          c.name.toLowerCase().includes(search.toLowerCase())
        )}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal create / edit */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingClient ? 'Editar cliente' : 'Nuevo cliente'}
      >
        <ClientForm
          defaultValues={
            editingClient
              ? { name: editingClient.name, contact: editingClient.contact }
              : undefined
          }
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          submitLabel={editingClient ? 'Guardar cambios' : 'Crear cliente'}
          isLoading={isPending}
        />
      </Modal>

      {/* Confirm delete */}
      <ConfirmDialog
        isOpen={!!deletingClient}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirmDelete}
        title="Eliminar cliente"
        message={
          deletingClient
            ? `¿Seguro que querés eliminar a "${deletingClient.name}"? Esta acción no se puede deshacer.`
            : ''
        }
        confirmLabel="Eliminar"
        confirmVariant="danger"
        loading={isPending}
      />
    </div>
  )
}
