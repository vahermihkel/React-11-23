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
    const isOk = validateAuthData();
    if (isOk) {
      getUser();
    }
  }, [url]);

  const validateAuthData = () => {
    if (sessionStorage.getItem("expiresIn") === null ||
    sessionStorage.getItem("refreshToken") === null) {
      logout();
      return false;
    }
    if (Date.now() > Number(sessionStorage.getItem("expiresIn"))) {
      updateIdToken();
    }
    if (sessionStorage.getItem("token") === null) {
      logout();
      return false;
    }
    return true;
  }

  const getUser = async () => {
    const payload = {
      "idToken": sessionStorage.getItem("token")
    }
    fetch(url, {"method": "POST", "body": JSON.stringify(payload)})
      .then(res => res.json())
      .then(json => {
        console.log("SAIN USERI:"+json);
        if (json.error === undefined) { 
          setLoggedInUser(json.users[0]);
          setIsLoggedIn(true);
          checkLogin();
        } else {
          logout();
        }
      })
  }

  const refreshTokenUrl = "https://securetoken.googleapis.com/v1/token?key=" + process.env.REACT_APP_FIREBASE_WEB_API_KEY;

  const updateIdToken = async () => {
    const payload = {
      "refresh_token": sessionStorage.getItem("refreshToken"),
      "grant_type": "refresh_token"
    }
    await fetch(refreshTokenUrl, {"method": "POST", "body": JSON.stringify(payload)})
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          logout();
          return;
        }
        saveAuthData(json.id_token, json.refresh_token, json.expires_in);
      })
  }

  const saveAuthData = (idToken, refreshToken, expiresIn) => {
    let milliseconds = Date.now();
    milliseconds += Number(expiresIn) * 1000;
    sessionStorage.setItem("expiresIn", milliseconds);
    sessionStorage.setItem("token", idToken);
    sessionStorage.setItem("refreshToken", refreshToken);
  }

  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.clear();
    setLoggedInUser(null);
  }

  // Token: 1. aegumisaeg
  //        2. kelle token (isikukood, e-mail)
  //        3. võti millega soolata
  //        4. meie ettevõtte nimi?
  //        5. admin/tavaõigus?

  let checkLoginId;
  const checkLogin = ()=>{
      console.log(new Date(Number(sessionStorage.getItem("expiresIn"))))
      if(checkLoginId)clearTimeout(checkLoginId);
      if( Date.now()>Number(sessionStorage.getItem("expiresIn"))){
          logout();
      }
      checkLoginId=setTimeout(checkLogin,1000);
  }

  return (     // saan igast failist, kes contexti impordib neid alumisi kätte
    <AuthContext.Provider value={{
      isLoggedIn, saveAuthData, logout, loggedInUser, getUser
      }}>
        {children}
    </AuthContext.Provider>
  )
}
