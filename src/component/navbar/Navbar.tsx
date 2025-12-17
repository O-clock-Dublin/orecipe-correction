import { NavLink } from "react-router"
import { useContext } from "react"
import type { Recipe } from "../../interface/Recipe"
import styles from "./navbar.module.css"
import UserContext from "../../context/userContext"

export default function Navbar({ recipes }: { recipes: Recipe[] }) {
  const { token } = useContext(UserContext)
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
        {token && (
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : "link")}
              to="/favorites"
            >
              Favoris
            </NavLink>
          </li>
        )}
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
