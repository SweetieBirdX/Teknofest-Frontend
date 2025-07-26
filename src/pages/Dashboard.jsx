import { useEffect, useState } from 'react';
import DroneStatusCard from "../components/DroneStatusCard";
import AnomalyControlPanel from "../components/AnomalyControlPanel";
import DataLogPanel from "../components/DataLogPanel";
import StatusBar from "../components/StatusBar";
import Map from "../components/Map";
import LiveDataDetails from "../components/LiveDataDetails";
import { BatteryBox } from "../components/DroneStatusCard";
import AnomalyTestButton from "../components/AnomalyTestButton";
import { useNavigate } from 'react-router-dom';

export default function Dashboard({ droneData, api, onStart, onStop, onReset }) {
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDashboard, setShowDashboard] = useState(false);
  const [selectedDrone, setSelectedDrone] = useState('drone1');
  const [statusPulse, setStatusPulse] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setShowDashboard(true), 600);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (api) {
      const history = api.getHistoricalData();
      setHistoricalData(history);
    }
  }, [droneData, api]);

  useEffect(() => {
    if (droneData?.status === "Beklemede" && historicalData.length > 0) {
      setHistoricalData([]);
    }
  }, [droneData?.status, historicalData.length]);

  useEffect(() => {
    if (
      droneData?.status === 'Beklemede' ||
      droneData?.status === 'Uçuşta' ||
      droneData?.status === 'Durduruldu' ||
      (droneData?.status && droneData.status.toLowerCase().includes('anomali'))
    ) {
      const interval = setInterval(() => setStatusPulse(p => !p), 700);
      return () => clearInterval(interval);
    } else {
      setStatusPulse(false);
    }
  }, [droneData?.status]);

  if (loading || !showDashboard) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center bg-[#f4f4f4] text-[#222] animate-fade-in transition-opacity duration-700 ${!loading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} style={{transition: 'opacity 0.6s'}}> 
        <img src="/assets/Teknofest_logo.png" alt="Teknofest Logo" className="w-40 mb-6 drop-shadow-lg animate-slide-down" />
        <h1 className="text-3xl font-bold mb-2 tracking-wider animate-slide-down delay-100">METUChain</h1>
        <p className="text-lg mb-2 animate-slide-down delay-200">Blokzincir Destekli İHA/SİHA ve Orijin Takip Sistemi</p>
        <p className="text-lg mb-2 animate-slide-down delay-300">2025 Blokzincir Yarışması</p>
        <p className="text-base mb-2 animate-slide-down delay-400">Takım ID: 736026</p>
        <p className="text-base animate-slide-down delay-500">Başvuru ID: 3614435</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-6 font-rajdhani animate-fade-in transition-opacity duration-700" style={{transition: 'opacity 0.6s'}}>
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-black font-orbitron tracking-widest">
           METUChain Drone Simülasyonu
        </h1>
        <p className="text-[#555] text-sm md:text-base uppercase tracking-wider">
          Gerçek zamanlı drone takibi ve anomali tespiti
        </p>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4 bg-white border border-[#b2dfdb] rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 text-sm">
          <i className="lucide lucide-radio text-[#178a4c]"></i>
          <span className="text-[#222] font-semibold">Durum:</span>
          <span className="font-bold text-[#178a4c]">{droneData?.status || "Beklemede"}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <i className="lucide lucide-zap text-[#178a4c]"></i>
          <span className="text-[#222] font-semibold">Batarya:</span>
          <BatteryBox percent={droneData?.battery || 0} />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <i className="lucide lucide-gauge text-[#178a4c]"></i>
          <span className="text-[#222] font-semibold">Hız:</span>
          <span className="font-bold text-[#178a4c]">{droneData?.speed || 0} km/h</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <i className="lucide lucide-trending-up text-[#178a4c]"></i>
          <span className="text-[#222] font-semibold">İrtifa:</span>
          <span className="font-bold text-[#178a4c]">{droneData?.altitude || 0} m</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <i className="lucide lucide-wifi text-[#F44336]"></i>
          <span className="text-[#222] font-semibold">Backend:</span>
          <span className="font-bold text-[#F44336]">ÇEVRİM DIŞI</span>
        </div>
      </div>

      <div className="w-full bg-white border border-[#b2dfdb] rounded-xl shadow-lg p-6 space-y-4">
        <h2 className="text-lg font-orbitron text-[#009966] uppercase tracking-wide border-b border-[#009966]/20 pb-2 flex items-center gap-2">
          <i className="lucide lucide-settings text-[#009966]"></i>
          Kontrol Paneli
        </h2>
        <div className="grid grid-cols-3 gap-2">
          <button onClick={onStart} className="start-btn text-sm px-3 py-2 rounded border border-[#00ff88] text-[#00ff88] bg-[#1a1f36]/60 hover:bg-[#178a4c] font-semibold shadow transition-all hover:text-white">Başlat</button>
          <button onClick={onStop} className="text-sm px-3 py-2 rounded border border-[#ffaa00] text-[#ffaa00] bg-[#1a1f36]/60 hover:bg-[#ffaa00] hover:text-[#0a0e1a] font-semibold shadow transition-all">Durdur</button>
          <button onClick={onReset} className="text-sm px-3 py-2 rounded border border-[#a1a5b7] text-black bg-[#1a1f36]/60 hover:bg-[#a1a5b7] hover:text-[#0a0e1a] font-semibold shadow transition-all">Reset</button>
        </div>
        <div className="space-y-2">
          <AnomalyControlPanel api={api} />
          {/* Anomali Test Butonu */}
          <AnomalyTestButton api={api} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-[#b2ebf2] rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between pb-2 border-b border-[#009966]/20 mb-4">
            <h2 className="text-lg font-orbitron text-[#009966] uppercase tracking-wide flex items-center gap-2 m-0">
              <i className="lucide lucide-map text-[#009966]"></i>
              Drone Haritası
            </h2>
            <div className="flex items-center gap-8">
              <button
                className="bg-[#4ade80] hover:bg-[#bbf7d0] text-[#065f46] font-bold py-3 px-6 rounded-full transition-colors duration-200 text-lg border-none focus:outline-none"
                onClick={() => navigate('/dronedata')}              >
                Drone Bilgileri
              </button>
              <select
                className="ml-4 mr-2 pr-6 bg-white border border-[#b2dfdb] rounded-full px-6 py-3 min-w-[110px] text-[#178a4c] font-bold focus:outline-none focus:ring-2 focus:ring-[#009966] focus:ring-opacity-50 text-lg"
                value={selectedDrone}
                onChange={e => setSelectedDrone(e.target.value)}
              >
                <option value="drone1">Drone 1</option>
                <option value="drone2">Drone 2</option>
                <option value="drone3">Drone 3</option>
                <option value="drone4">Drone 4</option>
              </select>
              <div
                className={`min-w-[260px] h-20 px-8 py-6 rounded-full border border-[#b2dfdb] text-lg font-bold text-[#222] flex items-center justify-center transition-colors duration-500
                  ${
                    (droneData?.status === 'Beklemede' || droneData?.status === 'Uçuşta')
                      ? (statusPulse ? 'bg-[#1ee82e]' : 'bg-[#22c55e]')
                    : droneData?.status === 'Durduruldu'
                      ? (statusPulse ? 'bg-[#ffe066]' : 'bg-[#ffb300]')
                    : (droneData?.status && droneData.status.toLowerCase().includes('anomali'))
                      ? (statusPulse ? 'bg-[#ffb3b3]' : 'bg-[#ff5252]')
                    : 'bg-[#f4f4f4]'
                  }
                `}
              >
                {droneData?.status || 'Beklemede'}
              </div>
            </div>
          </div>
          <div className="mt-4 rounded-lg overflow-hidden border border-[#009966]/10 h-[400px]">
            <Map droneData={droneData} selectedDrone={selectedDrone} />
          </div>
        </div>

        <div className="bg-white border border-[#b2dfdb] rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-orbitron text-[#009966] uppercase tracking-wide border-b border-[#009966]/20 pb-2 flex items-center gap-2">
            <i className="lucide lucide-activity text-[#009966]"></i>
            Anlık Veriler
          </h2>
          <LiveDataDetails data={droneData} />
        </div>
      </div>

      <div className="w-full bg-white border border-[#b2dfdb] rounded-xl shadow-lg p-6 max-h-[500px] overflow-y-auto mt-6">
        <h2 className="text-lg font-orbitron text-[#009966] uppercase tracking-wide border-b border-[#009966]/20 pb-2 flex items-center gap-2 mb-4">
          <i className="lucide lucide-history text-[#009966]"></i>
          Veri Geçmişi
        </h2>
        <DataLogPanel historicalData={historicalData} />
      </div>
    </div>
  );
}


