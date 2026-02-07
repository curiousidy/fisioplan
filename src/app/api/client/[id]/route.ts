import { clientController } from "@/modules/client/infrastructure/ClientController";
import { prismaClientRepository } from "@/modules/client/infrastructure/PrismaClientRepository";

const clientRepository = prismaClientRepository;
const clientManager = clientController(clientRepository);

//Obtener cliente por id
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return clientManager.findById(id);
}

//Borrar un cliente
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return clientManager.delete(id);
}

//Actualizar un cliente
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return clientManager.update(id, request);
}