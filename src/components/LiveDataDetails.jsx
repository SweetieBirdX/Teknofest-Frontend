import React from 'react';

export default function LiveDataDetails({ data }) {
  const displayCoordinates = data?.coordinates ? `[${data.coordinates.x}, ${data.coordinates.y}]` : '--, --';
  const displayAltitude = data?.altitude !== undefined ? `${data.altitude} M` : '-- M';
  const displaySpeed = data?.speed !== undefined ? `${data.speed} KM/H` : '-- KM/H';
  const displayDirection = data?.direction !== undefined ? `${Math.round(data.direction)} DERECE` : '-- DERECE';
  const displayStatus = data?.status || 'Bilinmiyor';
  const displayBattery = data?.battery !== undefined ? `${data.battery}%` : '--%';
  const displayTime = data?.timestamp ? new Date(data.timestamp).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '--:--:--';

  const isAnomaly = displayStatus.toLowerCase().includes("anomali") || displayStatus.toLowerCase().includes("rota dışı") || displayStatus.toLowerCase().includes("irtifa");
  const statusColorClass = isAnomaly ? 'text-[#F44336]' : 'text-[#4CAF50]';
  const batteryColorClass = (data?.battery !== undefined && data.battery < 20) ? 'text-[#F44336]' : 'text-[#4CAF50]';

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-lg border border-[#b2dfdb]">
        <h3 className="text-[#009966] font-medium mb-2">Konum</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-[#888888]">X:</span>
            <span className="text-black">{data?.coordinates?.x || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#888888]">Y:</span>
            <span className="text-black">{data?.coordinates?.y || 0}</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-[#b2dfdb]">
        <h3 className="text-[#009966] font-medium mb-2">Uçuş</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-[#888888]">Hız:</span>
            <span className="text-black">{displaySpeed}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#888888]">Yön:</span>
            <span className="text-black">{displayDirection}</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-[#b2dfdb]">
        <h3 className="text-[#009966] font-medium mb-2">Durum</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-[#888888]">Mod:</span>
            <span className="text-black">
              {data?.mode === 'route' ? 'Rota' :
               data?.mode === 'altitude' ? 'İrtifa' :
               data?.mode === 'speed' ? 'Hız' :
               data?.mode === 'normal' ? 'Normal' :
               data?.mode}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#888888]">Durum:</span>
            <span className={`${statusColorClass}`}>{displayStatus}</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-[#b2dfdb]">
        <h3 className="text-[#009966] font-medium mb-2">Sistem</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-[#888888]">Batarya:</span>
            <span className={batteryColorClass}>{displayBattery}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#888888]">İrtifa:</span>
            <span className="text-black">{displayAltitude}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
