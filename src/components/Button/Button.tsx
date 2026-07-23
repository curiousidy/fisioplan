import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "outlined";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: ButtonVariant;
}

export default function Button({ text, variant = "primary", ...rest }: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[variant]}`} {...rest}>
      {text}
    </button>
  );
}
