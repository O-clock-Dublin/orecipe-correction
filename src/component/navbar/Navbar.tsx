import { Link, Links } from "react-router"
import type { Recipe } from "../../interface/Recipe"
import styles from "./navbar.module.css"

export default function Navbar({ recipes }: { recipes: Recipe[] }) {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <Link to={`/${recipe.slug}`}>{recipe.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
