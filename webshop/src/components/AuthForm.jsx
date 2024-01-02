import React, { useRef } from 'react'

//   AuthForm = ({message, buttonName, submitted})
const AuthForm = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
     
  const submit = () => {
    const payload = {
      "email": emailRef.current.value,
      "password": passwordRef.current.value,
      "returnSecureToken": true
    }
    props.submitted(payload); 
    // tagataustal tegelikult käivitab loginAndNavigate/signupAndNavigate
  }

  return (
    <>
      <div>{props.message}</div>
      <label>E-mail</label> <br />
      <input ref={emailRef} type="text" /> <br />
      <label>Password</label> <br />
      <input ref={passwordRef} type="password" /> <br />
      <button onClick={submit}>{props.buttonName}</button>
    </>
  )
}

export default AuthForm