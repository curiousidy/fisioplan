import { Quote } from "./Quote";


export interface QuoteRepository {
  create(physioId: string, clientId: string, startDate: Date, endDate: Date): Promise<Quote>;
  findById(id: string): Promise<Quote | null>;
  findAll(): Promise<Quote[]>;
  findByDate(date: Date): Promise<Quote[]>;
  update(id: string, data: Partial<Quote>): Promise<Quote>;
  delete(id: string): Promise<void>;
}
