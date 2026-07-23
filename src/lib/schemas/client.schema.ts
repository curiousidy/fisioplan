import { z } from 'zod'

const phoneSchema = z.string().min(9, 'El teléfono debe tener al menos 9 dígitos')
const emailSchema = z.string().email('Formato de email inválido')

export const clientSchema = z.object({
  name: z.string()
    .min(1, 'El nombre es requerido')
    .refine(val => val.trim().length > 0, 'El nombre no puede estar vacío')
    .refine(val => !/\d/.test(val), 'El nombre no puede contener números'),
  contact: z.union([emailSchema, phoneSchema], {
    error: 'Ingresá un email válido o teléfono (mín. 9 dígitos)',
  }),
})

export const clientUpdateSchema = clientSchema.extend({
  contact: z.union([emailSchema, phoneSchema]).optional(),
})

export type ClientFormValues = z.infer<typeof clientSchema>
export type ClientUpdateFormValues = z.infer<typeof clientUpdateSchema>
