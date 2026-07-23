import { prismaQuoteRepository } from "@/modules/quotes/infrastructure/PrismaQuoteRepository";
import { QuoteController } from "@/modules/quotes/infrastructure/QuoteController";

const quoteRepository = prismaQuoteRepository;
const quoteManager = QuoteController(quoteRepository);

//Obtener cita por id
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return quoteManager.findById(id);
}

//Borrar una cita
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return quoteManager.delete(id);
}

//Actualizar una cita
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return quoteManager.update(id, request);
}
