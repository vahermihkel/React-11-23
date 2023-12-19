import React, { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // <---- kõik hookid peavad olema loodud componendi top-levelil

  const loginAndNavigate = () => {
    // API päring

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
      <button onClick={loginAndNavigate}>Login</button>
    </div>);
};

export default Login;
