import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
// import icon from '../../images/plus.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import ChangeView from './ChangeView';
import { useEffect, useState } from 'react';
import shopsFile from "../../data/shops.json"

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25,41], 
  iconAnchor: [12,41],
  popupAnchor: [2, -40],
});
L.Marker.prototype.options.icon = DefaultIcon;


const Map = (props) => { 
  const [shops, setShops] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(res => res.json())
      .then(() => setShops(shopsFile))
  }, []);

  return (
  <div>
    <MapContainer className='map' center={props.mapCoordinaates.lngLat} zoom={props.mapCoordinaates.zoom} scrollWheelZoom={false}>
      <ChangeView center={props.mapCoordinaates.lngLat} zoom={props.mapCoordinaates.zoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Marker position={[59.4231, 24.7991]}>
        <Popup>
          Ülemiste keskus. <br /> Avatud 9-20
        </Popup>
      </Marker>
      <Marker position={[59.4277, 24.7193]}>
        <Popup>
          Kristiine keskus. <br /> Avatud 10-21
        </Popup>
      </Marker> 
      <Marker position={[59.4277, 24.7193]}>
        <Popup>
          Tasku keskus. <br /> Avatud 9-22
        </Popup>
      </Marker> */}
      {shops.map(shop => 
        <Marker key={shop.name} position={[shop.lng, shop.lat]}>
          <Popup>
            {shop.name}. <br /> Avatud {shop.openTime}
          </Popup>
        </Marker>
        )}
    </MapContainer>
  </div>)
}

export default Map; 