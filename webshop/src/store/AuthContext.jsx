import { createContext, useState } from "react";

      // tema kaudu hakkan võtma mida context väljastab
export const AuthContext = createContext();

            // index.js faili -> tema sees olev useState globaalne
export function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("token") === "123");

  const login = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem("token", "123");
  }

  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("token");
  }

  return (     // saan igast failist, kes contexti impordib neid alumisi kätte
    <AuthContext.Provider value={{
      isLoggedIn, login, logout
      }}>
        {children}
    </AuthContext.Provider>
  )
}
