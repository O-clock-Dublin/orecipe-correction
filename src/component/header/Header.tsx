import { useContext, useEffect, useState } from "react"
import styles from "./header.module.css"
import UserContext from "../../context/userContext"

export default function Header() {
  const [errorMessage, setErrorMessage] = useState("")

  //Je récupère les boites qui m'interressent dans mon carton UserContexte
  const { token, username, setToken, setUsername } = useContext(UserContext)

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
      if (response.status === 200) {
        localStorage.setItem("token", data.token)
        //Je met à jour la boite token du contexte, ce qui modifie le state dans app
        // Et met donc à jour le token sur toute l'application !
        setToken(data.token)
        localStorage.setItem("user", data.pseudo)
        // Pareil pour le pseudo !
        setUsername(data.pseudo)
        setErrorMessage("")
      } else if (response.status === 401) {
        setErrorMessage("Erreur de connexion : identifiants incorrects")
      } else {
        setErrorMessage("Erreur de connexion")
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error)
      setErrorMessage("Erreur de connexion")
    }
  }

  useEffect(() => {
    // Verifier l'integrité du token avec un json decode
    // Et le secret en .env (attention uniquement coté server ! Donc pas avec des applis react seules)

    //une fois que tout est valide je recupère le pseudo via soit le token / soit le localstorage / soit les cookies
    const storedToken: string | null = localStorage.getItem("token")
    const storedPseudo: string | null = localStorage.getItem("user")
    if (storedToken && storedPseudo) {
      setToken(storedToken)
      setUsername(storedPseudo)
    }
  }, [setToken, setUsername])

  function handleLogout() {
    setToken(null)
    setUsername(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setErrorMessage("")
  }

  return (
    <header className={styles.header}>
      <a href="/">
        <img src="/vite.svg" alt="o'clock recipes" />
      </a>
      {token && username ? (
        <div>
          <p>Bienvenue {username}</p>
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
