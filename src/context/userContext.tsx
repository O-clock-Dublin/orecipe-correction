import { createContext } from "react"


const UserContext = createContext({
  token: "",
  pseudo: "",
  setToken: (_: string) => {},
  setPseudo: (_: string) => {},
})
export default UserContext