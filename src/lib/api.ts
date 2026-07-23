// src/lib/api.ts
// Data access para Server Components — llama directamente a los repositorios de Prisma
// SIN fetch HTTP a sí mismo (antipatrón en Next.js App Router con SSR)

import { prismaPhysioRepository } from '@/modules/physio/infrastructure/PrismaPhysioRepository'
import { prismaClientRepository } from '@/modules/client/infrastructure/PrismaClientRepository'
import { prismaQuoteRepository } from '@/modules/quotes/infrastructure/PrismaQuoteRepository'

// ─── DTOs para el frontend (startDate/endDate como string para serialización) ───

export interface PhysioDTO {
  id: string
  name: string
}

export interface ClientDTO {
  id: string
  name: string
  contact: string
}

export type QuoteStatus = 'agendada' | 'completada' | 'cancelada'

export interface QuoteDTO {
  id: string
  physioId: string
  clientId: string
  startDate: string
  endDate: string
  status: QuoteStatus
  physio?: { id: string; name: string }
  client?: { id: string; name: string }
}

// ─── Physio ───────────────────────────────────────────────────────────────────

export async function fetchPhysios(): Promise<PhysioDTO[]> {
  return prismaPhysioRepository.findAll()
}

export async function fetchPhysioById(id: string): Promise<PhysioDTO | null> {
  return prismaPhysioRepository.findById(id)
}

// ─── Client ───────────────────────────────────────────────────────────────────

export async function fetchClients(): Promise<ClientDTO[]> {
  return prismaClientRepository.findAll()
}

export async function fetchClientById(id: string): Promise<ClientDTO | null> {
  return prismaClientRepository.findById(id)
}

// ─── Quote ────────────────────────────────────────────────────────────────────

export async function fetchQuotes(): Promise<QuoteDTO[]> {
  const quotes = await prismaQuoteRepository.findAll()
  return quotes.map(q => ({
    id: q.id,
    physioId: q.physioId,
    clientId: q.clientId,
    startDate: q.startDate.toISOString(),
    endDate: q.endDate.toISOString(),
    status: q.status,
    physio: q.physio ? { id: q.physio.id, name: q.physio.name } : undefined,
    client: q.client ? { id: q.client.id, name: q.client.name } : undefined,
  }))
}

export async function fetchQuoteById(id: string): Promise<QuoteDTO | null> {
  const q = await prismaQuoteRepository.findById(id)
  if (!q) return null
  return {
    id: q.id,
    physioId: q.physioId,
    clientId: q.clientId,
    startDate: q.startDate.toISOString(),
    endDate: q.endDate.toISOString(),
    status: q.status,
    physio: q.physio ? { id: q.physio.id, name: q.physio.name } : undefined,
    client: q.client ? { id: q.client.id, name: q.client.name } : undefined,
  }
}

export async function fetchQuotesByClientId(clientId: string): Promise<QuoteDTO[]> {
  const quotes = await prismaQuoteRepository.findAll()
  return quotes
    .filter(q => q.clientId === clientId)
    .map(q => ({
      id: q.id,
      physioId: q.physioId,
      clientId: q.clientId,
      startDate: q.startDate.toISOString(),
      endDate: q.endDate.toISOString(),
      status: q.status,
      physio: q.physio ? { id: q.physio.id, name: q.physio.name } : undefined,
      client: q.client ? { id: q.client.id, name: q.client.name } : undefined,
    }))
}
