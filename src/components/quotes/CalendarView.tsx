'use client'

import { type Ref, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from '@/lib/icons'
import QuoteStatusBadge from './QuoteStatusBadge'

type QuoteStatus = 'agendada' | 'completada' | 'cancelada'

interface Quote {
  id: string
  physio: { id: string; name: string }
  client: { id: string; name: string }
  startDate: string
  endDate: string
  status: QuoteStatus
}

interface CalendarViewProps {
  quotes: Quote[]
  onSelectEvent?: (quote: Quote, origin: HTMLButtonElement) => void
  headingRef?: Ref<HTMLHeadingElement>
}

function formatMonthYear(date: Date): string {
  return date.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' })
}

function formatDayHeader(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-AR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  })
}

function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatAppointmentName(quote: Quote): string {
  return [
    quote.client.name,
    quote.physio.name,
    formatDayHeader(quote.startDate),
    `${formatTime(quote.startDate)} - ${formatTime(quote.endDate)}`,
    quote.status,
  ].join(', ')
}

function isSameMonth(isoString: string, ref: Date): boolean {
  const d = new Date(isoString)
  return d.getFullYear() === ref.getFullYear() && d.getMonth() === ref.getMonth()
}

function groupByDay(quotes: Quote[]): { day: string; quotes: Quote[] }[] {
  const map = new Map<string, Quote[]>()
  for (const q of quotes) {
    const key = new Date(q.startDate).toISOString().slice(0, 10)
    const group = map.get(key) ?? []
    group.push(q)
    map.set(key, group)
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([day, quotes]) => ({ day, quotes }))
}

export default function CalendarView({ quotes, onSelectEvent, headingRef }: CalendarViewProps) {
  const [month, setMonth] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })

  function prevMonth() {
    setMonth(m => new Date(m.getFullYear(), m.getMonth() - 1, 1))
  }

  function nextMonth() {
    setMonth(m => new Date(m.getFullYear(), m.getMonth() + 1, 1))
  }

  const monthQuotes = quotes.filter(q => isSameMonth(q.startDate, month))
  const groups = groupByDay(monthQuotes)

  return (
    <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
      {/* Navegación de mes */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100">
        <button
          type="button"
          onClick={prevMonth}
          className="p-1.5 rounded-md text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
          aria-label="Mes anterior"
        >
          <FiChevronLeft size={18} />
        </button>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="text-sm font-semibold text-neutral-800 capitalize"
        >
          {formatMonthYear(month)}
        </h2>
        <button
          type="button"
          onClick={nextMonth}
          className="p-1.5 rounded-md text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
          aria-label="Mes siguiente"
        >
          <FiChevronRight size={18} />
        </button>
      </div>

      {/* Lista de citas agrupadas por día */}
      {groups.length === 0 ? (
        <p className="text-sm text-neutral-400 text-center py-12">
          No hay citas este mes.
        </p>
      ) : (
        <ul className="divide-y divide-neutral-100">
          {groups.map(({ day, quotes: dayQuotes }) => (
            <li key={day}>
              {/* Cabecera de día */}
              <div className="px-4 py-2 bg-neutral-50 text-xs font-semibold text-neutral-500 uppercase tracking-wide capitalize">
                {formatDayHeader(day + 'T00:00:00')}
              </div>
              {/* Citas del día */}
              <ul className="divide-y divide-neutral-50">
                {dayQuotes.map(q => (
                  <li key={q.id}>
                    <button
                      id={`appointment-${q.id}`}
                      type="button"
                      onClick={(event) => onSelectEvent?.(q, event.currentTarget)}
                      aria-label={formatAppointmentName(q)}
                      className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left hover:bg-neutral-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500"
                    >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xs text-neutral-400 shrink-0 tabular-nums">
                        {formatTime(q.startDate)} → {formatTime(q.endDate)}
                      </span>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-neutral-900 truncate">{q.client.name}</span>
                        <span className="text-xs text-neutral-500 truncate">{q.physio.name}</span>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <QuoteStatusBadge status={q.status} />
                    </div>
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
