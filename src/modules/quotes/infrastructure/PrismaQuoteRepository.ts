import prisma from '@/lib/prisma';
import { QuoteRepository } from '../domain/QuoteRepository';
import { Quote } from '../domain/Quote';


export const prismaQuoteRepository: QuoteRepository = {
  create: async (physioId: string, clientId: string, startDate: Date): Promise<Quote> => {
    const quoteCreated = await prisma.quote.create({
      data: {
        physio_id: physioId,
        client_id: clientId,
        startDate: startDate,
        endDate: new Date(),
        status: "created"
      },
      include: {
        physio: true,
        client: true
      }
    });

    return {
      id: quoteCreated.id,
      physio: quoteCreated.physio,
      physioId: quoteCreated.physio_id,
      client: {
        id: quoteCreated.client.id,
        name: quoteCreated.client.name,
        contact: quoteCreated.client.contact
      },
      clientId: quoteCreated.client_id,
      startDate: quoteCreated.startDate,
      endDate: quoteCreated.endDate,
      status: quoteCreated.status
    };
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

    return {
      id: quote.id,
      physio: quote.physio,
      physioId: quote.physio_id,
      client: {
        id: quote.client.id,
        name: quote.client.name,
        contact: quote.client.contact
      },
      clientId: quote.client_id,
      startDate: quote.startDate,
      endDate: quote.endDate,
      status: quote.status
    };
  },
  findAll: async (): Promise<Quote[]> => {
    const quotes = await prisma.quote.findMany({
      include: {
        physio: true,
        client: true
      }
    });

    return quotes.map(quote => ({
      id: quote.id,
      physio: quote.physio,
      physioId: quote.physio_id,
      client: quote.client,
      clientId: quote.client_id,
      startDate: quote.startDate,
      endDate: quote.endDate,
      status: quote.status
    }))
  },

  findByDate: async (date:Date): Promise<Quote[]> => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const quotes = await prisma.quote.findMany({
      where: {
        startDate: {
          gte: startOfDay,
          lte: endOfDay
        }
      },
      include: {
        physio: true,
        client: true
      }
    });

    return quotes.map(quote => ({
      id: quote.id,
      physio: quote.physio,
      physioId: quote.physio_id,
      client: quote.client,
      clientId: quote.client_id,
      startDate: quote.startDate,
      endDate: quote.endDate,
      status: quote.status
    }))
  },

  update: async (id: string, physioId: string): Promise<Quote> => {
    const quoteUpdated = await prisma.quote.update({
      where: { id },
      data: {
        physio_id: physioId
      },
      include: {
        physio: true,
        client: true
      }
    });

    return {
      id: quoteUpdated.id,
      physio: quoteUpdated.physio,
      physioId: quoteUpdated.physio_id,
      client: {
        id: quoteUpdated.client.id,
        name: quoteUpdated.client.name,
        contact: quoteUpdated.client.contact
      },
      clientId: quoteUpdated.client_id,
      startDate: quoteUpdated.startDate,
      endDate: quoteUpdated.endDate,
      status: quoteUpdated.status
    };
  },

  delete: async (id: string): Promise<void> => {
    await prisma.quote.delete({
      where: { id }
    });
  }
}
