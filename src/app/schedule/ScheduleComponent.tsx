'use client'
import Calendar from "@/components/Calendar/Calendar";
import { useState } from "react";


const ScheduleComponent = () => {
    const [selected, setSelected] = useState<Date | undefined>();
    const handleSelect = (date: Date) => {
        setSelected(date);
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
        </>
    )
}

export default ScheduleComponent