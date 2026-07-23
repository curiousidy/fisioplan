'use server'

import { revalidatePath } from 'next/cache'
import { quoteCreateSchema, quoteUpdateSchema } from '@/lib/schemas/quote.schema'

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'

export type ActionResult = { success: true } | { error: string }

export async function createQuote(data: {
  physio_id: string
  client_id: string
  startDate: string
  endDate: string
}): Promise<ActionResult> {
  const parsed = quoteCreateSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const res = await fetch(`${BASE}/api/quote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      physio_id: parsed.data.physio_id,
      client_id: parsed.data.client_id,
      startDate: parsed.data.startDate,
      endDate: data.endDate,
    }),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    return { error: (body as { error?: string }).error ?? 'Error al crear la cita' }
  }

  revalidatePath('/quotes')
  revalidatePath('/dashboard')
  return { success: true }
}

export async function updateQuote(
  id: string,
  data: {
    startDate?: string
    endDate?: string
    status?: 'agendada' | 'completada' | 'cancelada'
  }
): Promise<ActionResult> {
  const parsed = quoteUpdateSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const res = await fetch(`${BASE}/api/quote/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed.data),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    return { error: (body as { error?: string }).error ?? 'Error al actualizar la cita' }
  }

  revalidatePath('/quotes')
  revalidatePath('/dashboard')
  return { success: true }
}

export async function deleteQuote(id: string): Promise<ActionResult> {
  const res = await fetch(`${BASE}/api/quote/${id}`, { method: 'DELETE' })

  if (!res.ok) {
    return { error: 'Error al eliminar la cita' }
  }

  revalidatePath('/quotes')
  revalidatePath('/dashboard')
  return { success: true }
}
