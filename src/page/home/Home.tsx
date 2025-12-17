import { Link } from "react-router"
import type { Recipe } from "../../interface/Recipe"
import styles from "./home.module.css"

export default function Home({ recipes }: { recipes: Recipe[] }) {
  return (
    <div className={styles.home}>
      <h1>Les recettes oRecipes</h1>
      <h2>voici nos {recipes.length} recettes</h2>
      <ul className={styles.recipeContainer}>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <li className={styles.recipe} key={recipe.id}>
              <img src={recipe.thumbnail} alt={recipe.title} />
              <h3>{recipe.title}</h3>
              <p>Difficulté : {recipe.difficulty}</p>
              <Link to={recipe.slug}>Voir la recette</Link>
            </li>
          ))
        ) : (
          <li>
            <p>Aucune recette pour le moment</p>
          </li>
        )}
      </ul>
    </div>
  )
}
