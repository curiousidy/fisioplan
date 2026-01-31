import prisma from '@/lib/prisma';
import { QuoteRepository } from '../domain/QuoteRepository';
import { Quote } from '../domain/Quote';
import { Physio } from '@/modules/physio/domain/Physio';
import { Client } from '@/modules/client/domain/Client';


export const prismaQuoteRepository: QuoteRepository = {
  create: async (physio: Physio, client: Client, startDate: Date): Promise<Quote> => {
    const quoteCreated = await prisma.quote.create({
      data: {
        physio_id: physio.id,
        client_id: client.id,
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
        contact: quoteCreated.client.phone
      },
      clientId: quoteCreated.client_id,
      startDate: quoteCreated.startDate,
      endDate: quoteCreated.endDate,
      status: quoteCreated.status
    };
  },
  findById: function (id: string): Promise<Quote | null> {
    throw new Error('Function not implemented.');
  },
  findAll: function (): Promise<Quote[]> {
    throw new Error('Function not implemented.');
  },
  update: function (id: string, quote: Quote): Promise<Quote> {
    throw new Error('Function not implemented.');
  },
  delete: function (id: string): Promise<void> {
    throw new Error('Function not implemented.');
  }
}
