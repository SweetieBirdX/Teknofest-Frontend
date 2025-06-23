import { useState, useEffect } from 'react';

export default function StatusBar({ data }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => date.toLocaleTimeString('tr-TR', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  });

  const displayStatus = data?.status || 'Bilinmiyor';
  const displayBattery = data?.battery !== undefined ? `${data.battery}%` : '--%';
  const displayAltitude = data?.altitude !== undefined ? `${data.altitude} M` : '-- M';
  const displaySpeed = data?.speed !== undefined ? `${data.speed} KM/H` : '-- KM/H';

  const connectionStatus = 'OFFLINE';
  const connectionColor = connectionStatus === 'ONLINE' ? 'text-[#178a4c]' : 'text-[#F44336]';

  const isAnomalyStatus = displayStatus.toLowerCase().includes("anomali");
  const statusColor = isAnomalyStatus ? '#F44336' : '#178a4c';

  return (
    <div className="flex items-center justify-between p-8 min-h-[180px] bg-[#2A2A3B] rounded-xl">
      <div className="flex items-center space-x-6">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${data?.status === "Uçuşta" ? 'bg-[#178a4c]' : 'bg-[#F44336]'}`}></div>
          <span className="text-black font-semibold">Durum:</span>
          <span className="ml-1 font-semibold" style={{ color: statusColor }}>{displayStatus}</span>
        </div>
        <div className="flex items-center">
          <i className="fas fa-arrow-up mr-2 text-[#178a4c]"></i>
          <span className="text-[#222] font-semibold">{displayAltitude}</span>
        </div>
      </div>

      <div className="flex items-center">
        <i className="fas fa-battery-three-quarters mr-2 text-[#178a4c]"></i>
        <span className="text-[#222] font-semibold">{displayBattery}</span>
      </div>

      <div className="flex items-center">
        <i className="far fa-clock mr-2 text-[#178a4c]"></i>
        <span className="text-[#222] font-semibold">{formatTime(currentTime)}</span>
      </div>
    </div>
  );
}