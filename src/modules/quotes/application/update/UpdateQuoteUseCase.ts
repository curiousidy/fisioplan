import { Quote, QuoteStatus, validateQuoteDates, validateQuoteStatus } from "../../domain/Quote";
import { QuoteRepository } from "../../domain/QuoteRepository";
import { UpdateQuoteDTO } from "../../infrastructure/updateQuoteRequestDTO";

export const updateQuoteUseCase = async (
  id: string,
  data: UpdateQuoteDTO,
  quoteRepository: QuoteRepository
): Promise<Quote> => {
  const existing = await quoteRepository.findById(id);

  if (!existing) {
    throw new Error('Cita no encontrada');
  }

  if (data.status) {
    validateQuoteStatus(data.status);
  }

  const mergedData: Partial<Quote> = {
    physioId: data.physio_id ?? existing.physioId,
    startDate: data.startDate ? new Date(data.startDate) : existing.startDate,
    endDate: data.endDate ? new Date(data.endDate) : existing.endDate,
    status: data.status ? (data.status as QuoteStatus) : existing.status,
  };

  if (data.startDate || data.endDate) {
    validateQuoteDates(mergedData.startDate!, mergedData.endDate!);
  }

  return await quoteRepository.update(id, mergedData);
}
