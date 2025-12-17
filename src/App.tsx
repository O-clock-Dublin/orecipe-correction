import { Route, Routes } from "react-router"
import "./App.css"
import Header from "./component/header/Header"
import Navbar from "./component/navbar/Navbar"
import Home from "./page/home/Home"
import { useEffect, useState } from "react"
import type { Recipe } from "./interface/Recipe"
import RecipePage from "./page/recipe/RecipePage"
import FavoritesPage from "./page/favorites/FavoritesPage"
import UserContext from "./context/userContext"
import LoginForm from "./component/login/LoginForm"

function App() {
  const apiUrl = "https://orecipes-api-msfv.onrender.com/api"

  const [recipes, setRecipes] = useState<Recipe[]>([])
  // Je prépare des states qui viendront dans les boites de mon carton (mon contexte)
  const [token, setToken] = useState<null | string>(null)
  const [username, setUsername] = useState<null | string>(null)

  async function fetchRecipes() {
    const response = await fetch(`${apiUrl}/recipes`)
    const fetchedRecipes: Recipe[] = await response.json()
    setRecipes(fetchedRecipes)
  }

  useEffect(() => {
    ;(async () => {
      await fetchRecipes()
    })()
  }, [])

  return (
    // J'englobe toute l'application dans mon contexte
    //Afin de pouvoir me servir dans le carton absolument OU JE VEUX
    // Par la même occasion je mets dans les boites les données issues des states préparées afin qu'elles soient mises à jour
    <UserContext
      value={{
        token: token,
        username: username,
        setToken: setToken,
        setUsername: setUsername,
      }}
    >
      <main>
        <div className="navigation-display">
          <Navbar recipes={recipes} />
          <div className="content-size">
            <Header />
            <LoginForm />
            <Routes>
              <Route path="/" element={<Home recipes={recipes} />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/recipes/:slug" element={<RecipePage />} />
            </Routes>
          </div>
        </div>
      </main>
    </UserContext>
  )
}

export default App
