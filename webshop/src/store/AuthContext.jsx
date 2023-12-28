import { createContext, useEffect, useState } from "react";

      // tema kaudu hakkan võtma mida context väljastab
export const AuthContext = createContext();

            // index.js faili -> tema sees olev useState globaalne
export function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // võib tehniliselt ära kustutada
  const [loggedInUser, setLoggedInUser] = useState(null);

  const url = "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" + process.env.REACT_APP_FIREBASE_WEB_API_KEY; // URL täita

  // timeout?  ringi käies logiks ka välja
  // peita URL-d

  // kontrollid / validations - kui tuleb tühjus refresh tokeniga

  useEffect(() => {
    if (sessionStorage.getItem("expiresIn") === null ||
    sessionStorage.getItem("refreshToken") === null) {
      sessionStorage.clear();
      return;
    }
    if (true || Date.now() > Number(sessionStorage.getItem("expiresIn"))) {
      updateIdToken();
    }
    if (sessionStorage.getItem("token") === null) {
      sessionStorage.clear();
      return;
    }
    const payload = {
      "idToken": sessionStorage.getItem("token")
    }
    // siia fetchi ilma ülemise await-ta läheks korraga
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

  const updateIdToken = async () => {
    console.log("UPDATE-n Tokenit")
    const payload = {
      "refresh_token": sessionStorage.getItem("refreshToken"),
      "grant_type": "refresh_token"
    }
    // fetch on alati async ehk asünkroonne, lubab koodil edasi minna
    await fetch(refreshTokenUrl, {"method": "POST", "body": JSON.stringify(payload)})
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          console.log("CLEARING kui refreshtokenit saates error");
          sessionStorage.clear();
          return;
        }
        login(json.id_token, json.refresh_token, json.expires_in);
      })
  }

  const login = (idToken, refreshToken, expiresIn) => {
    console.log(idToken);
    console.log(refreshToken);
    console.log(expiresIn);
    setIsLoggedIn(true);
    let milliseconds = Date.now();
    milliseconds += Number(expiresIn) * 1000;
    console.log(milliseconds);
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
