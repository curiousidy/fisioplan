import { physioController } from '@/modules/physio/infrastructure/PhysioController';
import { prismaPhysioRepository } from '@/modules/physio/infrastructure/PrismaPhysioRepository';


const physioRepository = prismaPhysioRepository;
const physioManager = physioController(physioRepository);

// Obtener fisioterapeuta por id
export async function GET({ params }: { params: { id: string } }) {
  const { id } = params;
  return physioManager.findById(id);
}

// Actualizar un fisioterapeuta
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  return physioManager.update(id, request);
}

// Borrar un fisioterapeuta
export async function DELETE({ params }: { params: { id: string } }) {
  const { id } = params;
  return physioManager.delete(id);
}
