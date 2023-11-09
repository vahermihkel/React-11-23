import React, { useState } from 'react'
import tootedFailist from "../data/ostukorv.json"

function Tooted() {
  const [tooted, setTooted] = useState(["BMW", "Nobe", "Tesla", "Kia", "Saab"]);

  const sorteeriZA = () => {
    tooted.sort((a,b) => b.localeCompare(a));
    // console.log(tooted);
    setTooted(tooted.slice());
    // console.log([...tooted]);
    // console.log([...tooted[0]])
    // setTooted([...tooted]);
  }

  const filtreeriVah4Tahte = () => {
    const vastus = tooted.filter(toode => toode.length >= 4);
    setTooted(vastus);
  }

  const lisaOstukorvi = (toode) => {
    tootedFailist.push(toode); // .add()
  }

  console.log("re-renderdasin");

  return (
    <div>
      <button onClick={sorteeriZA}>Sorteeri Z-A</button>
      <button onClick={filtreeriVah4Tahte}>Jäta alles vähemalt 4 tähelised</button>
      {tooted.map((toode) => 
        <div key={toode}>
          <div>{toode}</div>
          <button onClick={() => lisaOstukorvi(toode)}>Lisa ostukorvi</button>
        </div>)}
    </div>
  )
}

export default Tooted