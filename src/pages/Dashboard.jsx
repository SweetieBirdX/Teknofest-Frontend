import { useEffect, useState } from "react";

import AnomalyControlPanel from "../components/AnomalyControlPanel";
import DataLogPanel from "../components/DataLogPanel";

import Map from "../components/Map";
import LiveDataDetails from "../components/LiveDataDetails";

import AnomalyTestButton from "../components/AnomalyTestButton";
import { useNavigate } from "react-router-dom";

export default function Dashboard({
  droneData,
  api,
  onStart,
  onStop,
  onReset,
}) {
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDashboard, setShowDashboard] = useState(false);
  const [selectedDrone, setSelectedDrone] = useState("drone1");
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

  if (loading || !showDashboard) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center bg-[#f4f4f4] text-[#222] animate-fade-in transition-opacity duration-700 ${!loading ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        style={{ transition: "opacity 0.6s" }}
      >
        <img
          src="/assets/Teknofest_logo.png"
          alt="Teknofest Logo"
          className="w-40 mb-6 drop-shadow-lg animate-slide-down"
        />

        <h1 className="text-3xl font-bold mb-2 tracking-wider animate-slide-down delay-100">
          METUChain
        </h1>
        <p className="text-lg mb-2 animate-slide-down delay-200">
          Blokzincir Destekli İHA/SİHA ve Orijin Takip Sistemi
        </p>
        <p className="text-lg mb-2 animate-slide-down delay-300">
          2025 Blokzincir Yarışması
        </p>
        <p className="text-base mb-2 animate-slide-down delay-400">
          Takım ID: 736026
        </p>
        <p className="text-base animate-slide-down delay-500">
          Başvuru ID: 3614435
        </p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1>METUChain Drone Simülasyonu</h1>
        <p>Gerçek zamanlı drone takibi ve anomali tespiti</p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "40px",
          alignItems: "flex-start",
          marginBottom: "2%",
          justifyContent: "center",
        }}
      >
        <div style={{ flex: "0 0 auto" }}>
          <h2 style={{ textAlign: "center" }}>Kontrol Paneli</h2>
          <AnomalyControlPanel
            api={api}
            onStart={onStart}
            onStop={onStop}
            onReset={onReset}
          />
        </div>

        <div style={{ flex: "0 0 auto" }}>
          <h2 style={{ textAlign: "center" }}>Anlık Veriler</h2>
          <LiveDataDetails data={droneData} />
        </div>
      </div>

      <div style={{ margin: "20px 0" }}>
        <div
          style={{
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ margin: "0", marginLeft: "80px", flex: "0 0 auto" }}>Drone Haritası</h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "50px",
              marginRight: "30px",
            }}
          >
            <span 
              style={{ 
                fontWeight: "bold",
                padding: "8px 16px",
                borderRadius: "12px",
                background: droneData?.status === "Uçuşta" 
                  ? "#10b981" 
                  : droneData?.status === "Durduruldu"
                  ? "#f59e0b"
                  : droneData?.status === "Beklemede"
                  ? "#10b981"
                  : droneData?.status?.includes("ANOMALİ")
                  ? "#dc2626"
                  : "transparent",
                color: (droneData?.status === "Uçuşta" || droneData?.status === "Durduruldu" || droneData?.status === "Beklemede" || droneData?.status?.includes("ANOMALİ")) ? "white" : "black",
                boxShadow: droneData?.status === "Uçuşta" 
                  ? "0 4px 15px rgba(16, 185, 129, 0.3)" 
                  : droneData?.status === "Durduruldu"
                  ? "0 4px 15px rgba(245, 158, 11, 0.3)"
                  : droneData?.status === "Beklemede"
                  ? "0 4px 15px rgba(16, 185, 129, 0.3)"
                  : droneData?.status?.includes("ANOMALİ")
                  ? "0 6px 20px rgba(231, 19, 19, 0.75)"
                  : "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                display: "inline-block",
                minWidth: "100px",
                textAlign: "center",
                animation: droneData?.status === "Uçuşta" 
                  ? "pulseGreen 2s ease-in-out infinite" 
                  : droneData?.status === "Durduruldu"
                  ? "pulseYellow 2s ease-in-out infinite"
                  : droneData?.status === "Beklemede"
                  ? "pulseGreen 2s ease-in-out infinite"
                  : droneData?.status?.includes("ANOMALİ")
                  ? "pulseRed 1.2s ease-in-out infinite"
                  : "none"
              }}
            >
              {droneData?.status || "Beklemede"}
            </span>
            <select
              className="drone-select"
              value={selectedDrone}
              onChange={(e) => setSelectedDrone(e.target.value)}
              style={{
                padding: "10px 16px",
                border: "2px solid #6b7280",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #ffffff, #f8fafc)",
                color: "#374151",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                outline: "none",
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                paddingRight: "40px",
                backgroundImage: "none",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
                backgroundSize: "16px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "#4b5563";
                e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
                e.target.style.transform = "translateY(-1px)";
                e.target.style.background = "linear-gradient(135deg, #f9fafb, #f3f4f6)";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "#6b7280";
                e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)";
                e.target.style.transform = "translateY(0)";
                e.target.style.background = "linear-gradient(135deg, #ffffff, #f8fafc)";
              }}
            >
              <option value="drone1">Drone 1</option>
              <option value="drone2">Drone 2</option>
              <option value="drone3">Drone 3</option>
              <option value="drone4">Drone 4</option>
            </select>
            <button
              onClick={() => navigate("/dronedata")}
              style={{
                padding: "10px 20px",
                marginRight: "50px",
                border: "2px solid #3b82f6",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                color: "white",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                outline: "none",
                boxShadow: "0 3px 6px rgba(59, 130, 246, 0.3)",
                transition: "all 0.3s ease",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "linear-gradient(135deg, #2563eb, #1d4ed8)";
                e.target.style.boxShadow = "0 6px 12px rgba(59, 130, 246, 0.4)";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.borderColor = "#1d4ed8";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "linear-gradient(135deg, #3b82f6, #2563eb)";
                e.target.style.boxShadow = "0 3px 6px rgba(59, 130, 246, 0.3)";
                e.target.style.transform = "translateY(0)";
                e.target.style.borderColor = "#3b82f6";
              }}
            >
              Drone Bilgileri
            </button>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Map droneData={droneData} selectedDrone={selectedDrone} />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "flex-start",
          marginBottom: "20px",
        }}
      >
        <div style={{ flex: "0 0 auto", marginLeft: "50px" }}>
          <AnomalyTestButton api={api} />
        </div>

        <div style={{ flex: "0 0 auto" }}>
          <DataLogPanel historicalData={historicalData} selectedDrone={selectedDrone} />
        </div>
      </div>
    </div>
  );
}
