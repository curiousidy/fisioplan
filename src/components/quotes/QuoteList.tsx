'use client'

import { FiEdit2, FiTrash2 } from '@/lib/icons'
import Button from '@/components/ui/Button'
import QuoteStatusBadge from './QuoteStatusBadge'
import { formatDate, formatTime } from '@/lib/utils'

type QuoteStatus = 'agendada' | 'completada' | 'cancelada'

export interface Quote {
  id: string
  physio: { id: string; name: string }
  client: { id: string; name: string }
  startDate: string
  endDate: string
  status: QuoteStatus
}

interface QuoteListProps {
  quotes: Quote[]
  onEdit: (quote: Quote) => void
  onDelete: (quote: Quote) => void
}

export default function QuoteList({ quotes, onEdit, onDelete }: QuoteListProps) {
  if (quotes.length === 0) {
    return (
      <div className="text-center py-12 text-neutral-500">
        No hay citas registradas.
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {quotes.map((quote) => (
        <li
          key={quote.id}
          className="bg-white rounded-lg border border-neutral-200 px-4 py-3 flex flex-col gap-1.5"
        >
          {/* Fila 1: cliente + estado */}
          <div className="flex items-start justify-between gap-3">
            <span className="text-sm font-semibold text-neutral-900 leading-snug">{quote.client.name}</span>
            <div className="shrink-0">
              <QuoteStatusBadge status={quote.status} />
            </div>
          </div>

          {/* Fila 2: fisioterapeuta */}
          <span className="text-xs text-neutral-500">{quote.physio.name}</span>

          {/* Fila 3: fecha + acciones */}
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-neutral-400">
              {formatDate(quote.startDate)} → {formatTime(quote.endDate)}
            </span>
            <div className="flex gap-1 shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(quote)}
                aria-label={`Editar cita de ${quote.client.name}`}
                type="button"
              >
                <FiEdit2 aria-hidden="true" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(quote)}
                aria-label={`Eliminar cita de ${quote.client.name}`}
                type="button"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <FiTrash2 aria-hidden="true" />
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
