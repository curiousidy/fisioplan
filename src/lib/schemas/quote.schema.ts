import { z } from 'zod'

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export const quoteCreateSchema = z.object({
  physio_id: z.string().uuid('Seleccioná un fisioterapeuta'),
  client_id: z.string().uuid('Seleccioná un cliente'),
  startDate: z.string().min(1, 'La fecha y hora es requerida'),
})

export const quoteUpdateSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  status: z.enum(['agendada', 'completada', 'cancelada']).optional(),
}).refine(
  data => {
    if (data.startDate && data.endDate) {
      return new Date(data.endDate) > new Date(data.startDate)
    }
    return true
  },
  { message: 'La fecha de fin debe ser posterior a la de inicio', path: ['endDate'] }
).refine(
  data => {
    if (data.startDate && data.endDate) {
      return isSameDay(new Date(data.startDate), new Date(data.endDate))
    }
    return true
  },
  { message: 'La cita debe comenzar y terminar el mismo día', path: ['endDate'] }
)

export type QuoteCreateFormValues = z.infer<typeof quoteCreateSchema>
export type QuoteUpdateFormValues = z.infer<typeof quoteUpdateSchema>
