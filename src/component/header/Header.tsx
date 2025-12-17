import styles from "./header.module.css";
import { useEffect, useState } from "react";

export default function Header() {
  const [token, setToken] = useState<string | null>(null);
  const [pseudo, setPseudo] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("emailForm") as string;
    const password = formData.get("passwordForm") as string;

    // On va faire la requête API ici (prochaine étape)
    console.log("Email:", email, "Password:", password);
  }

  return (
    <header className={styles.header}>
      <a href="/">
        <img src="/vite.svg" alt="o'clock recipes" />
      </a>
      {pseudo ? (
        <p>Bienvenue, {pseudo} !</p>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="email" name="emailForm" placeholder="Adresse email" />
          <input
            type="password"
            name="passwordForm"
            placeholder="Mot de passe"
          />
          <button type="submit" name="submitButton">
            Se connecter
          </button>
        </form>
      )}
    </header>
  );
}
