import { clientController } from '@/modules/client/infrastructure/ClientController';
import { prismaClientRepository } from '@/modules/client/infrastructure/PrismaClientRepository';


// Inyección de dependencias: ensamblar las capas
const clientRepository = prismaClientRepository;
const clientManager = clientController(clientRepository);


// Crear Cliente
export async function POST(request: Request) {
  return clientManager.create(request);
}
