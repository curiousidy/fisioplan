'use client'
import Button from '@/components/Button/Button'
import Calendar from '@/components/Calendar/Calendar';
import { paths } from '@/config/routes';
import QuoteFormContext from '@/modules/quotes/infrastructure/context/QuoteContext';
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react';
import styles from './date.module.css'

export default function DatePage() {
  const router = useRouter();
  const formContext = useContext(QuoteFormContext)
  const [selected, setSelected] = useState<Date | undefined>();

  const handleSelect = (date: Date) => {
    setSelected(date);
    formContext?.setDate(date.toISOString().split('T')[0]);
  }

  return (
    <>
      <h1>Fecha de la cita</h1>
      <section className={styles.section}>
        <Calendar
          selected={selected}
          onSelect={handleSelect}
          disabled={{ before: new Date() }}
        />
      </section>
      <Button text="Siguiente" variant="primary" disabled={!selected} onClick={() => router.push(paths.physio)} />
    </>
  )
}
