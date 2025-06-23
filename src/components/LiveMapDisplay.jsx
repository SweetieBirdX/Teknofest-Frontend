import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const droneIcon = L.icon({
  iconUrl: "/assets/drone.png",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
});

export default function LiveMapDisplay({ coordinates }) {
  const position = [
    41.01 + coordinates.y / 10000,
    28.97 + coordinates.x / 10000,
  ];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100px", width: "50%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={droneIcon}>
          <Popup>
            Drone Konumu<br />({coordinates.x}, {coordinates.y})
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
