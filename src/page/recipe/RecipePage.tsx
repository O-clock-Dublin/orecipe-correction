import { useEffect, useState } from "react"
import { useParams } from "react-router"
import type { Recipe } from "../../interface/Recipe"

export default function RecipePage() {
  const { slug } = useParams()
  const apiUrl = "https://orecipes-api-msfv.onrender.com/api"

  const [recipe, setRecipe] = useState<Recipe | undefined>()

  async function fetchRecipe() {
    const response = await fetch(`${apiUrl}/recipes/${slug}`)
    const fetchedRecipe: Recipe = await response.json()
    setRecipe(fetchedRecipe)
    console.log(fetchedRecipe)
  }

  useEffect(() => {
    ;(async () => {
      await fetchRecipe()
    })()
  }, [])

  return (
    <article>
      {recipe ? (
        <>
          <section>
            <img src={recipe.thumbnail} alt={recipe.title} />
            <div>
              <h1>{recipe.title}</h1>
              <p>
                {recipe.author} - {recipe.difficulty}
              </p>
            </div>
          </section>
          <section>
            <ul>
              {recipe.ingredients.length > 0 ? (
                recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.id}>
                    <p>
                      <span>
                        {ingredient.quantity} {ingredient.unit}{" "}
                      </span>{" "}
                      {ingredient.name}
                    </p>
                  </li>
                ))
              ) : (
                <li>
                  Aucun ingrédient n'a été donné pour cette recette...
                  Débrouille toi chef !
                </li>
              )}
            </ul>
          </section>
          <section>
            <ul>
              {recipe.instructions.length > 0 ? (
                recipe.instructions.map((instruction) => (
                  <li key={instruction}>{instruction}</li>
                ))
              ) : (
                <li>
                  <p>Pas d'instructions ici.... </p>
                </li>
              )}
            </ul>
          </section>
        </>
      ) : (
        <h1>recette introuvablke ou supprimée</h1>
      )}
    </article>
  )
}
