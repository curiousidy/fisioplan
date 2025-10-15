import { NextResponse } from 'next/server';
import { CreatePhysioUseCase } from '../application/create/CreatePhysioUseCase';
import { Physio } from '../domain/Physio';

export interface PhysioController {
  create(request: Request): Promise<NextResponse>;
}

export const createPhysioController = (
  createPhysioUseCase: CreatePhysioUseCase
): PhysioController => ({
  create: async (request: Request): Promise<NextResponse> => {
    try {
      const body = await request.json();

      // Validar que el body contenga el nombre
      if (!body.name) {
        return NextResponse.json(
          { error: 'El nombre es requerido' },
          { status: 400 }
        );
      }

      // Ejecutar el caso de uso
      const physio: Physio = await createPhysioUseCase.execute({
        name: body.name
      });

      return NextResponse.json(physio, { status: 201 });
    } catch (error) {
      // Si es un error de validación del dominio, retornar 400
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
  }
});
