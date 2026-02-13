'use client'
import Card from "@/components/Card/Card"
import Select from "@/components/Select/Select"
import { Client } from "@/modules/client/domain/Client"
import { Plus } from "lucide-react"
import { FC, useState } from "react"
import styles from "./quote.module.css";
import Button from "@/components/Button/Button"
import { useRouter } from "next/navigation"
import { paths } from "@/config/routes"

interface ClientList {
  clientList: Client[];
}

const QuoteComponent: FC<ClientList> = ({ clientList }) => {
  const [showSelect, setShowSelect] = useState(false);
  const router = useRouter();

  const handleAddClientSelect = (event:React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowSelect(true);
  }

  return (
    <main>
      <h1>Seleccionar Clientes</h1>
      <h2>Selecciona hasta 2 clientes para la misma cita</h2>
      <section>
        <Card>
          <form>
            <label>Agregar cliente:</label>
            <div className={styles.container}>
              <SelectClient clientList={clientList} />
              <button onClick={handleAddClientSelect}><Plus /></button>
            </div>
            {showSelect && <SelectClient clientList={clientList} />}
          </form>
        </Card>
      </section>
      <Button text="Siguiente" variant="primary" onClick={() => router.push(paths.calendar)}/>
    </main>
  )
}

export default QuoteComponent

const SelectClient: FC<ClientList> = ({ clientList }) => {
  return <Select
    name='cliente'
    placeholder='Selecciona un cliente'
    options={clientList.map(client => ({
      label: client.name,
      value: client.id
    }))} />
}
