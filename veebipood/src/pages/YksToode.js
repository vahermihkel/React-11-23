import React from 'react'
import { useParams } from 'react-router-dom'
import tootedFailist from "../data/tooted.json"

function YksToode() {
  // toode?nimi=BMW&hind=25000&pilt=www.
  // useSearchParams();


  // {nimi: "BMW i5", kategooria: "elektriautod"}
  const { nimi, kategooria } = useParams(); // object destructuring
  console.log(nimi);
  // const params = useParams(); // objekti võtmed ja väärtused

        // indexOf   -->  leiab objekti kaudu otside järjekorranumbri üles
        // findIndex --> leiab ühe omaduse kaudu järjekorranumbri üles
        // find --> leiab ühe omaduse kaudu elemendi enda üles
  const leitudToode = tootedFailist.find(toode => toode.nimi.toLowerCase().replaceAll(" ", "-").replaceAll("õ", "o").replaceAll(",", "") === nimi);
  console.log(leitudToode);

  if (leitudToode === undefined) {
    return <div>Toodet ei leitud</div>
  }

  return (
    <div>
      <div>{leitudToode.nimi}</div>
      <div>{leitudToode.hind}</div>
      <img src={leitudToode.pilt} alt="" />
      {/* <div>{kategooria}</div> */}
      {/* <div>{params.nimi}</div>
      <div>{params.kategooria}</div> */}
    </div>
  )
}

export default YksToode