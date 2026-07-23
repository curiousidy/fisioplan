'use client'

import { Button } from '@/components/ui'
import { FiEdit2, FiTrash2 } from '@/lib/icons'

export interface Physio {
  id: string
  name: string
}

interface PhysioListProps {
  physios: Physio[]
  onEdit: (physio: Physio) => void
  onDelete: (physio: Physio) => void
}

const AVATAR_COLORS = [
  'bg-blue-500',
  'bg-indigo-500',
  'bg-violet-500',
  'bg-emerald-500',
  'bg-teal-500',
  'bg-cyan-500',
  'bg-rose-500',
  'bg-orange-500',
]

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('')
}

function getColor(name: string): string {
  const index = name.charCodeAt(0) % AVATAR_COLORS.length
  return AVATAR_COLORS[index]
}

export default function PhysioList({ physios, onEdit, onDelete }: PhysioListProps) {
  if (physios.length === 0) {
    return (
      <div className="text-center py-12 text-neutral-500 text-sm">
        No hay fisioterapeutas registrados. ¡Agregá el primero!
      </div>
    )
  }

  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {physios.map((physio) => (
        <li
          key={physio.id}
          className="bg-white rounded-xl border border-neutral-200 flex flex-col items-center gap-3 p-5"
        >
          {/* Avatar */}
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0 ${getColor(physio.name)}`}
            aria-hidden="true"
          >
            {getInitials(physio.name)}
          </div>

          {/* Nombre */}
          <span className="text-sm font-semibold text-neutral-800 text-center leading-tight">
            {physio.name}
          </span>

          {/* Acciones */}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={() => onEdit(physio)}
              aria-label={`Editar ${physio.name}`}
            >
              <FiEdit2 aria-hidden="true" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={() => onDelete(physio)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
              aria-label={`Eliminar ${physio.name}`}
            >
              <FiTrash2 aria-hidden="true" />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}
