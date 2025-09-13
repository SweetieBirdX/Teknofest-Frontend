import { useEffect, useState } from "react";
import { initDroneSim } from "./sim";
import Dashboard from "./pages/Dashboard";
import DroneData from "./pages/DroneData";
import { Routes, Route } from "react-router-dom";

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
    <div data-oid="-8f62y9">
      <div data-oid="d5ngetz">
        <Routes data-oid="l91tn:2">
          <Route
            path="/"
            element={
              droneData && api ? (
                <Dashboard
                  droneData={droneData}
                  api={api}
                  onStart={handleStartSimulation}
                  onStop={handleStopSimulation}
                  onReset={handleResetSimulation}
                  data-oid="xyqyfj5"
                />
              ) : (
                <div data-oid="17y3fti">
                  <p data-oid="ftrxl9b">Yükleniyor...</p>
                </div>
              )
            }
            data-oid="t71mx4v"
          />

          <Route
            path="/dronedata"
            element={<DroneData data-oid="mmw.p7-" />}
            data-oid="f.rlw5q"
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
