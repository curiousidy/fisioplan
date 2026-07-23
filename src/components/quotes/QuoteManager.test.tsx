// @vitest-environment jsdom

import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import QuoteManager from './QuoteManager'
import { createQuote, updateQuote } from '@/app/quotes/actions'
import { toast } from 'sonner'

vi.mock('@/app/quotes/actions', () => ({
  createQuote: vi.fn(),
  updateQuote: vi.fn(),
  deleteQuote: vi.fn(),
}))

vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}))

type ActionResult = { success: true } | { error: string }

function deferred<T>() {
  let resolve!: (value: T) => void
  let reject!: (reason?: unknown) => void
  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })

  return { promise, resolve, reject }
}

const physios = [{ id: '11111111-1111-4111-8111-111111111111', name: 'Ana' }]
const clients = [{ id: '22222222-2222-4222-8222-222222222222', name: 'Bruno' }]
const quote = {
  id: 'quote-1',
  physio: physios[0],
  client: clients[0],
  startDate: '2026-07-22T10:00:00.000Z',
  endDate: '2026-07-22T11:00:00.000Z',
  status: 'agendada' as const,
}

function renderManager() {
  return render(<QuoteManager initialQuotes={[quote]} physios={physios} clients={clients} />)
}

function openCreateForm() {
  fireEvent.click(screen.getByRole('button', { name: 'Nueva cita' }))
  fireEvent.change(screen.getByLabelText(/Fisioterapeuta/), { target: { value: physios[0].id } })
  fireEvent.change(screen.getByLabelText(/Cliente/), { target: { value: clients[0].id } })
  fireEvent.change(screen.getByLabelText(/Fecha y hora/), { target: { value: '2026-07-23T10:00' } })
}

function submitCreateForm() {
  fireEvent.click(screen.getByRole('button', { name: 'Crear cita' }))
}

beforeEach(() => {
  vi.clearAllMocks()
})

afterEach(cleanup)

describe('QuoteManager submission lifecycle', () => {
  it('keeps create pending, locks duplicate submits, and closes only after success settles', async () => {
    const operation = deferred<ActionResult>()
    vi.mocked(createQuote).mockReturnValue(operation.promise)
    renderManager()

    openCreateForm()
    const form = screen.getByRole('button', { name: 'Crear cita' }).closest('form')!
    submitCreateForm()
    fireEvent.submit(form)

    await waitFor(() => expect(createQuote).toHaveBeenCalledTimes(1))
    expect((screen.getByRole('button', { name: 'Creando cita...' }) as HTMLButtonElement).disabled).toBe(true)
    expect(screen.getByLabelText(/Fisioterapeuta/).hasAttribute('disabled')).toBe(true)
    expect(screen.getByRole('dialog')).not.toBeNull()

    await act(async () => operation.resolve({ success: true }))
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
    expect(toast.success).toHaveBeenCalledWith('Cita creada correctamente')
  })

  it('keeps update pending and closes only after its success settles', async () => {
    const operation = deferred<ActionResult>()
    vi.mocked(updateQuote).mockReturnValue(operation.promise)
    renderManager()

    fireEvent.click(screen.getByRole('button', { name: 'Editar cita de Bruno' }))
    fireEvent.change(screen.getByLabelText(/Fecha de inicio/), { target: { value: '2026-07-22T09:00' } })
    fireEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }))

    await waitFor(() => expect(updateQuote).toHaveBeenCalledTimes(1))
    expect((screen.getByRole('button', { name: 'Guardando cambios...' }) as HTMLButtonElement).disabled).toBe(true)
    expect(screen.getByRole('dialog')).not.toBeNull()

    await act(async () => operation.resolve({ success: true }))
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
    expect(toast.success).toHaveBeenCalledWith('Cita actualizada correctamente')
  })

  it.each([
    ['reported failure', 'No hay disponibilidad', () => Promise.resolve({ error: 'No hay disponibilidad' })],
    ['unexpected rejection', 'Ocurrió un error inesperado', () => Promise.reject(new Error('network unavailable'))],
  ])('preserves create values and exposes an alert after %s', async (_name, expectedError, result) => {
    vi.mocked(createQuote).mockImplementation(result)
    renderManager()

    openCreateForm()
    submitCreateForm()

    await waitFor(() => expect(screen.getByRole('alert').textContent).toBe(expectedError))
    expect(screen.getByRole('dialog')).not.toBeNull()
    expect((screen.getByLabelText(/Fecha y hora/) as HTMLInputElement).value).toBe('2026-07-23T10:00')
    expect((screen.getByRole('button', { name: 'Crear cita' }) as HTMLButtonElement).disabled).toBe(false)
    expect(toast.error).toHaveBeenCalledTimes(1)
  })

  it('preserves update values and exposes an alert after a reported failure', async () => {
    vi.mocked(updateQuote).mockResolvedValue({ error: 'No hay disponibilidad' })
    renderManager()

    fireEvent.click(screen.getByRole('button', { name: 'Editar cita de Bruno' }))
    fireEvent.change(screen.getByLabelText(/Fecha de inicio/), { target: { value: '2026-07-22T09:00' } })
    fireEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }))

    await waitFor(() => expect(screen.getByRole('alert').textContent).toBe('No hay disponibilidad'))
    expect(screen.getByRole('dialog')).not.toBeNull()
    expect((screen.getByLabelText(/Fecha de inicio/) as HTMLInputElement).value).toBe('2026-07-22T09:00')
    expect((screen.getByRole('button', { name: 'Guardar cambios' }) as HTMLButtonElement).disabled).toBe(false)
    expect(toast.error).toHaveBeenCalledWith('No hay disponibilidad')
  })

  it.each([
    ['Escape', () => fireEvent.keyDown(document, { key: 'Escape' })],
    ['overlay', () => fireEvent.click(screen.getByRole('dialog').querySelector(':scope > [aria-hidden="true"]')!)],
    ['close control', () => fireEvent.click(screen.getByRole('button', { name: 'Cerrar' }))],
    ['Cancel', () => fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }))],
  ])('allows %s dismissal while pending without cancelling the mutation', async (_name, dismiss) => {
    const operation = deferred<ActionResult>()
    vi.mocked(createQuote).mockReturnValue(operation.promise)
    renderManager()

    openCreateForm()
    submitCreateForm()
    await waitFor(() => expect(createQuote).toHaveBeenCalledTimes(1))

    dismiss()
    expect(screen.queryByRole('dialog')).toBeNull()

    await act(async () => operation.resolve({ success: true }))
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it.each([
    ['successful stale settlement', (): ActionResult => ({ success: true })],
    ['failed stale settlement', (): ActionResult => ({ error: 'No hay disponibilidad' })],
  ])('isolates a reopened form from a %s', async (_name, settlement) => {
    const operation = deferred<ActionResult>()
    vi.mocked(createQuote).mockReturnValue(operation.promise)
    renderManager()

    openCreateForm()
    submitCreateForm()
    await waitFor(() => expect(createQuote).toHaveBeenCalledTimes(1))
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }))

    fireEvent.click(screen.getByRole('button', { name: 'Nueva cita' }))
    expect(screen.getByRole('dialog')).not.toBeNull()

    await act(async () => operation.resolve(settlement()))
    expect(screen.getByRole('dialog')).not.toBeNull()
    expect(screen.queryByRole('alert')).toBeNull()
    expect((screen.getByLabelText(/Fecha y hora/) as HTMLInputElement).value).toBe('')
  })
})
