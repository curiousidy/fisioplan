import { Client } from "@/modules/client/domain/Client"
import { Physio } from "@/modules/physio/domain/Physio"

export interface Quote {
  id         : string
  physio     : Physio
  physioId  : string
  client     : Client
  clientId  : string
  startDate  : Date
  endDate    : Date
  status     : string
}

export const validateQuoteId = (id:String) => {
   if (!id || typeof id !== 'string') {
        throw new Error('El id no es válido');
    }
}