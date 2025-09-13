import { useState, useEffect } from "react";

export default function StatusBar({ data }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) =>
    date.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

  const displayStatus = data?.status || "Bilinmiyor";
  const displayBattery =
    data?.battery !== undefined ? `${data.battery}%` : "--%";
  const displayAltitude =
    data?.altitude !== undefined ? `${data.altitude} M` : "-- M";
  const displaySpeed =
    data?.speed !== undefined ? `${data.speed} KM/H` : "-- KM/H";

  return (
    <div>
      <div>
        <div>
          <div></div>
          <span>Durum:</span>
          <span>{displayStatus}</span>
        </div>
        <div>
          <span>↑</span>
          <span>{displayAltitude}</span>
        </div>
      </div>

      <div>
        <span>🔋</span>
        <span>{displayBattery}</span>
      </div>

      <div>
        <span>🕐</span>
        <span>{formatTime(currentTime)}</span>
      </div>
    </div>
  );
}
