import { FiLoader } from '@/lib/icons'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-xl',
  lg: 'text-3xl',
}

export default function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  return (
    <FiLoader
      className={['animate-spin', sizeClasses[size], className]
        .filter(Boolean)
        .join(' ')}
      aria-label="Cargando…"
    />
  )
}
