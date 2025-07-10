import { CreatePhisio } from '@/backend/controller/phisio/physio.controller';
import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

// Listar todos los fisioterapeutas
export async function GET(request: Request) {

  try {

    const { searchParams } = new URL(request.url);
    const take = Number(searchParams.get('take')) ?? '2';
    const skip = Number(searchParams.get('take')) ?? '0';

    if (isNaN(take)) return NextResponse.json({message: 'esto debería ser un número'},{status:400});
    if (isNaN(skip)) return NextResponse.json({message: 'esto debería ser un número'},{status:400});

    const physio = await prisma.physio.findMany({take,skip});
    
    return NextResponse.json(physio);
  } catch (error:any) {
    console.error('Error creating physio:', error);
    return NextResponse.json({
      message: 'Failed to execute seed',
      error: error.message,
    });
  }
}
<<<<<<< Updated upstream
=======
// Crear fisioterapeuta
export async function POST(request: Request){
  CreatePhisio(request)
}
>>>>>>> Stashed changes
