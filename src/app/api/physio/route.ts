import { NextResponse } from 'next/server';
import { prismaPhysioRepository } from '@/modules/physio/infrastructure/PrismaPhysioRepository';
import { createPhysioUseCase } from '@/modules/physio/application/create/CreatePhysioUseCase';
import { createPhysioController } from '@/modules/physio/infrastructure/PhysioController';

// Inyección de dependencias: ensamblar las capas
const physioRepository = prismaPhysioRepository;
const createUseCase = createPhysioUseCase(physioRepository);
const physioController = createPhysioController(createUseCase);

// Listar todos los fisioterapeutas
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const take = Number(searchParams.get('take')) || 10;
    const skip = Number(searchParams.get('skip')) || 0;

    if (isNaN(take)) {
      return NextResponse.json(
        { message: 'take debe ser un número' },
        { status: 400 }
      );
    }
    if (isNaN(skip)) {
      return NextResponse.json(
        { message: 'skip debe ser un número' },
        { status: 400 }
      );
    }

    const physios = await physioRepository.findAll();

    // Aplicar paginación manual (más adelante podemos moverlo al repositorio)
    const paginatedPhysios = physios.slice(skip, skip + take);

    return NextResponse.json(paginatedPhysios);
  } catch (error: any) {
    console.error('Error obteniendo fisioterapeutas:', error);
    return NextResponse.json(
      {
        message: 'Error al obtener fisioterapeutas',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// Crear fisioterapeuta
export async function POST(request: Request) {
  return physioController.create(request);
}
