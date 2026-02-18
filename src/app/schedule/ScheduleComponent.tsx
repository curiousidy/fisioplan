'use client'
import Calendar from "@/components/Calendar/Calendar";
import { Quote } from "@/modules/quotes/domain/Quote";
import { useRouter } from "next/navigation";

interface ScheduleComponentProps {
    quotes: Quote[];
    currentDate: string;
}

const ScheduleComponent = ({ quotes, currentDate }: ScheduleComponentProps) => {
    const router = useRouter();
    const selected = new Date(currentDate + 'T00:00:00');

    const handleSelect = (date: Date) => {
        const formatted = date.toISOString().split('T')[0];
        router.push(`/schedule?date=${formatted}`);
    }

    return (
        <>
            <h1>Listado de citas por fecha seleccionada</h1>
            <section>
                <Calendar
                    selected={selected}
                    onSelect={handleSelect}
                    disabled={{ before: new Date() }}
                />
            </section>
            <section>
                {quotes.length === 0 ? (
                    <p>No hay citas para esta fecha</p>
                ) : (
                    <ul>
                        {quotes.map(quote => (
                            <li key={quote.id}>
                                {new Date(quote.startDate).toLocaleTimeString()} - {quote.client.name} ({quote.physio.name})
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </>
    )
}

export default ScheduleComponent
