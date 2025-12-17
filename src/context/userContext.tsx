import { createContext } from "react"

// Je prépare les boites que je veux mettre dans mon carton
// Je type les différentes valeurs de chaque boite
// Ces boites sont pour le moment vides
interface UserContextType {
  token: null | string
  username: null | string
  setToken: (token: string | null) => void
  setUsername: (username: string | null) => void
}

//Je crée le carton avec deux boites vides dedans token et username
const UserContext = createContext<UserContextType>({
  token: null,
  username: null,
  setToken: () => {},
  setUsername: () => {},
})
export default UserContext
