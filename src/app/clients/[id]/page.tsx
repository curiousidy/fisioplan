import { notFound } from 'next/navigation'
import { fetchClientById, fetchQuotesByClientId, fetchPhysios } from '@/lib/api'
import ClientDetail from '@/components/clients/ClientDetail'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ClientDetailPage({ params }: Props) {
  const { id } = await params

  const [client, quotes, physios] = await Promise.all([
    fetchClientById(id),
    fetchQuotesByClientId(id),
    fetchPhysios(),
  ])

  if (!client) notFound()

  // Mismo patrón de fallback que quotes/page.tsx
  const physioMap = new Map(physios.map(p => [p.id, p]))
  const quotesResolved = quotes.map(q => ({
    ...q,
    physio: q.physio ?? physioMap.get(q.physioId) ?? { id: q.physioId, name: 'Desconocido' },
    client: q.client ?? { id: client.id, name: client.name },
  }))

  return <ClientDetail client={client} quotes={quotesResolved} />
}
