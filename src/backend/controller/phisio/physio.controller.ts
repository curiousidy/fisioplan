import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { CreatePhisioRequestDTO } from '../definitions';
import { physioService } from '@/backend/service/physio.service';
import { PhisioDTO } from '@/backend/service/definitions';

export async function CreatePhisio(request: Request){
  //controlador
  try {
    const createPhisioRequestDTO = await request.json() as CreatePhisioRequestDTO
    // requestDTO {name: string};
    // Validar que el nombre esté presente
    if(!createPhisioRequestDTO.name || typeof createPhisioRequestDTO.name !== 'string'){
      return NextResponse.json(
        { error: 'El nombre es requerido y debe ser una cadena de texto' },
        { status: 400 }
      )
    }
  //controlador
  //servicio
    const phisioDTO = physioService.createPhisio(mapPhisioCreateRequestDTOToPhisioDTO(createPhisioRequestDTO))
  //servicio
    return NextResponse.json(phisioDTO, { status: 201 })
  } catch (error) {
    console.error('Error creando fisioterapeuta:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export const mapPhisioCreateRequestDTOToPhisioDTO = (createPhisioRequestDTO: CreatePhisioRequestDTO):PhisioDTO=> ({
    name: createPhisioRequestDTO.name
})
