import styles from "./header.module.css"

export default function Header() {
  return (
    <header className={styles.header}>
      <a href="/">
        <img src="/vite.svg" alt="o'clock recipes" />
      </a>
      <form className={styles.form}>
        <input
          type="email"
          placeholder="Adresse email"
          name="email"
          id="email"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          name="password"
          id="password"
        />
        <button type="submit">ok</button>
      </form>
    </header>
  )
}
