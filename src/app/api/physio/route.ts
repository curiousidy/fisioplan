import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: Request) {
  try {
    // Busca todos los fisioterapeutas sin restricciones de take o skip
    const physios = await prisma.physio.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    // Si no se encuentran fisioterapeutas, devuelve un estado 204 No Content
    if (physios.length === 0) {
      return new NextResponse(null, { status: 204 });
    }

    // Si hay fisioterapeutas, devuelve la lista con un estado 200 OK
    return NextResponse.json(physios, { status: 200 });
  } catch (error: any) {
    console.error('Error al obtener fisioterapeutas:', error);
    return NextResponse.json({
      message: 'Fallo al obtener los fisioterapeutas.',
      error: error.message,
    }, { status: 500 }); 
  }
}