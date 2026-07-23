import { z } from 'zod'

export const physioSchema = z.object({
  name: z.string()
    .min(1, 'El nombre es requerido')
    .refine(val => val.trim().length > 0, 'El nombre no puede estar vacío')
    .refine(val => !/\d/.test(val), 'El nombre no puede contener números'),
})

export type PhysioFormValues = z.infer<typeof physioSchema>
