import { prismaQuoteRepository } from "@/modules/quotes/infrastructure/PrismaQuoteRepository";
import { QuoteController } from "@/modules/quotes/infrastructure/QuoteController";

const quoteRepository = prismaQuoteRepository;
const quoteManager = QuoteController(quoteRepository);

//Crear citas
export async function POST(request: Request) {
  return quoteManager.create(request);
}

//Listar todas las citas
export async function GET(){
  return quoteManager.findAll()
}
