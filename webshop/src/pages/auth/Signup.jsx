import React, { useContext, useState } from "react";
import { AuthContext } from "../../store/AuthContext";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm";

const Signup = () => {
  const { saveAuthData, getUser } = useContext(AuthContext);
  const navigate = useNavigate(); // <---- kõik hookid peavad olema loodud componendi top-levelil
  const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + process.env.REACT_APP_FIREBASE_WEB_API_KEY;
  const [message, setMessage] = useState("");

  const signupAndNavigate = (payload) => {

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
      <AuthForm 
        message={message}
        buttonName="Signup"
        submitted={signupAndNavigate}
      />
    </div>);
};

export default Signup;
