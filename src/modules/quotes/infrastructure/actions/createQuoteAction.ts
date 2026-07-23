'use server'

import { prismaQuoteRepository } from '../PrismaQuoteRepository'
import { createQuoteUseCase } from '../../application/create/CreateQuoteUseCase'

export async function createQuoteAction(physioId: string, clientId: string, startDate: string) {
  const startsAt = new Date(startDate)
  const endsAt = new Date(startsAt.getTime() + 60 * 60 * 1000)

  return createQuoteUseCase(physioId, clientId, startsAt, endsAt, prismaQuoteRepository)
}
