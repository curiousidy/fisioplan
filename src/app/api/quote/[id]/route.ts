import { prismaQuoteRepository } from "@/modules/quotes/infrastructure/PrismaQuoteRepository";
import { QuoteController } from "@/modules/quotes/infrastructure/QuoteController";

const quoteRepository = prismaQuoteRepository;
const quoteManager = QuoteController(quoteRepository);

//Obtener cita por id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  return quoteManager.findById(id);
}

//Borrar una cita
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  return quoteManager.delete(id);
}

//Actualizar un cliente
// export async function PUT(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = params;
//   return clientManager.update(id, request);
// }