'use client'
import QuoteFormContext from "@/modules/quotes/infrastructure/context/QuoteContext"
import styles from './resume.module.css'
import { useContext } from "react"

const ResumeComponent = () => {
  const formContext = useContext(QuoteFormContext)
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
    </main>
  )
}

export default ResumeComponent