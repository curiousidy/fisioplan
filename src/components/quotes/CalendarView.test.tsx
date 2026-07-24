// @vitest-environment jsdom

import { createRef } from 'react'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import CalendarView from './CalendarView'

const quote = {
  id: 'quote-1',
  physio: { id: 'physio-1', name: 'Ana Gómez' },
  client: { id: 'client-1', name: 'Bruno Díaz' },
  startDate: '2026-07-22T10:00:00.000Z',
  endDate: '2026-07-22T11:00:00.000Z',
  status: 'agendada' as const,
}

afterEach(cleanup)

describe('CalendarView appointment controls', () => {
  it('exposes a focusable native appointment button with its complete name and pointer activation origin', () => {
    const onSelectEvent = vi.fn()
    render(<CalendarView quotes={[quote]} onSelectEvent={onSelectEvent} />)

    const appointment = screen.getByRole('button', {
      name: /Bruno Díaz.*Ana Gómez.*22.*11:00.*12:00.*agendada/i,
    })
    expect((appointment as HTMLButtonElement).type).toBe('button')

    appointment.focus()
    expect(document.activeElement).toBe(appointment)

    fireEvent.click(appointment)
    expect(onSelectEvent).toHaveBeenCalledWith(quote, appointment)
  })

  it('recomputes the native appointment name from refreshed data and activates the same appointment', () => {
    const onSelectEvent = vi.fn()
    const { rerender } = render(<CalendarView quotes={[quote]} onSelectEvent={onSelectEvent} />)
    const refreshedQuote = {
      ...quote,
      physio: { ...quote.physio, name: 'Carla Ruiz' },
      client: { ...quote.client, name: 'Diana Pérez' },
      startDate: '2026-07-22T12:00:00.000Z',
      endDate: '2026-07-22T13:30:00.000Z',
      status: 'completada' as const,
    }

    rerender(<CalendarView quotes={[refreshedQuote]} onSelectEvent={onSelectEvent} />)

    const appointment = screen.getByRole('button', {
      name: /Diana Pérez.*Carla Ruiz.*22.*01:00.*02:30.*completada/i,
    })
    fireEvent.click(appointment)

    expect(onSelectEvent).toHaveBeenCalledWith(refreshedQuote, appointment)
    expect(screen.queryByRole('button', { name: /Bruno Díaz/i })).toBeNull()
  })

  it('forwards the calendar heading ref to its stable, programmatically focusable heading', () => {
    const headingRef = createRef<HTMLHeadingElement>()
    render(<CalendarView quotes={[quote]} headingRef={headingRef} />)

    const heading = screen.getByRole('heading', { name: /julio de 2026/i })
    expect(headingRef.current).toBe(heading)
    expect((heading as HTMLHeadingElement).tabIndex).toBe(-1)
  })
})
