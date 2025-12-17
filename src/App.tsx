import { Route, Routes } from "react-router"
import "./App.css"
import Header from "./component/header/Header"
import Navbar from "./component/navbar/Navbar"
import Home from "./page/home/Home"
import { useEffect, useState } from "react"
import type { Recipe } from "./interface/Recipe"
import RecipePage from "./page/recipe/RecipePage"

function App() {
  const apiUrl = "https://orecipes-api-msfv.onrender.com/api"

  const [recipes, setRecipes] = useState<Recipe[]>([])

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
    <main>
      <div className="navigation-display">
        <Navbar recipes={recipes} />
        <div className="content-size">
          <Header />
          <Routes>
            <Route path="/" element={<Home recipes={recipes} />} />
            <Route path="/recipes/:slug" element={<RecipePage />} />
          </Routes>
        </div>
      </div>
    </main>
  )
}

export default App
