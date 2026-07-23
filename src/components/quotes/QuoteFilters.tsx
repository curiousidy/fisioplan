'use client'

import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { FiRefreshCw } from '@/lib/icons'

interface Physio {
  id: string
  name: string
}

export type QuoteFilterState = {
  physioId: string
  status: string
  date: string
}

interface QuoteFiltersProps {
  physios: Physio[]
  filters: QuoteFilterState
  onChange: (filters: QuoteFilterState) => void
  onReset: () => void
}

export default function QuoteFilters({
  physios,
  filters,
  onChange,
  onReset,
}: QuoteFiltersProps) {
  function handleChange(key: keyof QuoteFilterState, value: string) {
    onChange({ ...filters, [key]: value })
  }

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Fisioterapeuta */}
      <div className="min-w-[180px] flex-1">
        <Select
          value={filters.physioId}
          onChange={(e) => handleChange('physioId', e.target.value)}
        >
          <option value="">Fisioterapeutas</option>
          {physios.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </Select>
      </div>

      {/* Estado */}
      <div className="min-w-[160px] flex-1">
        <Select
          value={filters.status}
          onChange={(e) => handleChange('status', e.target.value)}
        >
          <option value="">Todos los estados</option>
          <option value="agendada">Agendada</option>
          <option value="completada">Completada</option>
          <option value="cancelada">Cancelada</option>
        </Select>
      </div>

      {/* Fecha */}
      <div className="min-w-[150px] flex-1">
        <input
          type="date"
          value={filters.date}
          onChange={(e) => handleChange('date', e.target.value)}
          className="h-9 w-full border rounded-md px-3 bg-white text-neutral-900 border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-150 text-sm"
          aria-label="Fecha"
        />
      </div>

      {/* Limpiar filtros */}
      <Button
        type="button"
        variant="ghost"
        onClick={onReset}
        aria-label="Limpiar filtros"
      >
        <FiRefreshCw aria-hidden="true" />
        Limpiar filtros
      </Button>
    </div>
  )
}
