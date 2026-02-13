'use client'
import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import { paths } from '@/config/routes';
import { useRouter } from 'next/navigation'


export default function Calendar() {
  const router = useRouter();
  return (
    <>
      <form>
        <label>Fecha de la cita </label>
        <Input
          type='date'
        />
      </form>
      <Button text="Siguiente" variant="primary" onClick={() => router.push(paths.physio)} />
    </>
  )
}
