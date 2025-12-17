import { useState } from "react"
import styles from "./header.module.css"

export default function Header() {
  
  // const [message, setMessage] = useState("")
  const [token, setToken] = useState(null)  // Etat pour l'authentification
  const [pseudo, setPseudo] = useState("") 
  const [errorMessage, setErrorMessage] = useState("")

// Recuoeration des données de l'api
  async function handleAction(formData: FormData) { // Récupération des données du formaulaire
    const email = String(formData.get("email")).trim() 
    const password = String(formData.get("password")).trim()

// Reset des messages d'erreur
    setErrorMessage("")


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
    
        if (response.status === 200) {
          setToken(data.token)
          setPseudo(data.pseudo)
        }
    
        if (response.status === 401) {
          setErrorMessage("Email ou mot de passe incorrect")
        }
      } catch (error) {
        console.error(error)
        setErrorMessage("Erreur serveur")
      }
    }

function handleLogout() {
    setToken(null)
    setPseudo("")
  }

  return (
    <header className={styles.header}>
      <a href="/">
        <img src="/vite.svg" alt="o'clock recipes" />
      </a>
      {token ? (
          <div>
            <p>Bienvenue {pseudo}</p>
            <button onClick={handleLogout}>Déconnexion</button>
          </div>
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