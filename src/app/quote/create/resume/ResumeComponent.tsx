'use client'
import QuoteFormContext from "@/modules/quotes/infrastructure/context/QuoteContext"
import { createQuoteAction } from "@/modules/quotes/infrastructure/actions/createQuoteAction"
import styles from './resume.module.css'
import { useContext } from "react"
import { useRouter } from "next/navigation"

const ResumeComponent = () => {
  const formContext = useContext(QuoteFormContext)
  const router = useRouter()

  const handleSubmit = async () => {
    if (!formContext?.physio || !formContext.clients.length || !formContext.date) return

    await createQuoteAction(
      formContext.physio.id,
      formContext.clients[0].id,
      formContext.date
    )

    router.push('/schedule')
  }

  return (
    <main>
      <h1 className={styles.title}>Resumen de la cita</h1>
      <section className={styles.container}>
        <div>
          <p className={styles.title}>Nombre del cliente: </p>
          <p>{formContext?.clients.map(client => client.name)}</p>
        </div>
        <div>
          <p className={styles.title}>Nombre del fisioterapeuta: </p>
          <p>{formContext?.physio?.name}</p>
        </div>
        <div>
          <p className={styles.title}>Fecha de la cita: </p>
          <p>{formContext?.date}</p>
        </div>
      </section>
      <button onClick={handleSubmit}>Confirmar cita</button>
    </main>
  )
}

export default ResumeComponent
