import { createContext, useState, ReactNode } from "react"

// Je prépare les boites que je veux mettre dans mon carton
// Je type les différentes valeurs de chaque boite
// Ces boites sont pour le moment vides
interface UserContextType {
  token: string | null
  username: string | null
  error: string | null
  setToken: (token: string | null) => void
  setUsername: (username: string | null) => void
  setError: (error: string | null) => void
}

//Je crée le carton avec deux boites vides dedans token et username
const UserContext = createContext<UserContextType>({
  token: null,
  username: null,
  error: null,
  setToken: () => {},
  setUsername: () => {},
  setError: () => {},
})



export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  return (
    <UserContext.Provider
      value={{
        token,
        username,
        error,
        setToken,
        setUsername,
        setError,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}


export default UserContext
