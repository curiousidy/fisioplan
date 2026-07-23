import styles from "./Card.module.css";

interface CardProps {
  title?: string;
  children: React.ReactNode;
}

export default function Card({ title, children }: CardProps) {
  return (
    <article className={styles.card}>
      {title &&
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
        </header>
      }
      <div className={styles.content}>{children}</div>
    </article>
  );
}
