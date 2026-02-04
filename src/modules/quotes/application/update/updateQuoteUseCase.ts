import { Quote } from "../../domain/Quote";
import { QuoteRepository } from "../../domain/QuoteRepository";

export const updateQuoteUseCase = async (id : string, physioId:string, quoteRepository: QuoteRepository ) : Promise<Quote> => {
   
    return await quoteRepository.update (id,physioId,);
}