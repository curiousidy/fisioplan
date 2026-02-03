import { Client } from "@/modules/client/domain/Client";
import { Physio } from "@/modules/physio/domain/Physio";
import { Quote } from "./Quote";


export interface QuoteRepository {
  create(physioId:string,clientId:string,startDate:Date): Promise<Quote>;
  findById(id: string): Promise<Quote | null>;
  findAll(): Promise<Quote[]>;
  update(id: string, quote: Quote): Promise<Quote>;
  delete(id: string): Promise<void>;
}
