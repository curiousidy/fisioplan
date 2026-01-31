import { NextResponse } from 'next/server';
import { QuoteRepository } from '../domain/QuoteRepository';
import { createQuoteUseCase } from '../application/create/CreatePhysioUseCase';
import { prismaQuoteRepository } from './PrismaQuoteRepository';

export interface QuoteController {
  create(request: Request): Promise<NextResponse>;
  // findAll(): Promise<NextResponse>;
  // findById(id: string): Promise<NextResponse>;
  // update(id: string, request: Request): Promise<NextResponse>;
  // delete(id: string): Promise<NextResponse>;
}

export const QuoteController = (
  quoteRepository: QuoteRepository
): QuoteController => ({
  create: async (request: Request): Promise<NextResponse> => {
    try {
      const body = await request.json();

      // Ejecutar el caso de uso
      const quote = await createQuoteUseCase(body.physio,body.client,body.startDate, quoteRepository);

      return NextResponse.json(quote, { status: 201 });
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }

      console.error('Error creando fisioterapeuta:', error);
      return NextResponse.json(
        { error: 'Error interno del servidor' },
        { status: 500 }
      );
    }
  },

  // findAll: async (): Promise<NextResponse> => {
  //   try {
  //     const physios = await findAllUseCase(physioRepository);
  //     return NextResponse.json(physios);
  //   } catch (error) {
  //     console.error('Error obteniendo fisioterapeutas:', error);
  //     return NextResponse.json(
  //       { error: 'Error interno del servidor' },
  //       { status: 500 }
  //     );
  //   }
  // },

  // findById: async (id: string): Promise<NextResponse> => {
  //   try {
  //     const physio = await findByIdUseCase(id, physioRepository);

  //     if (!physio) {
  //       return NextResponse.json(
  //         { error: 'Fisioterapeuta no encontrado' },
  //         { status: 404 }
  //       );
  //     }

  //     return NextResponse.json(physio);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       return NextResponse.json(
  //         { error: error.message },
  //         { status: 400 }
  //       );
  //     }

  //     console.error('Error obteniendo fisioterapeuta:', error);
  //     return NextResponse.json(
  //       { error: 'Error interno del servidor' },
  //       { status: 500 }
  //     );
  //   }
  // },

  // update: async (id: string, request: Request): Promise<NextResponse> => {
  //   try {
  //     const body = await request.json();

  //     if (!body.name) {
  //       return NextResponse.json(
  //         { error: 'El nombre es requerido' },
  //         { status: 400 }
  //       );
  //     }

  //     const physio: Physio = { id, name: body.name };
  //     const updatedPhysio = await upatePhysioUseCase(physio, physioRepository);

  //     return NextResponse.json(updatedPhysio);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       return NextResponse.json(
  //         { error: error.message },
  //         { status: 400 }
  //       );
  //     }

  //     console.error('Error actualizando fisioterapeuta:', error);
  //     return NextResponse.json(
  //       { error: 'Error interno del servidor' },
  //       { status: 500 }
  //     );
  //   }
  // },

  // delete: async (id: string): Promise<NextResponse> => {
  //   try {
  //     const physio: Physio = { id, name: '' }; // name no importa para delete
  //     const deletedPhysio = await deletePhysioUseCase(physio, physioRepository);

  //     if (!deletedPhysio) {
  //       return NextResponse.json(
  //         { error: 'Fisioterapeuta no encontrado' },
  //         { status: 404 }
  //       );
  //     }

  //     return NextResponse.json(deletedPhysio);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       return NextResponse.json(
  //         { error: error.message },
  //         { status: 400 }
  //       );
  //     }

  //     console.error('Error eliminando fisioterapeuta:', error);
  //     return NextResponse.json(
  //       { error: 'Error interno del servidor' },
  //       { status: 500 }
  //     );
  //   }
  // }
});
