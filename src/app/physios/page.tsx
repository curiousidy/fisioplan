import { fetchPhysios } from '@/lib/api'
import PhysioManager from '@/components/physios/PhysioManager'

export default async function PhysiosPage() {
  const physios = await fetchPhysios()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Fisioterapeutas</h1>
        <p className="text-neutral-600 mt-1">Gestión del equipo de fisioterapeutas</p>
      </div>
      <PhysioManager initialPhysios={physios} />
    </div>
  )
}
