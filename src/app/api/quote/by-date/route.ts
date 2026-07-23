import { prismaQuoteRepository } from "@/modules/quotes/infrastructure/PrismaQuoteRepository";
import { QuoteController } from "@/modules/quotes/infrastructure/QuoteController";

const quoteRepository = prismaQuoteRepository;
const quoteManager = QuoteController(quoteRepository);

//Listar citas por fecha (si no se pasa fecha, usa la fecha actual)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get("date");
  const date = dateParam ? new Date(dateParam) : new Date();
  return quoteManager.findByDate(date);
}
