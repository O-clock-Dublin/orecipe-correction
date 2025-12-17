import { useContext, useState } from "react"
import styles from "./header.module.css"
import UserContext from "../../context/userContext"

export default function Header() {
  const { pseudo, setToken, setPseudo } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("")

  async function handleAction(formData: FormData) {
    const email = String(formData.get("email")).trim()
    const password = String(formData.get("password")).trim()

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
      )
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        setPseudo(`Bienvenue ${data.pseudo}`);
        setToken(data.token);
      } else {
        setErrorMessage("Erreur de connexion")
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error)
      setErrorMessage("Erreur de connexion")
    }
  }

  function handleLogout() {
    setPseudo("");
    setToken("");
  }

  return (
    <header className={styles.header}>
      <a href="/">
        <img src="/vite.svg" alt="o'clock recipes" />
      </a>
      {pseudo ? (
        <>        
          <p>{pseudo}</p>
          <button type="button" onClick={handleLogout}>deconnexion</button>
        </>
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
  )
}
