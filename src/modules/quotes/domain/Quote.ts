import { Client } from "@/modules/client/domain/Client"
import { Physio } from "@/modules/physio/domain/Physio"

export interface Quote {
  id         : String
  physio     : Physio
  physioId  : String
  client     : Client
  clientId  : String
  startDate  : Date
  endDate    : Date
  status     : String
}