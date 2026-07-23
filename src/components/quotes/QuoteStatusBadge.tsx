import { Badge } from '@/components/ui'

type QuoteStatus = 'agendada' | 'completada' | 'cancelada'

interface QuoteStatusBadgeProps {
  status: QuoteStatus
}

const statusLabels: Record<QuoteStatus, string> = {
  agendada: 'Agendada',
  completada: 'Completada',
  cancelada: 'Cancelada',
}

const statusVariants: Record<QuoteStatus, 'agendada' | 'completada' | 'cancelada'> = {
  agendada: 'agendada',
  completada: 'completada',
  cancelada: 'cancelada',
}

export default function QuoteStatusBadge({ status }: QuoteStatusBadgeProps) {
  return (
    <Badge variant={statusVariants[status]}>
      {statusLabels[status]}
    </Badge>
  )
}
