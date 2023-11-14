import { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import tootedFailist from "../data/tooted.json"

function MuudaToode() {
  // useState --> HTMLi muutmiseks (re-renderdus)
  // useRef --> elemendi kättesaamiseks (inputi eest väärtust kätte)
  // useParams --> URLi muutujate kättesaamiseks
  // useNavigate --> navigeerimiseks
  // reeglid:
  // 1. alati tuleb importida
  // 2. alati use- ees   useSuperPower()
  // 3. peab olema alati sulud lõpus ehk funktsioon välja kutsutud
  // 4. ei tohi olla deklareerimine funktsiooni sees 
  // 5. ei tohi olla loodud tingimuslikult


  const { index } = useParams();
  const leitud = tootedFailist[index];
  const nimiRef = useRef();
  const hindRef = useRef();
  const piltRef = useRef();
  const aktiivneRef = useRef();
  const navigate = useNavigate();

  // undefined --> pole teada ka tüüpi
  // null --> puhul on teada tüüp

  const muuda = () => {
    tootedFailist[index] = {
      "nimi": nimiRef.current.value, //.current.value annab alati stringi
      "hind": Number(hindRef.current.value), 
      "aktiivne": aktiivneRef.current.checked, 
      "pilt": piltRef.current.value
    }
    navigate("/tooted");
  }

  // undefined vs null
  if (leitud === undefined) {
    return <div>Toodet ei leitud</div>
  }

  return (
    <div>
      <label>Nimi</label> <br />
      <input ref={nimiRef} type="text" defaultValue={leitud.nimi} /> <br />
      <label>Hind</label> <br />
      <input ref={hindRef} type="number" defaultValue={leitud.hind} /> <br />
      <label>Pilt</label> <br />
      <input ref={piltRef} type="text" defaultValue={leitud.pilt} /> <br />
      <label>Aktiivne</label> <br />
      <input ref={aktiivneRef} type="checkbox" defaultChecked={leitud.aktiivne} /> <br />
      <button onClick={muuda}>Muuda</button>
    </div>
  )
}

export default MuudaToode

// useParams()
// useNavigate()