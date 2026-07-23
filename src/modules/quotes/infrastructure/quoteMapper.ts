import { Quote, QuoteStatus } from "../domain/Quote";

// Función interna — no exportada
// Compatibilidad con datos legacy en BD: normaliza valores históricos a valores válidos del dominio
const normalizeStatus = (raw: string): QuoteStatus => {
  if (['agendada', 'completada', 'cancelada'].includes(raw)) return raw as QuoteStatus;
  // Valores legacy: 'created' y 'pending' existían antes de que se definiera QuoteStatus
  if (raw === 'created' || raw === 'pending') return 'agendada';
  throw new Error(`Estado de cita inválido: ${raw}`);
};

// Mapea resultado Prisma → entidad de dominio
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fromPrismaToQuote = (prismaQuote: any): Quote => ({
  id: prismaQuote.id,
  physio: prismaQuote.physio,
  physioId: prismaQuote.physio_id,
  client: {
    id: prismaQuote.client.id,
    name: prismaQuote.client.name,
    contact: prismaQuote.client.contact,
  },
  clientId: prismaQuote.client_id,
  startDate: prismaQuote.startDate,
  endDate: prismaQuote.endDate,
  status: normalizeStatus(prismaQuote.status),
});
