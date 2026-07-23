import styles from "./Select.module.css";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement>{
  name: string;
  options: Option[];
  placeholder?: string;
}

export default function Select({ name, options, placeholder = "Selecciona una opción", ...rest }: SelectProps) {
  return (
    <select name={name} className={styles.select} {...rest}>
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}