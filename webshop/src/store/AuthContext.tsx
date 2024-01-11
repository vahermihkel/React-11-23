import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../models/User";

      // tema kaudu hakkan võtma mida context väljastab
export const AuthContext = createContext({
  isLoggedIn: false, 
  isLogoutModal: false,
  loggedInUser: new User("", "", "", "", "", ""), 
  saveAuthData: (idToken: string, refreshToken: string, expiresIn: string) => {}, 
  logout: () => {}, 
  getUser: (isNavigate: boolean) => {}, 
  updateIdToken: () => {}
});

// {id: 13123, price: 312, name: "Tsadas"}

            // index.js faili -> tema sees olev useState globaalne
export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // võib tehniliselt ära kustutada
  const [loggedInUser, setLoggedInUser] = useState<User>(new User("", "", "", "", "", ""));
  const [isLogoutModal, setLogoutModal] = useState<boolean>(false);
  const checkLoginId = useRef<NodeJS.Timeout>();
  const navigate = useNavigate();
  
  const url = "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" + process.env.REACT_APP_FIREBASE_WEB_API_KEY; // URL täita
  const refreshTokenUrl = "https://securetoken.googleapis.com/v1/token?key=" + process.env.REACT_APP_FIREBASE_WEB_API_KEY;

  const validateAuthData = useCallback(() => {
    if (sessionStorage.getItem("expiresIn") === null ||
    sessionStorage.getItem("refreshToken") === null) {
      logout();
      return false;
    }
    // if (Date.now() > Number(sessionStorage.getItem("expiresIn"))) {
    //   updateIdToken();
    // }
    if (sessionStorage.getItem("token") === null) {
      logout();
      return false;
    }
    return true;
  }, []);

  const checkLogin = useCallback(() =>{
      // console.log(new Date(Number(sessionStorage.getItem("expiresIn"))))
      console.log("checkin");
      if(checkLoginId.current){
        clearTimeout(checkLoginId.current);
        console.log("clearib");
      };
      if( Date.now()>Number(sessionStorage.getItem("expiresIn"))){
          // logout();
          // console.log("login välja");
          setLogoutModal(true);
      } else {
        checkLoginId.current=setTimeout(checkLogin,1000);
      }
  }, [])

  const getUser = useCallback((isNavigated: boolean) => {
    const payload = {
      "idToken": sessionStorage.getItem("token")
    }
    fetch(url, {"method": "POST", "body": JSON.stringify(payload)})
      .then(res => res.json())
      .then((json: any) => {
        console.log(JSON.stringify(json.users[0].providerUserInfo[0]));
        if (json.error === undefined) { 
          setLoggedInUser(json.users[0].providerUserInfo[0]);
          setIsLoggedIn(true);
          checkLogin();
          if (isNavigated) {
            navigate("/admin");
          }
        } else {
          logout();
        }
      })
  }, [checkLogin, navigate, url])

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

  const saveAuthData = (idToken: string, refreshToken: string, expiresIn: string) => {
    let milliseconds = Date.now();
    milliseconds += Number(expiresIn) * 1000;
    sessionStorage.setItem("expiresIn", milliseconds.toString());
    sessionStorage.setItem("token", idToken);
    sessionStorage.setItem("refreshToken", refreshToken);
  }

  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.clear();
    setLoggedInUser(new User("", "", "", "", "", ""));
  }

  // Token: 1. aegumisaeg
  //        2. kelle token (isikukood, e-mail)
  //        3. võti millega soolata
  //        4. meie ettevõtte nimi?
  //        5. admin/tavaõigus?

  useEffect(() => {
    const isOk = validateAuthData();
    if (isOk) {
      getUser(false);
    }
  }, [url, getUser, validateAuthData]);

  return (     // saan igast failist, kes contexti impordib neid alumisi kätte
    <AuthContext.Provider value={{
      isLoggedIn, 
      loggedInUser,
      isLogoutModal,
      saveAuthData, 
      logout,
      getUser,
      updateIdToken
      }}>
        {children}
    </AuthContext.Provider>
  )
}
