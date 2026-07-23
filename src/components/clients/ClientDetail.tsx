'use client'

import Link from 'next/link'
import { Button } from '@/components/ui'
import { FiChevronLeft } from '@/lib/icons'
import QuoteStatusBadge from '@/components/quotes/QuoteStatusBadge'
import { formatDate } from '@/lib/utils'
import type { QuoteStatus } from '@/lib/api'

interface Client {
  id: string
  name: string
  contact: string
}

interface Quote {
  id: string
  physio: { id: string; name: string }
  client: { id: string; name: string }
  startDate: string
  endDate: string
  status: QuoteStatus
}

interface ClientDetailProps {
  client: Client
  quotes: Quote[]
}

export default function ClientDetail({ client, quotes }: ClientDetailProps) {
  const sortedQuotes = [...quotes].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/clients">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <FiChevronLeft aria-hidden="true" />
            Volver
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-neutral-900">{client.name}</h1>
      </div>

      {/* Info card */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6 space-y-3">
        <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">
          Información del cliente
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-neutral-500">Nombre</p>
            <p className="text-sm font-medium text-neutral-900">{client.name}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500">Contacto</p>
            <p className="text-sm font-medium text-neutral-900">{client.contact}</p>
          </div>
        </div>
      </div>

      {/* Historial de citas */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900">Historial de citas</h2>

        {sortedQuotes.length === 0 ? (
          <div className="text-center py-12 text-neutral-500 bg-white rounded-lg border border-neutral-200">
            Este cliente no tiene citas registradas.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-neutral-200">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider"
                  >
                    Fisioterapeuta
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider"
                  >
                    Inicio
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider"
                  >
                    Fin
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider"
                  >
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {sortedQuotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-neutral-900">
                      {quote.physio.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-neutral-600">
                      {formatDate(quote.startDate)}
                    </td>
                    <td className="px-4 py-3 text-sm text-neutral-600">
                      {formatDate(quote.endDate)}
                    </td>
                    <td className="px-4 py-3">
                      <QuoteStatusBadge status={quote.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
