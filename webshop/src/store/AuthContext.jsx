import { createContext, useEffect, useState } from "react";

      // tema kaudu hakkan võtma mida context väljastab
export const AuthContext = createContext();

            // index.js faili -> tema sees olev useState globaalne
export function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // võib tehniliselt ära kustutada
  const [loggedInUser, setLoggedInUser] = useState(null);

  const url = "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" + process.env.REACT_APP_FIREBASE_WEB_API_KEY; // URL täita

  useEffect(() => {
    if (sessionStorage.getItem("expiresIn") === null ||
    sessionStorage.getItem("token") === null ||
    sessionStorage.getItem("refreshToken") === null) {
      return;
    }
    if (Date.now() > Number(sessionStorage.getItem("expiresIn"))) {
      updateIdToken();
    }
    const payload = {
      "idToken": sessionStorage.getItem("token")
    }
    fetch(url, {"method": "POST", "body": JSON.stringify(payload)})
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if (json.error === undefined) { 
          setLoggedInUser(json.users[0]);
          setIsLoggedIn(true); // uuendada tokeneid
        } else {
          setLoggedInUser(null);
          setIsLoggedIn(false)
        }
      })
  }, [url]);

  const refreshTokenUrl = "https://securetoken.googleapis.com/v1/token?key=" + process.env.REACT_APP_FIREBASE_WEB_API_KEY;

  const updateIdToken = () => {
    const payload = {
      "refresh_token": sessionStorage.getItem("refreshToken"),
      "grant_type": "refresh_token"
    }
    fetch(refreshTokenUrl, {"method": "POST", "body": JSON.stringify(payload)})
      .then()
      .then()
  }

  const login = (idToken, refreshToken, expiresIn) => {
    setIsLoggedIn(true);
    let milliseconds = Date.now();
    milliseconds += Number(expiresIn);
    sessionStorage.setItem("expiresIn", milliseconds);
    sessionStorage.setItem("token", idToken);
    sessionStorage.setItem("refreshToken", refreshToken);
  }

  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("expiresIn");
  }

  return (     // saan igast failist, kes contexti impordib neid alumisi kätte
    <AuthContext.Provider value={{
      isLoggedIn, login, logout, loggedInUser
      }}>
        {children}
    </AuthContext.Provider>
  )
}
