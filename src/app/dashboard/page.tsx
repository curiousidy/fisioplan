import { fetchQuotes, fetchPhysios, fetchClients } from '@/lib/api'
import CollapsibleMetrics from '@/components/dashboard/CollapsibleMetrics'
import RecentQuotes from '@/components/dashboard/RecentQuotes'

export default async function DashboardPage() {
  const [rawQuotes, physios, clients] = await Promise.all([
    fetchQuotes(),
    fetchPhysios(),
    fetchClients(),
  ])

  // Construir mapa de id → { id, name } para physios y clients (fallback si no vienen embebidos)
  const physioMap = new Map(physios.map((p) => [p.id, p]))
  const clientMap = new Map(clients.map((c) => [c.id, c]))

  // Mapear QuoteDTOs a objetos con physio/client anidados — mismo patrón que quotes/page.tsx
  const quotes = rawQuotes.map((q) => ({
    id: q.id,
    startDate: q.startDate,
    endDate: q.endDate,
    status: q.status,
    physio: q.physio ?? physioMap.get(q.physioId) ?? { id: q.physioId, name: 'Desconocido' },
    client: q.client ?? clientMap.get(q.clientId) ?? { id: q.clientId, name: 'Desconocido' },
  }))

  // Calcular métricas
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const quotesToday = quotes.filter((q) => {
    const d = new Date(q.startDate)
    return d >= today && d < tomorrow
  }).length

  const quotesAgendadas = quotes.filter((q) => q.status === 'agendada').length
  const quotesCompletadas = quotes.filter((q) => q.status === 'completada').length
  const quotesCanceladas = quotes.filter((q) => q.status === 'cancelada').length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-600 mt-1">Resumen del sistema</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-neutral-800 mb-4">Citas recientes</h2>
        <RecentQuotes quotes={quotes} />
      </div>
      <CollapsibleMetrics
        totalPhysios={physios.length}
        totalClients={clients.length}
        quotesToday={quotesToday}
        quotesAgendadas={quotesAgendadas}
        quotesCompletadas={quotesCompletadas}
        quotesCanceladas={quotesCanceladas}
      />
    </div>
  )
}
