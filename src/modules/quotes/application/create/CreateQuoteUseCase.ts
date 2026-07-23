import { Quote, validateQuoteDates } from "../../domain/Quote";
import { QuoteRepository } from "../../domain/QuoteRepository";


export const createQuoteUseCase = async (
  physioId: string,
  clientId: string,
  startDate: Date,
  endDate: Date,
  quoteRepository: QuoteRepository
): Promise<Quote> => {
  validateQuoteDates(startDate, endDate);
  return await quoteRepository.create(physioId, clientId, startDate, endDate);
};
