import React, { useContext, useState } from "react";
import { AuthContext } from "../../store/AuthContext";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm";

const Login = () => {  // muudan componendi nime 
  const { saveAuthData, getUser } = useContext(AuthContext);
  const navigate = useNavigate();           // muudan all olevat API endpointi
  const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + process.env.REACT_APP_FIREBASE_WEB_API_KEY;
  const [message, setMessage] = useState("");

  const loginAndNavigate = async (payload) => { // muudan funktsiooni nime
    fetch(url, {"method": "POST", "body": JSON.stringify(payload)})
      .then(res => res.json())
      .then(async json => {
        if (json.error === undefined) {
          saveAuthData(json.idToken, json.refreshToken, json.expiresIn);
          await getUser();
          console.log("HAKKASIN NAVIGEERIMA");
          navigate("/admin");
        } else {
          setMessage(json.error.message)
        } 
      });
  }

  return (
    <div>
      <AuthForm 
        message={message}
        buttonName="Login"
        submitted={loginAndNavigate}
      />
    </div>);
};

export default Login; // muudan componendi nime
