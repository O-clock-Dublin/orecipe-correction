// Import createContext
import { createContext } from "react";

// Create interface to define user context
interface userContext {
  token: string | null;
  username: string | null;
  //   setter with no return (void)
  setToken: (token: string | null) => void;
  setUsername: (username: string | null) => void;
}

// Create context with values by default
const UserContext = createContext<userContext>({
  token: null,
  username: null,
  setToken: () => {},
  setUsername: () => {},
});

export default UserContext;
