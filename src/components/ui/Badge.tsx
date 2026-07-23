type BadgeVariant = 'agendada' | 'completada' | 'cancelada' | 'default'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
}

const variantClasses: Record<BadgeVariant, string> = {
  agendada: 'bg-blue-100 text-blue-700',
  completada: 'bg-green-100 text-green-700',
  cancelada: 'bg-red-100 text-red-700',
  default: 'bg-neutral-100 text-neutral-700',
}

export default function Badge({ variant = 'default', children }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variantClasses[variant],
      ].join(' ')}
    >
      {children}
    </span>
  )
}
