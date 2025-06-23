import React from "react";

export function BatteryBox({ percent }) {
  let fillColor = "#22c55e";
  if (percent < 20) fillColor = "#ef4444";
  else if (percent < 50) fillColor = "#facc15";

  return (
    <div className="relative w-20 h-10 border-2 border-black bg-white flex items-center justify-center text-base font-bold overflow-hidden rounded-r-lg shadow">
      <div
        className="absolute right-0 top-0 h-full z-0 transition-all duration-500 rounded-r-lg"
        style={{ width: `${percent}%`, background: fillColor, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
      />
      <span className="relative z-10 text-black drop-shadow text-xs">%{percent}</span>
    </div>
  );
}

export default function DroneStatusCard({ data }) {
  return (
    <div className="bg-[#2A2A3B] rounded-xl shadow-md border border-[#3a3a3a] p-6 text-white">
      <h2 className="text-xl font-semibold mb-4 text-[#4CAF50] uppercase tracking-wide">
        <i className="fas fa-info-circle mr-2"></i>Drone Durumu
      </h2>
      <ul className="space-y-2 text-sm">
        <li><span className="text-[#888888]">Konum:</span> {data.coordinates.x}, {data.coordinates.y}</li>
        <li><span className="text-[#888888]">İrtifa:</span> {data.altitude} m</li>
        <li><span className="text-[#888888]">Hız:</span> {data.speed} km/h</li>
        <li><span className="text-[#888888]">Yön:</span> {data.direction}&deg;</li>
        <li><span className="text-[#888888]">Batarya:</span> {data.battery}%</li>
        <li><span className="text-[#888888]">Durum:</span> <span className={data.status && data.status.toLowerCase().includes("anomali") ? "text-[#F44336]" : "text-[#4CAF50]"}>{data.status}</span></li>
        <li><span className="text-[#888888]">Mod:</span> {
          data.mode === 'route' ? 'Rota' :
          data.mode === 'altitude' ? 'İrtifa' :
          data.mode === 'speed' ? 'Hız' :
          data.mode === 'normal' ? 'Normal' :
          data.mode
        }</li>
      </ul>
    </div>
  );
} 
