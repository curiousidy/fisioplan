import { TimeRange } from "../../domain/timeRange";
import { TimeRangeRepository } from "../../domain/TimeRangeRepository";

export const findAllTimeRangeUseCase = async (timeRange: TimeRangeRepository) : Promise<TimeRange> => {
    return await timeRange.findAll();
}