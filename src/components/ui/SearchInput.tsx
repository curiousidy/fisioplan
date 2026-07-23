'use client'
import { FiSearch, FiX } from '@/lib/icons'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Buscar por nombre...',
  className,
}: SearchInputProps) {
  return (
    <div className={`relative flex items-center ${className ?? ''}`}>
      <FiSearch className="absolute left-3 text-neutral-400" size={16} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-2 rounded-md border border-neutral-300 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-150"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3 text-neutral-400 hover:text-neutral-700 transition-colors"
          aria-label="Limpiar búsqueda"
        >
          <FiX size={14} />
        </button>
      )}
    </div>
  )
}
