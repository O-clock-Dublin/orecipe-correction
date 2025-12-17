import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <a href="/">
        <img src="/vite.svg" alt="o'clock recipes" />
      </a>
      <p>O'Recipes</p>
    </header>
  );
}
