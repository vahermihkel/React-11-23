import React, { useState } from 'react'
import ostukorvFailist from "../data/ostukorv.json"
import tootedFailist from "../data/tooted.json"
import { Link } from 'react-router-dom';

function Tooted() {
  const [tooted, setTooted] = useState(tootedFailist);

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
    ostukorvFailist.push(toode); // .add()
  }

  console.log("re-renderdasin");

  return (
    <div>
      <button onClick={sorteeriZA}>Sorteeri Z-A</button>
      <button onClick={filtreeriVah4Tahte}>Jäta alles vähemalt 4 tähelised</button>
      {tooted.map((toode, index) => 
        <div key={toode.nimi}>
          <img className="pilt" src={toode.pilt} alt="" />
          <div>{toode.nimi}</div>
          <div>{toode.hind.toFixed(2)} €</div>
          <div>{toode.aktiivne + 0}</div>
          <button onClick={() => lisaOstukorvi(toode)}>Lisa ostukorvi</button>
          <Link to={"/toode/" + toode.nimi.toLowerCase().replaceAll(" ", "-").replaceAll("õ", "o").replaceAll(",", "")}>
            <button>Vaata detailsemalt</button>
          </Link>

          <Link to={"/muuda/" + index}>
            <button>Muuda</button>
          </Link>
        </div>)}
    </div>
  )
}

export default Tooted