import { useContext, useEffect, useState } from "react"
import UserContext from "../../context/userContext"
import Home from "../home/Home";
import { Navigate } from "react-router";

export default function FavoritesPage({ apiUrl } : { apiUrl: string }) {
  const { token } = useContext(UserContext);
  const [favoritesRecipes, setFavoritesRecipes] = useState([]);
  const [isError, setIsError] = useState(false);

  async function fetchFavorites() {
    try {
      const response = await fetch(`${apiUrl}/favorites`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if(!response.ok) {
        setIsError(true);
      }

      const data = await response.json();
      setFavoritesRecipes(data.favorites);
    } catch {
      setIsError(true);
    }
  }

  useEffect(() => {
    (async () => {
      await fetchFavorites();
    })()
  }, [])

  return(
    <>
      {(isError || !token) && (
        <Navigate to="/" />
      )}
      {favoritesRecipes.length ? (
        <Home recipes={favoritesRecipes}/>
      ) : (
        <p>Vous n'avez pas encore de recette dans vos favoris</p>
      )}
    </>
  )
}