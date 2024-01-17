import React, { useEffect, useState } from 'react'
import { Omniva } from '../../models/Omniva';

// rafce
const ParcelMachines = () => {
  const [parcelMachines, setParcelMachines] = useState<Omniva[]>([]);
  const url = "https://www.omniva.ee/locations.json";

  useEffect(() => {
    fetch(url)
      .then((response: Response) => response.json())
      .then((json: Omniva[]) => {
        const result: Omniva[] = json.filter(pm => pm.A0_NAME === "EE" && !pm.NAME.includes("1. eelistus"));
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