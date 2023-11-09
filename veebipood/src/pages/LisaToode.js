import React, { useRef, useState } from 'react'

function LisaToode() {
  // useRef
  const [sonum, setSonum] = useState("Lisa uus toode!");
  const nimiRef = useRef();

  const lisa = () => {
    if (nimiRef.current.value === "") {
      setSonum("Tühja nimetusega ei saa toodet lisada!");
    } else {
      setSonum("Toode lisatud: " + nimiRef.current.value);
    }
  }

  // function lisa() {
  //   setSonum("Toode lisatud: " + nimiRef.current.value);
  // }

  return (
    <div>
      <div>{sonum}</div>
      <label>Uus toode</label> <br />
      <input ref={nimiRef} type="text" /> <br />
      <button onClick={lisa}>Lisa</button> <br />
    </div>
  )
}

// [(ngModel)]

export default LisaToode