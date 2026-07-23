'use client'
import Card from '@/components/Card/Card'
import Select from '@/components/Select/Select'
import { Physio } from '@/modules/physio/domain/Physio'
import styles from "./physio.module.css";
import { Dispatch, FC, SetStateAction, useContext, useState } from 'react'
import Button from '@/components/Button/Button';
import { paths } from '@/config/routes';
import { useRouter } from 'next/navigation';
import QuoteFormContext from '@/modules/quotes/infrastructure/context/QuoteContext';

interface PhysioList{
    physioList: Physio[]
}
export const PhysioComponent:FC<PhysioList> = ({physioList}) => {
  const [physioNotSelected, setPhysioNotSelected] = useState(true);
  const router = useRouter();
  return (
     <main>
      <h1>Seleccionar Fisioterapeuta</h1>
      <section>
        <Card>
          <form>
            <label>Agregar Fisioterapeuta:</label>
            <div className={styles.container}>
              <SelectClient physioList={physioList} setPhysioNotSelected={setPhysioNotSelected}/>
            </div>
          </form>
        </Card>
      </section>
      <Button text="Siguiente" variant="primary" disabled={physioNotSelected} onClick={() => router.push(paths.resume)}/>
    </main>
  )
}

interface SelectClientProps extends PhysioList {
  setPhysioNotSelected: Dispatch<SetStateAction<boolean>>
}

const SelectClient: FC<SelectClientProps> = ({ physioList, setPhysioNotSelected }) => {
  const formContext = useContext(QuoteFormContext)
  const handleChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setPhysioNotSelected(false)
    formContext?.addPhysio({
      id: event.target.value,
      name:event.target.options[event.target.selectedIndex].text
    })
  }
  return <Select
    name='physio'
    aria-label="select physio"
    placeholder='Selecciona un fisioterapeuta'
    onChange={handleChange}
    options={physioList.map(physio => ({
      label: physio.name,
      value: physio.id
    }))} />
}
