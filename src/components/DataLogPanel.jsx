/* === File: DataLogPanel.jsx === */
import React from 'react';

function formatEntryText(entry) {
  return (
    `Zaman: ${new Date(entry.timestamp).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}\n` +
    `Konum: (${entry.coordinates.x}, ${entry.coordinates.y})\n` +
    `İrtifa: ${entry.altitude}m\n` +
    `Hız: ${entry.speed}km/s\n` +
    `Durum: ${entry.status}`
  );
}

export default function DataLogPanel({ historicalData }) {
  const handleCopy = (entry) => {
    const text = formatEntryText(entry);
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="history-container bg-white rounded-xl border border-[#b2dfdb] shadow-inner max-h-[400px] overflow-y-auto p-2">
      <div className="history-header flex items-center gap-2 sticky top-0 bg-white z-10 pb-2 mb-2 border-b border-[#b2dfdb]">
        <i className="lucide lucide-history text-[#009966]"></i>
        <h3 className="text-lg font-bold text-[#009966] m-0">Veri Geçmişi</h3>
      </div>
      <div id="dataLog" className="space-y-2">
        {historicalData.map((entry, index) => (
          <div 
            key={index} 
            className="bg-white p-3 rounded-lg border border-[#b2dfdb] hover:bg-[#f4f4f4] transition-colors relative"
          >
            <div className="flex justify-between items-center mb-1">
              <button
                className="text-xs text-[#009966] bg-[#e0f7ef] rounded px-2 py-1 border border-[#b2dfdb] hover:bg-[#bbf7d0] transition-colors mr-2"
                title="Kopyala"
                onClick={() => handleCopy(entry)}
              >
                Kopyala
              </button>
              <div className="grid grid-cols-4 gap-2 flex-1 mx-2 text-xs">
                <div className="flex items-center justify-center">
                  <span className="text-[#222] font-semibold">{new Date(entry.timestamp).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-[#555] font-semibold">Konum: </span>
                  <span className="text-[#222] ml-1">({entry.coordinates.x}, {entry.coordinates.y})</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-[#555] font-semibold">İrtifa: </span>
                  <span className="text-[#222] ml-1">{entry.altitude}m</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-[#555] font-semibold">Hız: </span>
                  <span className="text-[#222] ml-1">{entry.speed}km/s</span>
                </div>
              </div>
              <span className={`text-sm font-bold ml-2 ${
                entry.status === "Uçuşta" ? "text-[#178a4c]" :
                entry.status === "Durduruldu" || entry.status === "Düşük Batarya" || entry.status.toLocaleUpperCase('tr-TR').includes("ANOMALİ") ? "text-[#F44336]" :
                "text-[#888888]"
              }`}>
                {entry.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}