import styles from "./Icon.module.css";

interface IconProps {
  children: React.ReactNode;
}

export default function Icon({children }: IconProps) {
  return (
    
      <div className={styles.icon}>{children}</div>
    
  );
}
