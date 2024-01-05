import styles from "./style.module.css";
function ErrorElement({ children }) {
  return <div className={styles.error}>⛔ Error: {children}</div>;
}

export default ErrorElement;
