'use client'

import { useState } from 'react'
import {
  FiChevronDown, FiChevronUp,
  FiCalendar, FiClock, FiCheck, FiX, FiUser, FiUsers,
} from '@/lib/icons'

interface Stat {
  label: string
  value: number
  icon: React.ElementType
  colorClass: string
}

interface CollapsibleMetricsProps {
  totalPhysios: number
  totalClients: number
  quotesToday: number
  quotesAgendadas: number
  quotesCompletadas: number
  quotesCanceladas: number
}

export default function CollapsibleMetrics({
  totalPhysios,
  totalClients,
  quotesToday,
  quotesAgendadas,
  quotesCompletadas,
  quotesCanceladas,
}: CollapsibleMetricsProps) {
  const [open, setOpen] = useState(false)

  const stats: Stat[] = [
    { label: 'Citas hoy',     value: quotesToday,       icon: FiCalendar, colorClass: 'text-primary-600' },
    { label: 'Agendadas',     value: quotesAgendadas,   icon: FiClock,    colorClass: 'text-yellow-500'  },
    { label: 'Completadas',   value: quotesCompletadas, icon: FiCheck,    colorClass: 'text-green-600'   },
    { label: 'Canceladas',    value: quotesCanceladas,  icon: FiX,        colorClass: 'text-red-500'     },
    { label: 'Clientes',      value: totalClients,      icon: FiUser,     colorClass: 'text-neutral-500' },
    { label: 'Fisios',          value: totalPhysios,    icon: FiUsers,    colorClass: 'text-neutral-500' },
  ]

  return (
    <div className="border border-neutral-200 rounded-lg bg-white">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors rounded-lg"
        aria-expanded={open}
      >
        <span>Resumen</span>
        {open ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
      </button>

      {open && (
        <div className="border-t border-neutral-100">
          {/* Mobile: fila compacta con separadores */}
          <div className="flex flex-wrap gap-y-3 px-4 py-3 md:hidden">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="flex items-center">
                  <div className="flex items-center gap-2 px-4">
                    <Icon size={14} className={stat.colorClass} aria-hidden="true" />
                    <span className="text-xs text-neutral-500">{stat.label}</span>
                    <span className={`text-sm font-bold ${stat.colorClass}`}>{stat.value}</span>
                  </div>
                  {i < stats.length - 1 && (
                    <div className="w-px h-4 bg-neutral-200" aria-hidden="true" />
                  )}
                </div>
              )
            })}
          </div>

          {/* Desktop: grilla de 6 columnas con más jerarquía */}
          <div className="hidden md:grid grid-cols-6 divide-x divide-neutral-100">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="flex flex-col items-center gap-1 py-4 px-3">
                  <Icon size={18} className={stat.colorClass} aria-hidden="true" />
                  <span className={`text-2xl font-bold ${stat.colorClass}`}>{stat.value}</span>
                  <span className="text-xs text-neutral-400 text-center truncate w-full px-1">{stat.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
