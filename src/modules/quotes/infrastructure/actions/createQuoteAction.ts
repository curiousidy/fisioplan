'use server'

import { prismaQuoteRepository } from '../PrismaQuoteRepository'
import { createQuoteUseCase } from '../../application/create/CreateQuoteUseCase'

export async function createQuoteAction(physioId: string, clientId: string, startDate: string) {
  const quote = await createQuoteUseCase(physioId, clientId, new Date(startDate), prismaQuoteRepository)
  console.log('quote',quote)
  return quote
}
