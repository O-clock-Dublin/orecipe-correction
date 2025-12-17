import { useContext, useEffect } from "react"
import { useNavigate } from "react-router"
import UserContext from "../context/userContext"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token } = useContext(UserContext)
  const navigate = useNavigate()
  
  useEffect(() => {
    // Si pas de token, rediriger vers la page de connexion
    if (!token) {
      navigate("/login", { replace: true })
    }
  }, [token, navigate])
  
  // Si token présent, afficher le composant enfant
  if (token) {
    return <>{children}</>
  }
  
  // Pendant la redirection, afficher rien ou un loading
  return null
}
