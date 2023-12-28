import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../store/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {  // muudan componendi nime 
  const { saveAuthData, getUser } = useContext(AuthContext);
  const navigate = useNavigate();           // muudan all olevat API endpointi
  const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + process.env.REACT_APP_FIREBASE_WEB_API_KEY;
  const emailRef = useRef();
  const passwordRef = useRef();
  const [message, setMessage] = useState("");

  const loginAndNavigate = () => { // muudan funktsiooni nime
    const payload = {
      "email": emailRef.current.value,
      "password": passwordRef.current.value,
      "returnSecureToken": true
    }

    fetch(url, {"method": "POST", "body": JSON.stringify(payload)})
      .then(res => res.json())
      .then(json => {
        if (json.error === undefined) {
          saveAuthData(json.idToken, json.refreshToken, json.expiresIn);
          getUser();
          navigate("/admin");
        } else {
          setMessage(json.error.message)
        } 
      });
  }

  return (
    <div>
      <div>{message}</div>
      <label>E-mail</label> <br />
      <input ref={emailRef} type="text" /> <br />
      <label>Password</label> <br />
      <input ref={passwordRef} type="password" /> <br />
      <button onClick={loginAndNavigate}>Login</button>
    </div>);
};

export default Login; // muudan componendi nime
