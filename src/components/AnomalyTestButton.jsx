import React, { useState } from "react";
import jsPDF from "jspdf";

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

  const exportToPDF = () => {
    if (!result) {
      alert("Önce analiz yapmanız gerekiyor!");
      return;
    }

    const doc = new jsPDF();

    // Başlık
    doc.setFontSize(20);
    doc.text("Anomali Analiz Raporu", 105, 20, { align: "center" });

    // Tarih
    doc.setFontSize(12);
    doc.text(
      `Rapor Tarihi: ${new Date().toLocaleDateString("tr-TR")} ${new Date().toLocaleTimeString("tr-TR")}`,
      20,
      35,
    );

    let yPosition = 50;

    // Eşik Anomalileri
    if (result.thresholdAnomalies?.length > 0) {
      doc.setFontSize(16);
      doc.text("Esik Anomalileri:", 20, yPosition);
      yPosition += 10;

      doc.setFontSize(10);
      result.thresholdAnomalies.forEach((anomaly, index) => {
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(
          `${anomaly.type}: ${new Date(anomaly.timestamp).toLocaleTimeString()} (Diff: ${anomaly.diff})`,
          25,
          yPosition,
        );
        yPosition += 7;
      });
      yPosition += 10;
    }

    // Ensemble Kritik Anomaliler
    if (result.ensembleCritical?.length > 0) {
      doc.setFontSize(16);
      doc.text("Ensemble Kritik Anomaliler:", 20, yPosition);
      yPosition += 10;

      doc.setFontSize(10);
      result.ensembleCritical.forEach((anomaly, index) => {
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(JSON.stringify(anomaly, null, 2), 25, yPosition);
        yPosition += 7;
      });
      yPosition += 10;
    }

    // Ensemble Ortalama Skor
    if (result.ensembleMean !== undefined) {
      doc.setFontSize(16);
      doc.text("Ensemble Ortalama Skor:", 20, yPosition);
      yPosition += 10;

      doc.setFontSize(14);
      doc.text(`${result.ensembleMean.toFixed(2)}%`, 25, yPosition);
      yPosition += 15;
    }

    // Detaylı Sonuçlar
    if (result.detailed?.length > 0) {
      doc.setFontSize(16);
      doc.text("Detaylı Sonuçlar:", 20, yPosition);
      yPosition += 10;

      doc.setFontSize(8);
      result.detailed.forEach((detail, index) => {
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }

        const formattedDetail = { ...detail };
        if (formattedDetail.timestamp) {
          const date = new Date(formattedDetail.timestamp);
          formattedDetail.timestamp = `${date.toLocaleDateString("tr-TR")} ${date.toLocaleTimeString("tr-TR", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })} UTC`;
        }

        const detailText = JSON.stringify(formattedDetail, null, 2);
        const lines = doc.splitTextToSize(detailText, 170);

        lines.forEach((line) => {
          if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(line, 25, yPosition);
          yPosition += 5;
        });
        yPosition += 5;
      });
    }

    // PDF'i indir
    doc.save("anomali-analiz-raporu.pdf");
  };

  return (
    <span
      style={{
        border: "2px solid #e2e8f0",
        borderRadius: "16px",
        marginLeft: "15px",
        padding: "18px",
        display: "inline-block",
        width: "750px",
        background: "linear-gradient(135deg, #ffffff, #f8fafc)",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08), 0 3px 8px rgba(0, 0, 0, 0.04)",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
      }}
    >
      {/* Title */}
      <h2
        style={{
          margin: "0 0 16px 0",
          fontSize: "20px",
          fontWeight: "700",
          color: "#1e293b",
          textAlign: "center",
          letterSpacing: "-0.5px",
        }}
      >
        🔍 Anomali Analizi
      </h2>

      {/* Analyze Button */}
      <button
        onClick={handleAnalyze}
        disabled={loading}
        style={{
          width: "100%",
          padding: "10px 20px",
          border: "2px solid #3b82f6",
          borderRadius: "10px",
          background: loading 
            ? "linear-gradient(135deg, #9ca3af, #6b7280)" 
            : "linear-gradient(135deg, #3b82f6, #2563eb)",
          color: "white",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "14px",
          fontWeight: "600",
          marginBottom: "16px",
          boxShadow: "0 3px 10px rgba(59, 130, 246, 0.25)",
          transition: "all 0.3s ease",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.target.style.background = "linear-gradient(135deg, #2563eb, #1d4ed8)";
            e.target.style.boxShadow = "0 6px 16px rgba(59, 130, 246, 0.4)";
            e.target.style.transform = "translateY(-2px)";
          }
        }}
        onMouseLeave={(e) => {
          if (!loading) {
            e.target.style.background = "linear-gradient(135deg, #3b82f6, #2563eb)";
            e.target.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.3)";
            e.target.style.transform = "translateY(0)";
          }
        }}
      >
        {loading ? "⏳ Analiz Yapılıyor..." : "🚀 Analizi Başlat"}
      </button>

      {/* Main results container - two columns */}
      <div style={{ display: "flex", gap: "16px", alignItems: "stretch" }}>
        {/* Left Column: Eşik, Kritik, Ortalama Skor */}
        <div
          style={{
            flex: "0 0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            width: "320px",
          }}
        >
          {/* Eşik Anomalileri */}
          <div
            style={{
              border: "2px solid #e2e8f0",
              borderRadius: "10px",
              padding: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              background: "linear-gradient(135deg, #fef3c7, #fde68a)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "linear-gradient(135deg, #fde68a, #fcd34d)";
              e.target.style.boxShadow = "0 4px 12px rgba(245, 158, 11, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "linear-gradient(135deg, #fef3c7, #fde68a)";
              e.target.style.boxShadow = "none";
            }}
          >
            <div style={{ fontWeight: "700", fontSize: "14px", color: "#92400e", display: "flex", alignItems: "center", gap: "6px" }}>
              ⚠️ Eşik Anomalileri
            </div>
            <div
              style={{
                border: "1px solid #f59e0b",
                borderRadius: "6px",
                height: "65px",
                padding: "10px",
                backgroundColor: "#ffffff",
                overflowY: "auto",
                fontSize: "12px",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                color: "#92400e",
                fontWeight: "500",
                boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.05)",
              }}
            >
              {loading
                ? "Yükleniyor..."
                : result?.thresholdAnomalies?.length > 0
                  ? result.thresholdAnomalies.map((anomaly, index) => (
                      <div key={index}>
                        {anomaly.type}:{" "}
                        {new Date(anomaly.timestamp).toLocaleTimeString()}{" "}
                        (Diff: {anomaly.diff})
                      </div>
                    ))
                  : "Veri yok."}
            </div>
          </div>

          {/* Ensemble Kritik Anomaliler */}
          <div
            style={{
              border: "2px solid #e2e8f0",
              borderRadius: "10px",
              padding: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              background: "linear-gradient(135deg, #fecaca, #fca5a5)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "linear-gradient(135deg, #fca5a5, #f87171)";
              e.target.style.boxShadow = "0 4px 12px rgba(239, 68, 68, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "linear-gradient(135deg, #fecaca, #fca5a5)";
              e.target.style.boxShadow = "none";
            }}
          >
            <div style={{ fontWeight: "700", fontSize: "14px", color: "#dc2626", display: "flex", alignItems: "center", gap: "6px" }}>
              🚨 Ensemble Kritik Anomaliler
            </div>
            <div
              style={{
                border: "1px solid #ef4444",
                borderRadius: "6px",
                height: "65px",
                padding: "10px",
                backgroundColor: "#ffffff",
                overflowY: "auto",
                fontSize: "12px",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                color: "#dc2626",
                fontWeight: "500",
                boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.05)",
              }}
            >
              {loading
                ? "Yükleniyor..."
                : result?.ensembleCritical?.length > 0
                  ? JSON.stringify(result.ensembleCritical, null, 2)
                  : "Veri yok."}
            </div>
          </div>

          {/* Ensemble Ortalama Skor */}
          <div
            style={{
              border: "2px solid #e2e8f0",
              borderRadius: "10px",
              padding: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "linear-gradient(135deg, #bfdbfe, #93c5fd)";
              e.target.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "linear-gradient(135deg, #dbeafe, #bfdbfe)";
              e.target.style.boxShadow = "none";
            }}
          >
            <div style={{ fontWeight: "700", fontSize: "14px", color: "#1e40af", display: "flex", alignItems: "center", gap: "6px" }}>
              📊 Ensemble Ortalama Skor
            </div>
            <div
              style={{
                border: "1px solid #3b82f6",
                borderRadius: "6px",
                height: "65px",
                padding: "10px",
                backgroundColor: "#ffffff",
                fontSize: "20px",
                fontWeight: "700",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#1e40af",
                boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.05)",
              }}
            >
              {loading
                ? "Yükleniyor..."
                : result?.ensembleMean
                  ? `${result.ensembleMean.toFixed(2)}%`
                  : "N/A"}
            </div>
          </div>
        </div>

        {/* Right Column: Detaylı Sonuçlar + PDF Button */}
        <div
          style={{
            flex: "0 0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            width: "380px",
          }}
        >
          {/* Detaylı Sonuçlar Header + PDF Button */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <div style={{ fontWeight: "700", fontSize: "16px", color: "#1e293b", display: "flex", alignItems: "center", gap: "6px" }}>
              📋 Detaylı Sonuçlar
            </div>
            <button
              onClick={exportToPDF}
              style={{
                border: "2px solid #10b981",
                borderRadius: "6px",
                padding: "6px 12px",
                background: "linear-gradient(135deg, #10b981, #059669)",
                color: "white",
                cursor: "pointer",
                fontSize: "11px",
                fontWeight: "600",
                whiteSpace: "nowrap",
                boxShadow: "0 2px 4px rgba(16, 185, 129, 0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "linear-gradient(135deg, #059669, #047857)";
                e.target.style.boxShadow = "0 4px 8px rgba(16, 185, 129, 0.4)";
                e.target.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "linear-gradient(135deg, #10b981, #059669)";
                e.target.style.boxShadow = "0 2px 4px rgba(16, 185, 129, 0.3)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              📄 PDF İndir
            </button>
          </div>

          {/* Detaylı Sonuçlar Box */}
          <div
            style={{
              border: "2px solid #e2e8f0",
              borderRadius: "8px",
              height: "240px",
              padding: "12px",
              backgroundColor: "#ffffff",
              overflowY: "auto",
              fontSize: "11px",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              width: "100%",
              boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.05)",
              fontFamily: "monospace",
              color: "#374151",
              lineHeight: "1.4",
            }}
          >
            {loading
              ? "Yükleniyor..."
              : result?.detailed?.length > 0
                ? result.detailed.map((detail, index) => {
                    // Timestamp'i daha okunabilir formata çevir
                    const formattedDetail = { ...detail };
                    if (formattedDetail.timestamp) {
                      const date = new Date(formattedDetail.timestamp);
                      formattedDetail.timestamp = `${date.toLocaleDateString("tr-TR")} ${date.toLocaleTimeString("tr-TR", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })} UTC`;
                    }
                    return (
                      <div key={index}>
                        {JSON.stringify(formattedDetail, null, 2)}
                      </div>
                    );
                  })
                : "Veri yok."}
          </div>
        </div>
      </div>
    </span>
  );
};

export default AnomalyTestButton;
