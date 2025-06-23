import { useEffect, useState } from "react";
import { initDroneSim } from "./sim";
import Dashboard from "./pages/Dashboard";
import DroneData from "./pages/DroneData";
import { Routes, Route } from 'react-router-dom';

function App() {
  const [droneData, setDroneData] = useState(null);
  const [api, setApi] = useState(null);

  useEffect(() => {
    const simApi = initDroneSim();
    setApi(simApi);

    const interval = setInterval(() => {
      const data = simApi.getCurrentData();
      setDroneData(data);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleStartSimulation = () => api?.start();
  const handleStopSimulation = () => {
    api?.stop();
    setDroneData((prev) => ({ ...prev, speed: 0, status: "Durduruldu" }));
  };
  const handleResetSimulation = () => {
    api?.reset();
    setDroneData(api.getCurrentData());
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] text-[#222] font-sans">
      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={
            droneData && api ? (
              <Dashboard 
                droneData={droneData} 
                api={api} 
                onStart={handleStartSimulation}
                onStop={handleStopSimulation}
                onReset={handleResetSimulation}
              />
            ) : (
              <div className="flex items-center justify-center h-[calc(100vh-200px)]">
                <p className="text-xl text-[#888888]">Yükleniyor...</p>
              </div>
            )
          } />
          <Route path="/dronedata" element={<DroneData />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
