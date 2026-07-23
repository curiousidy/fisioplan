import { Client } from "@/modules/client/domain/Client"
import { Physio } from "@/modules/physio/domain/Physio"

export type QuoteStatus = 'agendada' | 'completada' | 'cancelada';

export interface Quote {
  id         : string
  physio     : Physio
  physioId  : string
  client     : Client
  clientId  : string
  startDate  : Date
  endDate    : Date
  status     : QuoteStatus
}

export const validateQuoteId = (id: string) => {
  if (!id || typeof id !== 'string') {
    throw new Error('El id no es válido');
  }
}

export const validateQuoteStatus = (status: string): void => {
  const validStatuses: QuoteStatus[] = ['agendada', 'completada', 'cancelada'];
  if (!validStatuses.includes(status as QuoteStatus)) {
    throw new Error(`El estado de la cita no es válido: ${status}. Debe ser uno de: ${validStatuses.join(', ')}`);
  }
}

export const validateQuoteDates = (startDate: Date, endDate: Date): void => {
  if (!(startDate instanceof Date) || isNaN(startDate.getTime())) {
    throw new Error('La fecha de inicio no es válida');
  }
  if (!(endDate instanceof Date) || isNaN(endDate.getTime())) {
    throw new Error('La fecha de fin no es válida');
  }
  if (endDate <= startDate) {
    throw new Error('La fecha de fin debe ser posterior a la fecha de inicio');
  }
};
