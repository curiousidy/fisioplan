import ScheduleContainer from "./ScheduleContainer";

export default async function Schedule({ searchParams }: { searchParams: Promise<{ date?: string }> }) {
  const { date } = await searchParams;
  return <ScheduleContainer date={date} />
}
