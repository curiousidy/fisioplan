import { Physio } from "@/modules/physio/domain/Physio";
import { Quote } from "../../domain/Quote";
import { QuoteRepository } from "../../domain/QuoteRepository";
import { Client } from "@/modules/client/domain/Client";




export const createQuoteUseCase = async (physio: Physio,client:Client,startDate:Date, quoteRepository: QuoteRepository): Promise<Quote> => {
  return await quoteRepository.create(physio,client,startDate)
};
