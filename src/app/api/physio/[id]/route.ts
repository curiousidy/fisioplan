import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Next.js API Routes con segmentos dinámicos pasan el ID en los params
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params; // Aquí obtenemos el ID de la URL

    // Valida que el ID exista
    if (!id) {
      return NextResponse.json({ message: 'Se requiere un ID de fisioterapeuta.' }, { status: 400 }); // 400 Bad Request
    }

    // Busca un único fisioterapeuta por su ID
    const physio = await prisma.physio.findUnique({
      where: {
        id: id,
      },
    });

    // Si el fisioterapeuta no se encuentra, devuelve un 404 Not Found
    if (!physio) {
      return NextResponse.json({ message: `Fisioterapeuta con ID ${id} no encontrado.` }, { status: 404 }); // 404 Not Found
    }

    // Si se encuentra, devuelve el objeto del fisioterapeuta con un 200 OK
    return NextResponse.json(physio, { status: 200 }); // 200 OK
  } catch (error: any) {
    console.error('Error al obtener fisioterapeuta por ID:', error);
    return NextResponse.json({
      message: 'Fallo al obtener el fisioterapeuta.',
      error: error.message,
    }, { status: 500 }); // 500 Internal Server Error
  }
}