import React, { useEffect, useState } from 'react'

// rafce
const ParcelMachines = () => {
  const [parcelMachines, setParcelMachines] = useState([]);
  const url = "https://www.omniva.ee/locations.json";

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(json => {
        const result = json.filter(pm => pm.A0_NAME === "EE" && !pm.NAME.includes("1. eelistus"));
        setParcelMachines(result);
      })
  }, []);

  return (
    <select>
      {parcelMachines.map(pm => <option key={pm.NAME}>{pm.NAME}</option>)}
    </select>
  )
}

export default ParcelMachines