import React from 'react';

export default function AnomalyControlPanel({ api }) {
  const handleAnomaly = (type) => {
    if (api) {
      api.triggerAnomaly(type);
    }
  };

  const handleNormalMode = () => {
    console.log('[handleNormalMode] Button clicked.');
    if (api) {
      api.returnToNormal();
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#f8fafc] border border-[#b2dfdb] rounded-xl p-6">
        <button
          onClick={() => handleAnomaly("route")}
          className="anomaly-btn group bg-[#fdcaca] border border-[#fca5a5] text-[#d32f2f] font-semibold py-3 px-6 rounded-xl hover:bg-[#f87171] hover:text-[#b71c1c] focus:outline-none focus:ring-2 focus:ring-[#fca5a5] focus:ring-opacity-50 text-base uppercase flex items-center justify-center transition-colors duration-200 shadow-sm"
        >
          <i className="fas fa-route mr-2"></i><span>ROTA DEĞİŞİKLİĞİ</span>
        </button>
        <button
          onClick={() => handleAnomaly("altitude")}
          className="anomaly-btn group bg-[#fdcaca] border border-[#fca5a5] text-[#d32f2f] font-semibold py-3 px-6 rounded-xl hover:bg-[#f87171] hover:text-[#b71c1c] focus:outline-none focus:ring-2 focus:ring-[#fca5a5] focus:ring-opacity-50 text-base uppercase flex items-center justify-center transition-colors duration-200 shadow-sm"
        >
          <i className="fas fa-plane-departure mr-2"></i><span>İRTİFA KAYBI</span>
        </button>
        <button
          onClick={() => handleAnomaly("speed")}
          className="anomaly-btn group bg-[#fdcaca] border border-[#fca5a5] text-[#d32f2f] font-semibold py-3 px-6 rounded-xl hover:bg-[#f87171] hover:text-[#b71c1c] focus:outline-none focus:ring-2 focus:ring-[#fca5a5] focus:ring-opacity-50 text-base uppercase flex items-center justify-center transition-colors duration-200 shadow-sm"
        >
          <i className="fas fa-wind mr-2"></i><span>HIZ DÜŞÜŞÜ</span>
        </button>
        <button
          onClick={handleNormalMode}
          className="normal-mode-btn group bg-[#b2dfdb] border border-[#b2dfdb] text-[#116138] font-semibold py-3 px-6 rounded-xl hover:bg-[#178a4c] focus:outline-none focus:ring-2 focus:ring-[#178a4c] focus:ring-opacity-50 text-base uppercase flex items-center justify-center transition-colors duration-200 shadow-sm"
        >
          <i className="fas fa-check-circle mr-2"></i><span>NORMAL MODA DÖN</span>
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex gap-4 items-center">
          <select className="flex-1 bg-white text-[#222] py-3 px-4 rounded-md border border-[#b2dfdb] focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:ring-opacity-50 text-base">
            <option className="text-black">WEBSOCKET (REAL-TIME)</option>
            <option className="text-black">HTTP (PERIODIC)</option>
            <option className="text-black">BOTH METHODS</option>
          </select>
          <button className="disconnected-btn group bg-[#fca5a5] text-[#b71c1c] py-3 px-4 rounded-md hover:bg-[#f87171] hover:text-[#b71c1c] focus:outline-none focus:ring-2 focus:ring-[#fca5a5] focus:ring-opacity-50 text-base font-medium uppercase transition-colors duration-200 !border-none shadow-none">
            <span>BAĞLANTI KESİLDİ</span>
          </button>
        </div>
      </div>
    </div>
  );
}
