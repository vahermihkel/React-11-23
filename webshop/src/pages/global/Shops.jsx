import { useEffect, useState } from 'react';
import Map from '../../components/map/Map';
import shopsFile from "../../data/shops.json"

const Shops = () => {
  const [coordinaates, setCoordinates] = useState({lngLat: [58.8811, 25.6322], zoom: 7});
  const [shops, setShops] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(res => res.json())
      .then(() => setShops(shopsFile))
  }, []);

  return (<div>
    <button onClick={() => setCoordinates({lngLat: [58.8811, 25.6322], zoom: 7})}>Kõik poed</button>
    <button onClick={() => setCoordinates({lngLat: [59.4378, 24.7574], zoom: 11})}>Kõik Tallinna poed</button>

    {/* <button onClick={() => setCoordinates({lngLat: [59.4231, 24.7991], zoom: 13})}>Ülemiste</button>
    <button onClick={() => setCoordinates({lngLat: [59.4277, 24.7193], zoom: 13})}>Kristiine</button>
    <button onClick={() => setCoordinates({lngLat: [58.3785, 26.7318], zoom: 13})}>Tasku</button> */}
    {shops.map(shop => 
      <button key={shop.name} onClick={() => setCoordinates({lngLat: [shop.lng, shop.lat], zoom: 13})}>{shop.name}</button>
    )}

    <Map mapCoordinaates={coordinaates}  />
  </div>)
}

export default Shops;