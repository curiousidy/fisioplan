// Server Component — sin 'use client'
import StatCard from '@/components/ui/StatCard'
import { FiCalendar, FiClock, FiCheck, FiX, FiUser, FiUsers } from '@/lib/icons'

interface MetricsRowProps {
  totalPhysios: number
  totalClients: number
  quotesToday: number
  quotesAgendadas: number
  quotesCompletadas: number
  quotesCanceladas: number
}

export default function MetricsRow({
  totalPhysios,
  totalClients,
  quotesToday,
  quotesAgendadas,
  quotesCompletadas,
  quotesCanceladas,
}: MetricsRowProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      <StatCard
        label="Citas hoy"
        value={quotesToday}
        icon={<FiCalendar />}
        colorClass="text-primary-600"
      />
      <StatCard
        label="Agendadas"
        value={quotesAgendadas}
        icon={<FiClock />}
        colorClass="text-yellow-500"
      />
      <StatCard
        label="Completadas"
        value={quotesCompletadas}
        icon={<FiCheck />}
        colorClass="text-green-600"
      />
      <StatCard
        label="Canceladas"
        value={quotesCanceladas}
        icon={<FiX />}
        colorClass="text-red-500"
      />
      <StatCard
        label="Clientes"
        value={totalClients}
        icon={<FiUser />}
        colorClass="text-neutral-600"
      />
      <StatCard
        label="Fisioterapeutas"
        value={totalPhysios}
        icon={<FiUsers />}
        colorClass="text-neutral-600"
      />
    </div>
  )
}
