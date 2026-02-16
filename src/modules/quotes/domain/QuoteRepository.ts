import { Quote } from "./Quote";


export interface QuoteRepository {
  create(physioId:string,clientId:string,startDate:Date): Promise<Quote>;
  findById(id: string): Promise<Quote | null>;
  findAll(): Promise<Quote[]>;
  update(id: string,physioId:string): Promise<Quote>;
  delete(id: string): Promise<void>;
}
