'use client'

import { useMemo, useRef, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { FiPlus, FiCalendar, FiList } from '@/lib/icons'
import { Modal, ConfirmDialog, Button } from '@/components/ui'
import { createQuote, updateQuote, deleteQuote } from '@/app/quotes/actions'
import QuoteList, { type Quote } from './QuoteList'
import QuoteForm from './QuoteForm'
import QuoteFilters, { type QuoteFilterState } from './QuoteFilters'
import CalendarView from './CalendarView'
import type { QuoteCreateFormValues, QuoteUpdateFormValues } from '@/lib/schemas/quote.schema'

interface Physio {
  id: string
  name: string
}

interface Client {
  id: string
  name: string
}

interface QuoteManagerProps {
  initialQuotes: Quote[]
  physios: Physio[]
  clients: Client[]
}

const EMPTY_FILTERS: QuoteFilterState = { physioId: '', status: '', date: '' }

export default function QuoteManager({ initialQuotes, physios, clients }: QuoteManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null)
  const [deletingQuote, setDeletingQuote] = useState<Quote | null>(null)
  const [isPending, startTransition] = useTransition()
  const [modalSession, setModalSession] = useState(0)
  const [pendingSession, setPendingSession] = useState<number | null>(null)
  const [filters, setFilters] = useState<QuoteFilterState>(EMPTY_FILTERS)
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')
  const modalSessionRef = useRef(0)
  const modalMutationRef = useRef<{ session: number; promise: Promise<void> } | null>(null)

  // --- Handlers ---

  function handleOpenCreate() {
    setEditingQuote(null)
    const session = ++modalSessionRef.current
    setModalSession(session)
    setIsModalOpen(true)
  }

  function handleOpenEdit(quote: Quote) {
    setEditingQuote(quote)
    const session = ++modalSessionRef.current
    setModalSession(session)
    setIsModalOpen(true)
  }

  function handleOpenDelete(quote: Quote) {
    setDeletingQuote(quote)
  }

  function handleCloseModal() {
    ++modalSessionRef.current
    setPendingSession(null)
    setIsModalOpen(false)
    setEditingQuote(null)
  }

  function handleCloseDelete() {
    setDeletingQuote(null)
  }

  function runModalMutation(
    session: number,
    action: () => Promise<{ success: true } | { error: string }>,
    successMessage: string,
  ) {
    if (modalMutationRef.current?.session === session) return modalMutationRef.current.promise

    setPendingSession(session)

    let mutation!: Promise<void>
    mutation = new Promise<void>((resolve, reject) => {
      startTransition(async () => {
        try {
          const result = await action()
          if ('error' in result) {
            toast.error(result.error ?? 'Error inesperado')
            reject(new Error(result.error ?? 'Error inesperado'))
            return
          }

          toast.success(successMessage)
          if (modalSessionRef.current === session) handleCloseModal()
          resolve()
        } catch {
          const error = new Error('Ocurrió un error inesperado')
          toast.error(error.message)
          reject(error)
        } finally {
          if (modalSessionRef.current === session) setPendingSession(null)
          if (modalMutationRef.current?.promise === mutation) modalMutationRef.current = null
        }
      })
    })
    modalMutationRef.current = { session, promise: mutation }
    return mutation
  }

  function handleCreate(data: QuoteCreateFormValues | QuoteUpdateFormValues) {
    const createData = data as QuoteCreateFormValues
    const session = modalSession

    return runModalMutation(session, async () => {
      const start = new Date(createData.startDate)
      const end = new Date(start.getTime() + 60 * 60 * 1000)
      return createQuote({
        physio_id: createData.physio_id,
        client_id: createData.client_id,
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      })
    }, 'Cita creada correctamente')
  }

  function handleUpdate(data: QuoteCreateFormValues | QuoteUpdateFormValues) {
    if (!editingQuote) return Promise.resolve()
    const updateData = data as QuoteUpdateFormValues
    const quoteId = editingQuote.id
    const session = modalSession

    return runModalMutation(session, async () => {
      const payload: { startDate?: string; endDate?: string; status?: 'agendada' | 'completada' | 'cancelada' } = {}
      if (updateData.startDate) payload.startDate = new Date(updateData.startDate).toISOString()
      if (updateData.endDate) payload.endDate = new Date(updateData.endDate).toISOString()
      if (updateData.status) payload.status = updateData.status

      return updateQuote(quoteId, payload)
    }, 'Cita actualizada correctamente')
  }

  function handleConfirmDelete() {
    if (!deletingQuote) return
    startTransition(async () => {
      const result = await deleteQuote(deletingQuote.id)
      if ('error' in result) {
        toast.error(result.error ?? 'Error inesperado')
      } else {
        toast.success('Cita eliminada correctamente')
        handleCloseDelete()
      }
    })
  }

  // Convertir ISO a datetime-local format (slice to 'YYYY-MM-DDTHH:mm')
  function toDatetimeLocal(isoString: string): string {
    try {
      return new Date(isoString).toISOString().slice(0, 16)
    } catch {
      return ''
    }
  }

  const editDefaultValues = editingQuote
    ? {
        startDate: toDatetimeLocal(editingQuote.startDate),
        endDate: toDatetimeLocal(editingQuote.endDate),
        status: editingQuote.status,
      }
    : undefined

  const filteredQuotes = useMemo(() => {
    return initialQuotes.filter((q) => {
      if (filters.physioId && q.physio?.id !== filters.physioId) return false
      if (filters.status && q.status !== filters.status) return false
      if (filters.date) {
        const quoteDate = new Date(q.startDate)
        const selected = new Date(filters.date)
        if (
          quoteDate.getFullYear() !== selected.getFullYear() ||
          quoteDate.getMonth() !== selected.getMonth() ||
          quoteDate.getDate() !== selected.getDate()
        ) return false
      }
      return true
    })
  }, [initialQuotes, filters])

  return (
    <div className="space-y-4">
      {/* Header con botón de crear y toggle de vista */}
      <div className="flex flex-wrap items-center gap-3">
        <p className="w-full md:flex-1 text-sm text-neutral-500">
          {initialQuotes.length} {initialQuotes.length === 1 ? 'cita' : 'citas'} en total
        </p>
        {/* Toggle lista / calendario */}
        <div className="w-full md:w-auto flex items-center gap-2">
          <span className="text-sm text-neutral-600 font-medium">Vista:</span>
          <div className="flex flex-1 gap-1">
            <Button
              variant={viewMode === 'list' ? 'primary' : 'secondary'}
              size="sm"
              type="button"
              onClick={() => setViewMode('list')}
              className="flex-1 justify-center"
            >
              <FiList className="inline mr-1" aria-hidden="true" /> Lista
            </Button>
            <Button
              variant={viewMode === 'calendar' ? 'primary' : 'secondary'}
              size="sm"
              type="button"
              onClick={() => setViewMode('calendar')}
              className="flex-1 justify-center"
            >
              <FiCalendar className="inline mr-1" aria-hidden="true" /> Calendario
            </Button>
          </div>
        </div>
        {/* Botón nueva cita */}
        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenCreate}
          type="button"
          className="w-full md:w-auto justify-center"
        >
          <FiPlus aria-hidden="true" />
          Nueva cita
        </Button>
      </div>

      {/* Contenido condicional: lista o calendario */}
      {viewMode === 'list' ? (
        <div className="space-y-4">
          {/* Filtros — solo en vista lista */}
          <QuoteFilters
            physios={physios}
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(EMPTY_FILTERS)}
          />
          {/* Lista de citas */}
          <QuoteList
            quotes={filteredQuotes}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
          />
        </div>
      ) : (
        <CalendarView
          quotes={filteredQuotes}
          onSelectEvent={(quote, _origin) => {
            handleOpenEdit(quote)
          }}
        />
      )}

      {/* Modal create/edit */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingQuote ? 'Editar cita' : 'Nueva cita'}
      >
        <QuoteForm
          key={modalSession}
          mode={editingQuote ? 'edit' : 'create'}
          physios={physios}
          clients={clients}
          defaultValues={editDefaultValues}
          onSubmit={editingQuote ? handleUpdate : handleCreate}
          onCancel={handleCloseModal}
          isPending={pendingSession === modalSession}
        />
      </Modal>

      {/* Confirm delete */}
      <ConfirmDialog
        isOpen={deletingQuote !== null}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        title="Eliminar cita"
        message={
          deletingQuote
            ? `¿Confirmas que querés eliminar la cita de ${deletingQuote.client.name} con ${deletingQuote.physio.name}? Esta acción no se puede deshacer.`
            : ''
        }
        confirmLabel="Eliminar"
        loading={isPending}
      />
    </div>
  )
}
