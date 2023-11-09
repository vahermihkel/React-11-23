import React, { useState } from 'react'

function Avaleht() {
  // useState    setKogus    hook
  const [kogus, setKogus] = useState(6);
  const [sonum, setSonum] = useState("Uuenda kogust!");
  // const kasutaja = "3123";
  // let quantity = 6;
  //const username = votaKuskilt();

  const nulli = () => {
    setKogus( 0 );
    setSonum("Nullitud!");
  }

  const decrease = () => {
    setKogus( kogus - 1 );
    setSonum("Vähendatud!");
  }

  const increase = () => {
    setKogus( kogus + 1 );
    setSonum("Suurendatud!");
  }

  console.log(kogus);
  // if (false && )

  return (
    <div>
      <div>{sonum}</div>
      {kogus !== 0 && <button onClick={nulli}>Tagasi nulli</button>}
      <br />
      <button disabled={kogus === 0} onClick={decrease}>-</button>
      <span className={ kogus >= 10 ? "kuldne" : undefined }>{kogus}</span>
      <button onClick={increase}>+</button>
    </div>
  )
}

export default Avaleht