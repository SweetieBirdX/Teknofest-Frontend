import React, { useState } from "react";

// Bu component, DroneDataAPI örneği prop olarak verilerek kullanılmalıdır.
const AnomalyTestButton = ({ api }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    const res = await api.anomalyAnalyze();
    setResult(res);
    setLoading(false);
  };

  return (
    <div style={{ margin: 24 }}>
      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? "Analiz Ediliyor..." : "Anomali Analizini Test Et"}
      </button>
      {result && (
        <div style={{ marginTop: 16 }}>
          <b>Eşik Anomalileri:</b>
          <pre>{JSON.stringify(result.thresholdAnomalies, null, 2)}</pre>
          <b>Z-Score Anomalileri:</b>
          <pre>{JSON.stringify(result.zscoreAnomalies, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AnomalyTestButton;
