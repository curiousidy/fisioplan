// Server Component — sin 'use client'
import { formatDate } from '@/lib/utils'
import QuoteStatusBadge from '@/components/quotes/QuoteStatusBadge'

interface Quote {
  id: string
  physio: { id: string; name: string }
  client: { id: string; name: string }
  startDate: string
  endDate: string
  status: 'agendada' | 'completada' | 'cancelada'
}

interface RecentQuotesProps {
  quotes: Quote[]
}

export default function RecentQuotes({ quotes }: RecentQuotesProps) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const weekEnd = new Date(today)
  weekEnd.setDate(weekEnd.getDate() + 7)
  weekEnd.setHours(23, 59, 59, 999)

  const recent = quotes
    .filter(q => {
      const d = new Date(q.startDate)
      return d >= today && d <= weekEnd
    })
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())

  if (recent.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-neutral-200 p-8 text-center">
        <p className="text-neutral-500 text-sm">No hay citas en los próximos 7 días.</p>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {recent.map((quote) => (
        <li
          key={quote.id}
          className="bg-white rounded-lg border border-neutral-200 px-4 py-3 flex items-center justify-between gap-4"
        >
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-sm font-semibold text-neutral-900 truncate">{quote.client.name}</span>
            <span className="text-xs text-neutral-500 truncate">{quote.physio.name} · {formatDate(quote.startDate)}</span>
          </div>
          <div className="shrink-0">
            <QuoteStatusBadge status={quote.status} />
          </div>
        </li>
      ))}
    </ul>
  )
}
