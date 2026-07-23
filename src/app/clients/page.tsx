import { fetchClients } from '@/lib/api'
import ClientManager from '@/components/clients/ClientManager'

export default async function ClientsPage() {
  const clients = await fetchClients()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Clientes</h1>
        <p className="text-neutral-600 mt-1">Gestión de pacientes y clientes</p>
      </div>
      <ClientManager initialClients={clients} />
    </div>
  )
}
