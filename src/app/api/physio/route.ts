import { physioController } from '@/modules/physio/infrastructure/PhysioController';
import { prismaPhysioRepository } from '@/modules/physio/infrastructure/PrismaPhysioRepository';

// Inyección de dependencias: ensamblar las capas
const physioRepository = prismaPhysioRepository;
const physioManager = physioController(physioRepository);

// Listar todos los fisioterapeutas
export async function GET() {
  return physioManager.findAll();
}

// Crear fisioterapeuta
export async function POST(request: Request) {
  return physioManager.create(request);
}
