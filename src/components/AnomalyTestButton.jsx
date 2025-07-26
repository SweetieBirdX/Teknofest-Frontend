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
        <div style={{ marginTop: 16, maxWidth: 600 }}>
          <b>Eşik Anomalileri:</b>
          <pre style={{maxHeight: 120, overflow: 'auto', background: '#f7f7f7', fontSize: 13}}>{JSON.stringify(result.thresholdAnomalies, null, 2)}</pre>
          <b>Ensemble Kritik Anomaliler (ensemble &gt; 50):</b>
          <pre style={{maxHeight: 120, overflow: 'auto', background: '#f7f7f7', fontSize: 13}}>{JSON.stringify(result.ensembleCritical, null, 2)}</pre>
          <b>Ensemble Ortalama Skor:</b> <span>{result.ensembleMean && result.ensembleMean.toFixed(2)}%</span>
          <br />
          <details style={{marginTop: 8}}>
            <summary>Detaylı Sonuçlar (her satır için skorlar)</summary>
            <pre style={{maxHeight: 200, overflow: 'auto', background: '#f7f7f7', fontSize: 12}}>{JSON.stringify(result.detailed, null, 2)}</pre>
          </details>
        </div>
      )}
    </div>
  );
};

export default AnomalyTestButton;
