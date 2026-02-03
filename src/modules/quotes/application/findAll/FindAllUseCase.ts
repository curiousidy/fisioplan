import { Quote } from "../../domain/Quote";
import { QuoteRepository } from "../../domain/QuoteRepository";



export const findAllUseCase = async (quoteRepository: QuoteRepository) : Promise<Quote[]> => {
    return await quoteRepository.findAll();
}