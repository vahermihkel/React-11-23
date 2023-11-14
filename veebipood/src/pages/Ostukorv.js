import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ostukorvFailist from '../data/ostukorv.json'

// {{{[[[((([{[]}])))]]]}}}

function Ostukorv() {
  const [ostukorv, setOstukorv] = useState(ostukorvFailist);

  const tyhjenda = () => {
    ostukorvFailist.splice(0); // alates 0st indexit, lõpuni välja
    setOstukorv(ostukorvFailist.slice());
  }

  const kustuta = (index) => {
    ostukorvFailist.splice(index, 1); // .remove(index)
    setOstukorv(ostukorvFailist.slice());
  }

  // mutates (jätab mälukoha alles) või returns (uus mälukoht)
  //  ei ole võrdusmärki ees             pean panema väljundi uude muutujasse

  const arvutaKokku = () => {
    let summa = 0;
    // summa += ostukorv[0].hind;
    // summa += ostukorv[1].hind;
    ostukorv.forEach(toode => summa += toode.hind);
    console.log(summa);
    return summa;
  }

  return (
    <div>
      {ostukorv.length > 0 && <button onClick={tyhjenda}>Tühjenda</button>}
      <div>Ostukorvis on {ostukorv.length} toode(t)</div>
      {ostukorv.map((toode, index) => 
        <div key={index}>
          <img className="pilt" src={toode.pilt} alt="" />
          <div>{toode.nimi}</div>
          <div>{toode.hind} €</div>
          {/* <div>{toode.aktiivne + 0}</div> */}
          <button onClick={() => kustuta(index)}>x</button>
        </div>)}
      {ostukorv.length === 0 && 
      <>
        <div>Ostukorv on tühi</div>
        <Link to="/tooted">
          <button>Tooteid lisama</button>
        </Link>
      </>}
      <div>Kokku: {arvutaKokku()} €</div>
    </div>
  )
}

export default Ostukorv