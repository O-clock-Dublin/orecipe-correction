import { createContext, useContext, useState } from "react";

type AuthContextType = {
  token: string | null;
  pseudo: string;
  login: (token: string, pseudo: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [pseudo, setPseudo] = useState("");

  const login = (token: string, pseudo: string) => {
    setToken(token);
    setPseudo(pseudo);
  };

  const logout = () => {
    setToken(null);
    setPseudo("");
  };

  return (
    <AuthContext.Provider value={{ token, pseudo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans AuthProvider");
  }
  return context;
};
export default AuthContext;