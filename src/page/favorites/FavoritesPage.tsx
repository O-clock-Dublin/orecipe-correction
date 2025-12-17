import { useContext, useEffect, useState } from "react"
import type { Recipe } from "../../interface/Recipe"
import { Link, useNavigate } from "react-router"
import UserContext from "../../context/userContext"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Recipe[]>([])
  const navigate = useNavigate()

  // ICI Je peux récupérer la boite username depuis mon carton de contexte
  // Avec le hook useContexte, j'appelle UserContexte
  const { username, token } = useContext(UserContext)

  useEffect(() => {
    if (token) {
      ;(async () => {
        const response = await fetch(
          "https://orecipes-api-msfv.onrender.com/api/favorites",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        if (response.status === 200) {
          const result = await response.json()
          setFavorites(result.favorites)
        } else if (response.status === 401) {
          navigate("/")
        }
      })()
    }
  }, [token, navigate])

  return (
    <div>
      {/* 
        J'affiche les données à jour de username
        Sans avoir besoin de props drilling
        */}
      <h1>Bonjour {username} : voici tes recettes favorites : </h1>
      <ul>
        {favorites.length > 0 ? (
          favorites.map((favorite) => (
            <li key={favorite.id}>
              <img src={favorite.thumbnail} alt={favorite.title} />
              <h3>{favorite.title}</h3>
              <p>Difficulté : {favorite.difficulty}</p>
              <Link to={`recipes/${favorite.slug}`}>Voir la recette</Link>
            </li>
          ))
        ) : (
          <li>Pas de favoris</li>
        )}
      </ul>
    </div>
  )
}
