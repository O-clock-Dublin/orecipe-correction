import { useContext } from "react"
import styles from "./header.module.css"
import UserContext from "../../context/userContext"

export default function Header() {
  // On récupère les states globaux depuis le contexte
  const {
    token,
    username,
    error,
    setToken,
    setUsername,
    setError,
  } = useContext(UserContext)

  async function handleAction(formData: FormData) {
    const email = String(formData.get("email")).trim()
    const password = String(formData.get("password")).trim()

    // On réinitialise l'erreur avant une nouvelle tentative
    setError(null)

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

      if (response.status === 200) {
        const data = await response.json()
        setToken(data.token)
        setUsername(data.pseudo)
      } else if (response.status === 401) {
        setError("Erreur de connexion")
        setToken(null)
        setUsername(null)
      }
    } catch (err) {
      console.error("Erreur lors de la requête :", err)
      setError("Erreur de connexion")
    }
  }

  function handleLogout() {
    setToken(null)
    setUsername(null)
    setError(null)
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
              required
            />
            <input
              type="password"
              placeholder="Mot de passe"
              name="password"
              required
            />
            <button type="submit">Connexion</button>
          </form>

          {error && <p className={styles.error}>{error}</p>}
        </>
      )}
    </header>
  )
}
