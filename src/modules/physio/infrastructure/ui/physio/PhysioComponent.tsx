'use client'
import Card from '@/components/Card/Card'
import Select from '@/components/Select/Select'
import { Physio } from '@/modules/physio/domain/Physio'
import styles from "./physio.module.css";
import { FC } from 'react'
import Button from '@/components/Button/Button';
import { paths } from '@/config/routes';
import { useRouter } from 'next/navigation';

interface PhysioList{
    physioList: Physio[]
}
export const PhysioComponent:FC<PhysioList> = ({physioList}) => {
    const router = useRouter();
  return (
     <main>
      <h1>Seleccionar Fisioterapeuta</h1>
      <section>
        <Card>
          <form>
            <label>Agregar Fisioterapeuta:</label>
            <div className={styles.container}>
              <SelectClient physioList={physioList} />
            </div>
          </form>
        </Card>
      </section>
      <Button text="Siguiente" variant="primary" onClick={() => router.push(paths.resume)}/>
    </main>
  )
}

const SelectClient: FC<PhysioList> = ({ physioList }) => {
  return <Select
    name='physio'
    placeholder='Selecciona un fisioterapeuta'
    options={physioList.map(physio => ({
      label: physio.name,
      value: physio.id
    }))} />
}
