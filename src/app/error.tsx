'use client'

import { startTransition } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  const router = useRouter()

  function retry() {
    startTransition(() => {
      router.refresh()
      reset()
    })
  }

  return (
    <section
      role="alert"
      aria-labelledby="error-title"
      className="flex min-h-[60vh] items-center justify-center px-2 py-8 sm:px-4"
    >
      <div className="w-full max-w-lg rounded-lg border border-neutral-200 bg-white p-6 text-center shadow-sm sm:p-8">
        <h1 id="error-title" className="text-2xl font-bold text-neutral-900">
          No pudimos cargar esta página
        </h1>
        <p className="mt-3 text-neutral-600">
          Ocurrió un problema temporal. Podés reintentar en unos instantes.
        </p>
        <Button type="button" onClick={retry} className="mt-6 w-full sm:w-auto">
          Reintentar
        </Button>
      </div>
    </section>
  )
}
