'use server'

import { revalidatePath } from 'next/cache'
import { clientSchema, clientUpdateSchema } from '@/lib/schemas/client.schema'

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'

export type ActionResult = { success: true } | { error: string }

export async function createClient(data: {
  name: string
  contact: string
}): Promise<ActionResult> {
  const parsed = clientSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const res = await fetch(`${BASE}/api/client`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed.data),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    return { error: (body as { error?: string }).error ?? 'Error al crear el cliente' }
  }

  revalidatePath('/clients')
  return { success: true }
}

export async function updateClient(
  id: string,
  data: { name: string; contact?: string }
): Promise<ActionResult> {
  const parsed = clientUpdateSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const res = await fetch(`${BASE}/api/client/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed.data),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    return { error: (body as { error?: string }).error ?? 'Error al actualizar el cliente' }
  }

  revalidatePath('/clients')
  return { success: true }
}

export async function deleteClient(id: string): Promise<ActionResult> {
  const res = await fetch(`${BASE}/api/client/${id}`, { method: 'DELETE' })

  if (!res.ok) {
    return { error: 'Error al eliminar el cliente' }
  }

  revalidatePath('/clients')
  return { success: true }
}
