import { TimeRange } from "./timeRange";

export interface TimeRangeRepository { 
  findAll(): Promise<TimeRange>;
}
