import { prismaTimeRangeRepository } from "@/modules/timeRange/infrastructure/PrismaTimeRangeRepository";
import { TimeRangeController } from "@/modules/timeRange/infrastructure/TimeRangeController";

const timeRangeRepository = prismaTimeRangeRepository;
const timeRangeManager = TimeRangeController(timeRangeRepository);

//Listar las horas
export async function GET(){
  return timeRangeManager.findAll()
}
