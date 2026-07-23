import { fetchQuotes, fetchPhysios, fetchClients } from '@/lib/api'
import QuoteManager from '@/components/quotes/QuoteManager'
import type { Quote } from '@/components/quotes/QuoteList'

export default async function QuotesPage() {
  const [rawQuotes, physios, clients] = await Promise.all([
    fetchQuotes(),
    fetchPhysios(),
    fetchClients(),
  ])

  // Construir mapa de id → { id, name } para physios y clients
  const physioMap = new Map(physios.map((p) => [p.id, p]))
  const clientMap = new Map(clients.map((c) => [c.id, c]))

  // Mapear los QuoteDTOs a Quotes con objetos physio/client anidados
  const quotes: Quote[] = rawQuotes.map((q) => ({
    id: q.id,
    startDate: q.startDate,
    endDate: q.endDate,
    status: q.status,
    physio: q.physio ?? physioMap.get(q.physioId) ?? { id: q.physioId, name: 'Desconocido' },
    client: q.client ?? clientMap.get(q.clientId) ?? { id: q.clientId, name: 'Desconocido' },
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Citas</h1>
        <p className="text-neutral-600 mt-1">Gestión de citas y sesiones</p>
      </div>
      <QuoteManager
        initialQuotes={quotes}
        physios={physios}
        clients={clients}
      />
    </div>
  )
}
