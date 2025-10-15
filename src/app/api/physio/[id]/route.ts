import { NextResponse } from 'next/server';
import { prismaPhysioRepository } from '@/modules/physio/infrastructure/PrismaPhysioRepository';

const physioRepository = prismaPhysioRepository;

// TODO: Crear casos de uso para FindById, Update y Delete en application/
// TODO: Crear controladores específicos para estas operaciones
// TODO: Aplicar validaciones del dominio (validatePhysioName) en Update

// Listar fisioterapeuta por id
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: 'Se requiere un ID de fisioterapeuta.' },
        { status: 400 }
      );
    }

    const physio = await physioRepository.findById(id);

    if (!physio) {
      return NextResponse.json(
        { message: `Fisioterapeuta con ID ${id} no encontrado.` },
        { status: 404 }
      );
    }

    return NextResponse.json(physio, { status: 200 });
  } catch (error: any) {
    console.error('Error al obtener fisioterapeuta por ID:', error);
    return NextResponse.json(
      {
        message: 'Fallo al obtener el fisioterapeuta.',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// Actualizar un fisioterapeuta
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: 'Se requiere un ID de fisioterapeuta.' },
        { status: 400 }
      );
    }

    const body = await request.json();

    if (!body.name || typeof body.name !== 'string') {
      return NextResponse.json(
        { message: 'El nombre es requerido y debe ser una cadena de texto.' },
        { status: 400 }
      );
    }

    const physio = await physioRepository.update(id, body.name);

    return NextResponse.json(physio, { status: 200 });
  } catch (error: any) {
    console.error('Error al actualizar fisioterapeuta:', error);
    return NextResponse.json(
      {
        message: 'Fallo al actualizar el fisioterapeuta.',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// Borrar un fisioterapeuta
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: 'Se requiere un ID de fisioterapeuta.' },
        { status: 400 }
      );
    }

    await physioRepository.delete(id);

    return NextResponse.json(
      { message: 'Fisioterapeuta eliminado correctamente.' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error al eliminar fisioterapeuta:', error);
    return NextResponse.json(
      {
        message: 'Fallo al eliminar el fisioterapeuta.',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
