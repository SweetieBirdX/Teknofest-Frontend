/* === File: Map.jsx === */
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { useEffect, useState, useRef } from 'react';

function Map({ droneData, selectedDrone }) {
  const [position, setPosition] = useState([39.8904, 32.7848]);
  const lastUpdateRef = useRef(Date.now());
  const animationSpeed = 0.3;

  let droneIconUrl = '/assets/drone.png';
  if (selectedDrone === 'drone2') droneIconUrl = '/assets/drone2.svg.svg';
  if (selectedDrone === 'drone3') droneIconUrl = '/assets/drone3.svg.svg';
  if (selectedDrone === 'drone4') droneIconUrl = '/assets/drone4.svg.svg';

  useEffect(() => {
    if (droneData) {
      const now = Date.now();
      const timeDiff = now - lastUpdateRef.current;

      if (timeDiff >= 100) {
        const lat = 39.8904 + (droneData.coordinates.y - 200) * 0.0002 * animationSpeed;
        const lng = 32.7848 + (droneData.coordinates.x - 300) * 0.0002 * animationSpeed;

        setPosition([lat, lng]);
        lastUpdateRef.current = now;
      }
    }
  }, [droneData]);

  return (
    <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-md border border-[#3a3a3a]">
      <MapContainer
        center={[39.8904, 32.7848]}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        className="rounded-xl"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker 
          position={position}
          icon={new Icon({
            iconUrl: droneIconUrl,
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16]
          })}
        >
          <Popup>
            ODTÜ Kampüsü - Drone Konumu<br />
            Enlem: {position[0].toFixed(6)}<br />
            Boylam: {position[1].toFixed(6)}<br />
            Yükseklik: {droneData?.altitude || 0}m<br />
            Hız: {droneData?.speed || 0} km/s<br />
            Batarya: {droneData?.battery || 0}%<br />
            Durum: {droneData?.status || 'Bilinmiyor'}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;