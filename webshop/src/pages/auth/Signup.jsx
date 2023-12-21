import React, { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // <---- kõik hookid peavad olema loodud componendi top-levelil
  const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + process.env.REACT_APP_FIREBASE_WEB_API_KEY;

  const signupAndNavigate = () => {
    // API päring
    fetch(url, {})
      .then()
      .then()

    // õnnestub
    login();
    navigate("/admin");

    // feilib --> useState-ga mingi sõnum
  }

  return (
    <div>
      <label>E-mail</label> <br />
      <input type="text" /> <br />
      <label>Password</label> <br />
      <input type="password" /> <br />
      <button onClick={signupAndNavigate}>Login</button>
    </div>);
};

export default Signup;
