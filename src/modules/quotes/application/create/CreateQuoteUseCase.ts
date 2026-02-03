import { Physio } from "@/modules/physio/domain/Physio";
import { Quote } from "../../domain/Quote";
import { QuoteRepository } from "../../domain/QuoteRepository";
import { Client } from "@/modules/client/domain/Client";




export const createQuoteUseCase = async (physioId: string,clientId:string,startDate:Date, quoteRepository: QuoteRepository): Promise<Quote> => {
  return await quoteRepository.create(physioId,clientId,startDate)
};
