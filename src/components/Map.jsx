/* === File: Map.jsx === */
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState, useRef } from "react";

function Map({ droneData, selectedDrone }) {
  const [position, setPosition] = useState([39.8904, 32.7848]);
  const lastUpdateRef = useRef(Date.now());
  const animationSpeed = 0.3;

  let droneIconUrl = "/assets/drone.png";
  if (selectedDrone === "drone2") droneIconUrl = "/assets/drone2.svg.svg";
  if (selectedDrone === "drone3") droneIconUrl = "/assets/drone3.svg.svg";
  if (selectedDrone === "drone4") droneIconUrl = "/assets/drone4.svg.svg";

  // Drone icon'u tanımla
  const droneIcon = L.icon({
    iconUrl: droneIconUrl,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });

  useEffect(() => {
    if (droneData) {
      const now = Date.now();
      const timeDiff = now - lastUpdateRef.current;

      if (timeDiff >= 100) {
        const lat =
          39.8904 + (droneData.coordinates.y - 200) * 0.0002 * animationSpeed;
        const lng =
          32.7848 + (droneData.coordinates.x - 300) * 0.0002 * animationSpeed;

        setPosition([lat, lng]);
        lastUpdateRef.current = now;
      }
    }
  }, [droneData]);

  return (
    <div
      style={{
        width: "92%",
        height: "400px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <MapContainer
        center={[39.8904, 32.7848]}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {droneData && (
          <Marker position={position} icon={droneIcon}>
            <Popup>
              <div>
                <h3>Drone Bilgileri</h3>
                <p>
                  <strong>Durum:</strong> {droneData.status}
                </p>
                <p>
                  <strong>İrtifa:</strong> {droneData.altitude}m
                </p>
                <p>
                  <strong>Hız:</strong> {droneData.speed}km/s
                </p>
                <p>
                  <strong>Yön:</strong> {droneData.direction}°
                </p>
                <p>
                  <strong>Pil:</strong> {droneData.battery}%
                </p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default Map;
