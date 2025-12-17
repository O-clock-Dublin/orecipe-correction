import { NavLink } from "react-router"
import type { Recipe } from "../../interface/Recipe"
import styles from "./navbar.module.css"

export default function Navbar({ recipes }: { recipes: Recipe[] }) {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "link")}
            to="/"
          >
            Accueil
          </NavLink>
        </li>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : "link")}
              to={`recipes/${recipe.slug}`}
            >
              {recipe.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
