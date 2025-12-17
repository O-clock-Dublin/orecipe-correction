import { useContext, useEffect } from "react"
import { useNavigate } from "react-router"
import UserContext from "../../context/userContext"
import styles from "./login.module.css"

export default function LoginPage() {
  const navigate = useNavigate()
  const { token, username, errorMessage, setToken, setUsername, setErrorMessage } = useContext(UserContext)

  // Si l'utilisateur est déjà connecté, rediriger vers l'accueil
  useEffect(() => {
    if (token && username) {
      navigate("/")
    }
  }, [token, username, navigate])

  async function handleSubmit(formData: FormData) {
    const email = String(formData.get("email")).trim()
    const password = String(formData.get("password")).trim()

    if (!email || !password) {
      setErrorMessage("Veuillez remplir tous les champs")
      return
    }

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
      
      if (response.ok) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", data.pseudo)
        setToken(data.token)
        setUsername(data.pseudo)
        setErrorMessage("")
        navigate("/")
      } else {
        setErrorMessage(data.message || "Erreur de connexion")
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error)
      setErrorMessage("Erreur de connexion")
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h1>Connexion</h1>
        <form action={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Adresse email</label>
            <input
              type="email"
              placeholder="Adresse email"
              name="email"
              id="email"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              placeholder="Mot de passe"
              name="password"
              id="password"
              required
            />
          </div>
          {errorMessage && (
            <div className={styles.error}>
              {errorMessage}
            </div>
          )}
          <button type="submit" className={styles.submitButton}>
            Se connecter
          </button>
        </form>
      </div>
    </div>
  )
}
