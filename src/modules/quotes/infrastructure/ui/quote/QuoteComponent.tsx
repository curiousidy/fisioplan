'use client'
import Button from "@/components/Button/Button"
import Card from "@/components/Card/Card"
import Select from "@/components/Select/Select"
import { paths } from "@/config/routes"
import { Client } from "@/modules/client/domain/Client"
import { Plus, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from "react"
import QuoteFormContext from "../../context/QuoteContext"
import styles from "./quote.module.css"

interface ClientList {
  clientList: Client[];
}

const QuoteComponent: FC<ClientList> = ({ clientList }) => {
  const [showSelect, setShowSelect] = useState(false);
  const [clientNotSelected, setClientNotSelected] = useState(true);
  const formContext = useContext(QuoteFormContext)
  const router = useRouter();


  const handleAddClientSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowSelect(true);
    setClientNotSelected(true)
  }

  const handleDeleteClientSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowSelect(false);
    const lastClient = formContext?.clients.at(-1);
    if (lastClient) {
      formContext?.removeClient(lastClient.id);
      setClientNotSelected(false)
    }
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
              <SelectClient clientList={clientList} setClientNotSelected={setClientNotSelected} />
              {showSelect && <SelectClient clientList={clientList} setClientNotSelected={setClientNotSelected} />}
              <div className={styles.buttonWrapper}>
                <button onClick={handleAddClientSelect} aria-label="plus"><Plus size={40} /></button>
                {showSelect && <button onClick={handleDeleteClientSelect} aria-label="trash"><Trash size={40} /></button>}
              </div>
            </div>
          </form>
        </Card>
      </section>
      <Button text="Siguiente" variant="primary" disabled={clientNotSelected} onClick={() => router.push(paths.calendar)} />
    </main>
  )
}

export default QuoteComponent

interface SelectClientProps extends ClientList {
  setClientNotSelected: Dispatch<SetStateAction<boolean>>
}
const SelectClient: FC<SelectClientProps> = ({ clientList, setClientNotSelected }) => {
  const formContext = useContext(QuoteFormContext)
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setClientNotSelected(false)
    formContext?.addClient({
      id: event.target.value,
      name: event.target.options[event.target.selectedIndex].text
    })
  }
  return <Select
    name='cliente'
    aria-label="select client"
    placeholder='Selecciona un cliente'
    onChange={handleChange}
    options={clientList.map(client => ({
      label: client.name,
      value: client.id
    }))} />
}
