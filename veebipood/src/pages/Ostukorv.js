import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ostukorvFailist from '../data/ostukorv.json'

// {{{[[[((([{[]}])))]]]}}}

function Ostukorv() {
  const [ostukorv, setOstukorv] = useState(ostukorvFailist);

  const kustuta = (index) => {
    ostukorv.splice(index, 1); // .remove(index)
    setOstukorv(ostukorv.slice());
  }

  // mutates (jätab mälukoha alles) või returns (uus mälukoht)
  //  ei ole võrdusmärki ees             pean panema väljundi uude muutujasse

  return (
    <div>
      <div>Ostukorvis on {ostukorv.length} toode(t)</div>
      {ostukorv.map((toode, index) => 
        <div key={toode}>
          <span>{toode}</span>
          <button onClick={() => kustuta(index)}>x</button>
        </div>)}
      {ostukorv.length === 0 && 
      <>
        <div>Ostukorv on tühi</div>
        <Link to="/avaleht">
          <button>Tooteid lisama</button>
        </Link>
      </>}
    </div>
  )
}

export default Ostukorv