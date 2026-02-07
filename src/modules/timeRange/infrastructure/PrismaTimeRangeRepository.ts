import prisma from '@/lib/prisma';
import { TimeRangeRepository } from '../domain/TimeRangeRepository';
import { TimeRange } from '../domain/timeRange';



export const prismaTimeRangeRepository: TimeRangeRepository = {
  findAll: async (): Promise<TimeRange> => {
    const timeRange = await prisma.timeRange.findFirst();

    return {
      morning: timeRange?.morning ?? [],
      afternoon: timeRange?.afternoon ?? [],
    };
  },
}
