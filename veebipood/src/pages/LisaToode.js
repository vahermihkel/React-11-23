import React, { useRef, useState } from 'react'
import tootedFailist from "../data/tooted.json";

function LisaToode() {
  // useRef
  const [sonum, setSonum] = useState("Lisa uus toode!");
  const nimiRef = useRef();
  const hindRef = useRef();
  const piltRef = useRef();
  const aktiivneRef = useRef();

  const lisa = () => {
    if (nimiRef.current.value === "") {
      setSonum("Tühja nimetusega ei saa toodet lisada!");
      return;
    } 

    if (hindRef.current.value === "") {
      setSonum("Tühja hinnaga ei saa toodet lisada!");
      return;
    } 
    
    setSonum("Toode lisatud: " + nimiRef.current.value);
    tootedFailist.push(
      {
        "nimi": nimiRef.current.value, 
        "hind": Number(hindRef.current.value), 
        "aktiivne": aktiivneRef.current.checked, 
        "pilt": piltRef.current.value
      }
    );
  }

  // function lisa() {
  //   setSonum("Toode lisatud: " + nimiRef.current.value);
  // }

  return (
    <div>
      <div>{sonum}</div>
      <label>Nimi</label> <br />
      <input ref={nimiRef} type="text" /> <br />
      <label>Hind</label> <br />
      <input ref={hindRef} type="number" /> <br />
      <label>Pilt</label> <br />
      <input ref={piltRef} type="text" /> <br />
      <label>Aktiivne</label> <br />
      <input ref={aktiivneRef} type="checkbox" /> <br />
      <button onClick={lisa}>Lisa</button> <br />
    </div>
  )
}

// [(ngModel)]

export default LisaToode