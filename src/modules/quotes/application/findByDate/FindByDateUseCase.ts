import { Quote } from "../../domain/Quote";
import { QuoteRepository } from "../../domain/QuoteRepository";

export const findByDateUseCase = async (quoteRepository: QuoteRepository, date:Date) : Promise<Quote[]> => {
    return await quoteRepository.findByDate(date);
}