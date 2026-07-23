'use client'

import Link from 'next/link'
import { FiEdit2, FiTrash2 } from '@/lib/icons'
import Button from '@/components/ui/Button'

export interface Client {
  id: string
  name: string
  contact: string
}

interface ClientListProps {
  clients: Client[]
  onEdit: (client: Client) => void
  onDelete: (client: Client) => void
}

export default function ClientList({ clients, onEdit, onDelete }: ClientListProps) {
  if (clients.length === 0) {
    return (
      <div className="text-center py-12 text-neutral-500">
        No hay clientes registrados.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200">
      <table className="min-w-full divide-y divide-neutral-200">
        <thead className="bg-neutral-50">
          <tr>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider"
            >
              Nombre
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider"
            >
              Contacto
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-right text-xs font-semibold text-neutral-500 uppercase tracking-wider"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-neutral-200">
          {clients.map((client) => (
            <tr key={client.id} className="hover:bg-neutral-50 transition-colors">
              <td className="px-4 py-3 text-sm font-medium text-neutral-900">
                <Link
                  href={`/clients/${client.id}`}
                  className="text-primary-600 hover:text-primary-700 hover:underline"
                >
                  {client.name}
                </Link>
              </td>
              <td className="px-4 py-3 text-sm text-neutral-600">
                {client.contact}
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(client)}
                    aria-label={`Editar ${client.name}`}
                  >
                    <FiEdit2 aria-hidden="true" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(client)}
                    aria-label={`Eliminar ${client.name}`}
                    className="text-danger-500 hover:text-red-700"
                  >
                    <FiTrash2 aria-hidden="true" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
