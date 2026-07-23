import prisma from '@/lib/prisma';
import { QuoteRepository } from '../domain/QuoteRepository';
import { Quote } from '../domain/Quote';
import { fromPrismaToQuote } from './quoteMapper';


export const prismaQuoteRepository: QuoteRepository = {
  create: async (physioId: string, clientId: string, startDate: Date, endDate: Date): Promise<Quote> => {
    const quoteCreated = await prisma.quote.create({
      data: {
        physio_id: physioId,
        client_id: clientId,
        startDate: startDate,
        endDate: endDate,
        status: "agendada"
      },
      include: {
        physio: true,
        client: true
      }
    });

    return fromPrismaToQuote(quoteCreated);
  },

  findById: async (id: string): Promise<Quote | null> => {
    const quote = await prisma.quote.findUnique({
      where: { id },
      include: {
        physio: true,
        client: true
      }
    });

    if (!quote) return null;

    return fromPrismaToQuote(quote);
  },

  findAll: async (): Promise<Quote[]> => {
    const quotes = await prisma.quote.findMany({
      include: {
        physio: true,
        client: true
      }
    });

    return quotes.map(fromPrismaToQuote);
  },

  update: async (id: string, data: Partial<Quote>): Promise<Quote> => {
    const updated = await prisma.quote.update({
      where: { id },
      data: {
        ...(data.startDate && { startDate: data.startDate }),
        ...(data.endDate && { endDate: data.endDate }),
        ...(data.status && { status: data.status }),
      },
      include: {
        physio: true,
        client: true,
      }
    });

    return fromPrismaToQuote(updated);
  },

  delete: async (id: string): Promise<void> => {
    await prisma.quote.delete({
      where: { id }
    });
  }
}
