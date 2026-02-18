import { prismaQuoteRepository } from '@/modules/quotes/infrastructure/PrismaQuoteRepository'
import { findByDateUseCase } from '@/modules/quotes/application/findByDate/FindByDateUseCase'
import ScheduleComponent from './ScheduleComponent'

const ScheduleContainer = async ({ date }: { date?: string }) => {
  const selectedDate = date ? new Date(date) : new Date();
  const quotes = await findByDateUseCase(prismaQuoteRepository, selectedDate);

  return (
    <ScheduleComponent
      quotes={quotes}
      currentDate={selectedDate.toISOString().split('T')[0]}
    />
  )
}

export default ScheduleContainer
