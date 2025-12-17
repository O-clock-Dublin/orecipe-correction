import { createContext } from "react"

// Je prépare les boites que je veux mettre dans mon carton
// Je type les différentes valeurs de chaque boite
// Ces boites sont pour le moment vides
interface UserContextType {
  token: null | string
  username: null | string
  errorMessage: string
  setToken: (token: string | null) => void
  setUsername: (username: string | null) => void
  setErrorMessage: (message: string) => void
}

//Je crée le carton avec les boites vides dedans
const UserContext = createContext<UserContextType>({
  token: null,
  username: null,
  errorMessage: '',
  setToken: () => {},
  setUsername: () => {},
  setErrorMessage: () => {},
})
export default UserContext
