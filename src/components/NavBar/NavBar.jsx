import Logo from "./Logo/Logo";
import styles from "./style.module.css";
function NavBar({ children, movieCount }) {
  return (
    <div className={styles.navbar}>
      <Logo />
      {children}
      <NumResults>{movieCount}</NumResults>
    </div>
  );
}

export default NavBar;

function NumResults({ children }) {
  return (
    <p className={styles.numresults}>
      Found <strong>{children}</strong> results
    </p>
  );
}
