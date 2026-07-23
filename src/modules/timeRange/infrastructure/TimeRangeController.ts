import { NextResponse } from 'next/server';
import { TimeRangeRepository } from '../domain/TimeRangeRepository';
import { findAllTimeRangeUseCase } from '../aplication/findAll/findAllTimeRangeUseCase';


export interface TimeRangeController {

  findAll(): Promise<NextResponse>;

}

export const TimeRangeController = (
  timeRangeRepository: TimeRangeRepository
): TimeRangeController => ({

  findAll: async (): Promise<NextResponse> => {
    try {
      const timeRange = await findAllTimeRangeUseCase(timeRangeRepository);
      return NextResponse.json(timeRange);
    } catch (error) {
      console.error('Error obteniendo el rango de horas:', error);
      return NextResponse.json(
        { error: 'Error interno del servidor' },
        { status: 500 }
      );
    }
  },
});
