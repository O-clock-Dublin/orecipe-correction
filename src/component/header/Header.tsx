import { useContext, useEffect } from "react"
import { Link } from "react-router"
import styles from "./header.module.css"
import UserContext from "../../context/userContext"

export default function Header() {
  //Je récupère les boites qui m'interressent dans mon carton UserContexte
  const { token, username, setToken, setUsername } = useContext(UserContext)

  function handleLogout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setToken(null)
    setUsername(null)
  }

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté au chargement
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")
    
    if (storedToken && storedUser && !token) {
      setToken(storedToken)
      setUsername(storedUser)
    }
  }, [setToken, setUsername, token])

  return (
    <header className={styles.header}>
      <Link to="/">
        <img src="/vite.svg" alt="o'clock recipes" />
      </Link>
      {username ? (
        <div className={styles.userInfo}>
          <p>Bienvenue {username}</p>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Déconnexion
          </button>
        </div>
      ) : (
        <Link to="/login" className={styles.loginLink}>
          Se connecter
        </Link>
      )}
    </header>
  )
}
