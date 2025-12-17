import { useEffect, useState } from "react";
import styles from "./header.module.css";

export default function Header() {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleAction(formData: FormData) {
    const email = String(formData.get("email")).trim();
    const password = String(formData.get("password")).trim();

    try {
      const response = await fetch(
        "https://orecipes-api-msfv.onrender.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setMessage(`Bienvenue ${data.pseudo}`);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.pseudo);
      } else {
        setErrorMessage("Erreur de connexion");
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
      setErrorMessage("Erreur de connexion");
    }
  }

  useEffect(() => {
    // Verifier l'integrité du token avec un json decode
    // Et le secret en .env (attention uniquement coté server ! Donc pas avec des applis react seules)

    //une fois que tout est valide je recupère le pseudo via soit le token / soit le localstorage / soit les cookies
    const pseudo: string | null = localStorage.getItem("user");
    (async () => {
      if (pseudo) {
        setMessage(`Bienvenue ${pseudo}`);
      }
    })();
  }, []);

  return (
    <header className={styles.header}>
      <a href="/">
        <img src="/vite.svg" alt="o'clock recipes" />
      </a>
      {message ? (
        <p>{message}</p>
      ) : (
        <>
          <form action={handleAction} className={styles.form}>
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
          {errorMessage && <p>{errorMessage}</p>}
        </>
      )}
    </header>
  );
}
