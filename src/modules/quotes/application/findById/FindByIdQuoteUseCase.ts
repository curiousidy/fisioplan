import { Quote, validateQuoteId } from "../../domain/Quote";
import { QuoteRepository } from "../../domain/QuoteRepository";


export const findByIdQuoteUseCase = async (id:string , quoteRepository: QuoteRepository) : Promise<Quote | null > => {
    validateQuoteId(id);
    return await quoteRepository.findById(id);
}