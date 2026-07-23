import { NextResponse } from 'next/server';
import { createQuoteUseCase } from '../application/create/CreateQuoteUseCase';
import { findByIdQuoteUseCase } from '../application/findById/FindByIdQuoteUseCase';
import { QuoteRepository } from '../domain/QuoteRepository';
import { deleteQuoteUseCase } from '../application/delete/DeleteQuoteUseCase';
import { findAllUseCase } from '../application/findAll/FindAllUseCase';
import { updateQuoteUseCase } from '../application/update/UpdateQuoteUseCase';
import { UpdateQuoteDTO } from './updateQuoteRequestDTO';

export interface QuoteController {
  create(request: Request): Promise<NextResponse>;
  findAll(): Promise<NextResponse>;
  findById(id: string): Promise<NextResponse>;
  update(id: string, request: Request): Promise<NextResponse>;
  delete(id: string): Promise<NextResponse>;
}

export const QuoteController = (
  quoteRepository: QuoteRepository
): QuoteController => ({
  create: async (request: Request): Promise<NextResponse> => {
    try {
      const body = await request.json();

      if (!body.startDate) {
        return NextResponse.json(
          { error: 'La fecha de inicio es requerida' },
          { status: 400 }
        );
      }

      if (!body.endDate) {
        return NextResponse.json(
          { error: 'La fecha de fin es requerida' },
          { status: 400 }
        );
      }

      const quote = await createQuoteUseCase(
        body.physio_id,
        body.client_id,
        new Date(body.startDate),
        new Date(body.endDate),
        quoteRepository
      );

      return NextResponse.json(quote, { status: 201 });
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }

      console.error('Error creando Cita:', error);
      return NextResponse.json(
        { error: 'Error interno del servidor' },
        { status: 500 }
      );
    }
  },

  findAll: async (): Promise<NextResponse> => {
    try {
      const quotes = await findAllUseCase(quoteRepository);
      return NextResponse.json(quotes);
    } catch (error) {
      console.error('Error obteniendo citas:', error);
      return NextResponse.json(
        { error: 'Error interno del servidor' },
        { status: 500 }
      );
    }
  },

  findById: async (id: string): Promise<NextResponse> => {
    try {
      const quote = await findByIdQuoteUseCase(id, quoteRepository);

      if (!quote) {
        return NextResponse.json(
          { error: 'Cita no encontrada' },
          { status: 404 }
        );
      }

      return NextResponse.json(quote);
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }

      console.error('Error obteniendo Cita:', error);
      return NextResponse.json(
        { error: 'Error interno del servidor' },
        { status: 500 }
      );
    }
  },

  update: async (id: string, request: Request): Promise<NextResponse> => {
    try {
      const body: UpdateQuoteDTO = await request.json();

      const hasFields =
        body.startDate !== undefined ||
        body.endDate !== undefined ||
        body.status !== undefined;

      if (!hasFields) {
        return NextResponse.json(
          { error: 'Se requiere al menos un campo para actualizar' },
          { status: 400 }
        );
      }

      const updatedQuote = await updateQuoteUseCase(id, body, quoteRepository);
      return NextResponse.json(updatedQuote);
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }

      console.error('Error actualizando Cita:', error);
      return NextResponse.json(
        { error: 'Error interno del servidor' },
        { status: 500 }
      );
    }
  },

  delete: async (id: string): Promise<NextResponse> => {
    try {
      const deletedQuote = await deleteQuoteUseCase(id, quoteRepository);

      if (!deletedQuote) {
        return NextResponse.json(
          { error: 'Cita no encontrada' },
          { status: 404 }
        );
      }

      return NextResponse.json(deletedQuote);
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }

      console.error('Error eliminando Cita:', error);
      return NextResponse.json(
        { error: 'Error interno del servidor' },
        { status: 500 }
      );
    }
  }
});
