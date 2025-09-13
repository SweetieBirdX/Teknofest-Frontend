import React from "react";

function formatEntryText(entry) {
  return (
    `Zaman: ${new Date(entry.timestamp).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })}\n` +
    `Konum: (${entry.coordinates.x}, ${entry.coordinates.y})\n` +
    `İrtifa: ${entry.altitude}m\n` +
    `Hız: ${entry.speed}km/s\n` +
    `Durum: ${entry.status}`
  );
}

export default function DataLogPanel({ historicalData, selectedDrone }) {
  const handleCopy = (entry) => {
    const text = formatEntryText(entry);
    navigator.clipboard.writeText(text);
  };

  return (
    <span>
      <span
        style={{
          border: "2px solid #e2e8f0",
          borderRadius: "16px",
          height: "550px",
          maxWidth: "530px",
          width: "530px",
          overflowY: "auto",
          padding: "16px",
          display: "block",
          background: "linear-gradient(135deg, #ffffff, #f8fafc)",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08), 0 3px 8px rgba(0, 0, 0, 0.04)",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
        }}
      >
        {/* Başlık */}
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
          📝 Veri Geçmişi
        </h2>
        {historicalData.map((entry, index) => (
          <span
            key={index}
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
              marginBottom: "8px",
              display: "flex",
              minHeight: "80px",
              width: "100%",
              background: "white",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
              e.target.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            {/* Sol Taraf: Kopyala Butonu */}
            <span
              style={{
                borderRight: "1px solid #e2e8f0",
                padding: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "100px",
                background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
              }}
            >
              <button
                title="Kopyala"
                onClick={() => handleCopy(entry)}
                style={{
                  border: "2px solid #3b82f6",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "12px",
                  boxShadow: "0 2px 4px rgba(59, 130, 246, 0.3)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "linear-gradient(135deg, #2563eb, #1d4ed8)";
                  e.target.style.boxShadow = "0 3px 6px rgba(59, 130, 246, 0.4)";
                  e.target.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "linear-gradient(135deg, #3b82f6, #2563eb)";
                  e.target.style.boxShadow = "0 2px 4px rgba(59, 130, 246, 0.3)";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                📋 Kopyala
              </button>
            </span>

            {/* Sağ Taraf: 2x3 Grid - Border'lar kaldırıldı */}
            <span
              style={{
                flex: 1,
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gridTemplateRows: "1fr 1fr",
                gap: "0",
                borderTopRightRadius: "10px",
                borderBottomRightRadius: "10px",
                overflow: "hidden",
              }}
            >
              {/* Üst Sol: Zaman */}
              <span
                style={{
                  padding: "12px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #fef3c7, #fde68a)",
                  borderRight: "1px solid #e2e8f0",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <span style={{ fontWeight: "700", marginBottom: "4px", fontSize: "12px", color: "#92400e" }}>
                  🕐 Zaman
                </span>
                <span style={{ fontSize: "13px", color: "#92400e", fontWeight: "500" }}>
                  {new Date(entry.timestamp).toLocaleTimeString("tr-TR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                  })}
                </span>
              </span>

              {/* Üst Orta: Durum */}
              <span
                style={{
                  padding: "12px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
                  borderRight: "1px solid #e2e8f0",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <span style={{ fontWeight: "700", marginBottom: "4px", fontSize: "12px", color: "#1e40af" }}>
                  📊 Durum
                </span>
                <span style={{ fontSize: "13px", color: "#1e40af", fontWeight: "500" }}>{entry.status}</span>
              </span>

              {/* Üst Sağ: Boş (3. sütun) */}
              <span
                style={{
                  padding: "12px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <span
                  style={{ fontWeight: "700", marginBottom: "4px", fontSize: "12px", color: "#166534" }}
                >
                  🆔 Drone
                </span>
                <span style={{ fontSize: "13px", color: "#166534", fontWeight: "500" }}>
                  {selectedDrone ? selectedDrone.charAt(0).toUpperCase() + selectedDrone.slice(1) : `#${index + 1}`}
                </span>
              </span>

              {/* Alt Sol: Konum */}
              <span
                style={{
                  padding: "12px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                  borderRight: "1px solid #e2e8f0",
                }}
              >
                <span style={{ fontWeight: "700", marginBottom: "4px", fontSize: "12px", color: "#374151" }}>
                  📍 Konum
                </span>
                <span style={{ fontSize: "13px", color: "#374151", fontWeight: "500" }}>
                  ({entry.coordinates.x}, {entry.coordinates.y})
                </span>
              </span>

              {/* Alt Orta: İrtifa */}
              <span
                style={{
                  padding: "12px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #fecaca, #fca5a5)",
                  borderRight: "1px solid #e2e8f0",
                }}
              >
                <span style={{ fontWeight: "700", marginBottom: "4px", fontSize: "12px", color: "#dc2626" }}>
                  📈 İrtifa
                </span>
                <span style={{ fontSize: "13px", color: "#dc2626", fontWeight: "500" }}>{entry.altitude}m</span>
              </span>

              {/* Alt Sağ: Hız */}
              <span
                style={{
                  padding: "12px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #e0e7ff, #c7d2fe)",
                }}
              >
                <span style={{ fontWeight: "700", marginBottom: "4px", fontSize: "12px", color: "#3730a3" }}>
                  🚀 Hız
                </span>
                <span style={{ fontSize: "13px", color: "#3730a3", fontWeight: "500" }}>{entry.speed}km/s</span>
              </span>
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}
