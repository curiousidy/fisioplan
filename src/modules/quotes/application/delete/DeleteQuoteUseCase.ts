import { Quote, validateQuoteId } from "../../domain/Quote";
import { QuoteRepository } from "../../domain/QuoteRepository";

export const deleteQuoteUseCase = async (id : string, quoteRepository : QuoteRepository ) : Promise<Quote | null > => {
    validateQuoteId(id);
    const quoteDeleted = await quoteRepository.findById(id);
    await quoteRepository.delete (id);
    return quoteDeleted;
}