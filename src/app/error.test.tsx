// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import ErrorBoundary from './error'

const { refresh } = vi.hoisted(() => ({ refresh: vi.fn() }))

vi.mock('next/navigation', () => ({
  useRouter: () => ({ refresh }),
}))

afterEach(cleanup)

describe('App error boundary', () => {
  it('shows a safe accessible message and refreshes the route before resetting', () => {
    const reset = vi.fn()
    const error = new Error('P1001: Cannot reach database server')

    render(<ErrorBoundary error={error} reset={reset} />)

    expect(screen.getByRole('alert').textContent).toContain('No pudimos cargar esta página')
    expect(screen.queryByText(/P1001|database server/i)).toBeNull()

    fireEvent.click(screen.getByRole('button', { name: 'Reintentar' }))

    expect(refresh).toHaveBeenCalledOnce()
    expect(reset).toHaveBeenCalledOnce()
    expect(refresh.mock.invocationCallOrder[0]).toBeLessThan(
      reset.mock.invocationCallOrder[0],
    )
  })
})
