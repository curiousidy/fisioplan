'use server'

import { revalidatePath } from 'next/cache'
import { physioSchema } from '@/lib/schemas/physio.schema'

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'

export type ActionResult = { success: true } | { error: string }

export async function createPhysio(data: { name: string }): Promise<ActionResult> {
  const parsed = physioSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const res = await fetch(`${BASE}/api/physio`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed.data),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    return { error: (body as { error?: string }).error ?? 'Error al crear el fisioterapeuta' }
  }

  revalidatePath('/physios')
  return { success: true }
}

export async function updatePhysio(
  id: string,
  data: { name: string }
): Promise<ActionResult> {
  const parsed = physioSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const res = await fetch(`${BASE}/api/physio/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed.data),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    return { error: (body as { error?: string }).error ?? 'Error al actualizar el fisioterapeuta' }
  }

  revalidatePath('/physios')
  return { success: true }
}

export async function deletePhysio(id: string): Promise<ActionResult> {
  const res = await fetch(`${BASE}/api/physio/${id}`, { method: 'DELETE' })

  if (!res.ok) {
    return { error: 'Error al eliminar el fisioterapeuta' }
  }

  revalidatePath('/physios')
  return { success: true }
}
