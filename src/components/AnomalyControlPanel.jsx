import React from "react";

export default function AnomalyControlPanel({ api, onStart, onStop, onReset }) {
  const handleAnomaly = (type) => {
    if (api) {
      api.triggerAnomaly(type);
    }
  };

  const handleNormalMode = () => {
    if (api) {
      api.returnToNormal();
    }
  };

  return (
    <span
      style={{
        border: "2px solid #6b7280",
        borderRadius: "20px",
        padding: "24px",
        display: "inline-block",
        width: "500px",
        background: "linear-gradient(135deg, #f9fafb, #f3f4f6)",
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05)",
        backdropFilter: "blur(10px)",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.target.style.boxShadow = "0 12px 35px rgba(0, 0, 0, 0.15), 0 6px 15px rgba(0, 0, 0, 0.08)";
        e.target.style.borderColor = "#9ca3af";
      }}
      onMouseLeave={(e) => {
        e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05)";
        e.target.style.borderColor = "#6b7280";
      }}
    >
      {/* Üst Kısım: Başlat, Durdur, Reset */}
      <span
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "8px",
          marginBottom: "12px",
        }}
      >
        <button
          onClick={onStart}
          style={{
            border: "1px solid #10b981",
            textAlign: "center",
            padding: "12px",
            background: "linear-gradient(135deg, #10b981, #059669)",
            cursor: "pointer",
            fontSize: "16px",
            color: "white",
            fontWeight: "bold",
            borderRadius: "8px",
            boxShadow: "0 3px 6px rgba(16, 185, 129, 0.4)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "linear-gradient(135deg, #059669, #047857)";
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 12px rgba(16, 185, 129, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "linear-gradient(135deg, #10b981, #059669)";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 3px 6px rgba(16, 185, 129, 0.4)";
          }}
        >
          Başlat
        </button>
        <button
          onClick={onStop}
          style={{
            border: "1px solid #f59e0b",
            textAlign: "center",
            padding: "12px",
            background: "linear-gradient(135deg, #f59e0b, #d97706)",
            cursor: "pointer",
            fontSize: "16px",
            color: "white",
            fontWeight: "bold",
            borderRadius: "8px",
            boxShadow: "0 3px 6px rgba(245, 158, 11, 0.4)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "linear-gradient(135deg, #d97706, #b45309)";
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 12px rgba(245, 158, 11, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "linear-gradient(135deg, #f59e0b, #d97706)";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 3px 6px rgba(245, 158, 11, 0.4)";
          }}
        >
          Durdur
        </button>
        <button
          onClick={onReset}
          style={{
            border: "1px solid #6b7280",
            textAlign: "center",
            padding: "12px",
            background: "linear-gradient(135deg, #6b7280, #4b5563)",
            cursor: "pointer",
            fontSize: "16px",
            color: "white",
            fontWeight: "bold",
            borderRadius: "8px",
            boxShadow: "0 3px 6px rgba(107, 114, 128, 0.4)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "linear-gradient(135deg, #4b5563, #374151)";
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 12px rgba(107, 114, 128, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "linear-gradient(135deg, #6b7280, #4b5563)";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 3px 6px rgba(107, 114, 128, 0.4)";
          }}
        >
          Reset
        </button>
      </span>

      {/* Orta Kısım: Anomali Butonları */}
      <span
        style={{
          display: "block",
          border: "1px solid #ef4444",
          padding: "10px",
          textAlign: "center",
          marginBottom: "8px",
          background: "#ef4444",
          borderRadius: "6px",
          boxShadow: "0 2px 4px rgba(239, 68, 68, 0.4)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <button
          onClick={() => handleAnomaly("route")}
          style={{
            width: "100%",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: "0",
            margin: "0",
            fontSize: "15px",
            color: "white",
            fontWeight: "bold",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#fef2f2";
            e.target.parentElement.style.background = "#dc2626";  
            e.target.parentElement.style.boxShadow = "0 4px 12px rgba(239, 68, 68, 0.6)";
            e.target.parentElement.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "white";
            e.target.parentElement.style.background = "#ef4444";
            e.target.parentElement.style.boxShadow = "0 2px 4px rgba(239, 68, 68, 0.4)";
            e.target.parentElement.style.transform = "translateY(0)";
          }}
        >
          ROTA DEĞİŞİKLİĞİ
        </button>
      </span>
      <span
        style={{
          display: "block",
          border: "1px solid #ef4444",
          padding: "10px",
          textAlign: "center",
          marginBottom: "8px",
          background: "#ef4444",
          borderRadius: "6px",
          boxShadow: "0 2px 4px rgba(239, 68, 68, 0.4)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <button
          onClick={() => handleAnomaly("altitude")}
          style={{
            width: "100%",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: "0",
            margin: "0",
            fontSize: "15px",
            color: "white",
            fontWeight: "bold",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#fef2f2";
            e.target.parentElement.style.background = "#dc2626";
            e.target.parentElement.style.boxShadow = "0 4px 12px rgba(239, 68, 68, 0.6)";
            e.target.parentElement.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "white";
            e.target.parentElement.style.background = "#ef4444";
            e.target.parentElement.style.boxShadow = "0 2px 4px rgba(239, 68, 68, 0.4)";
            e.target.parentElement.style.transform = "translateY(0)";
          }}
        >
          İRTİFA KAYBI
        </button>
      </span>
      <span
        style={{
          display: "block",
          border: "1px solid #ef4444",
          padding: "10px",
          textAlign: "center",
          marginBottom: "8px",
          background: "#ef4444",
          borderRadius: "6px",
          boxShadow: "0 2px 4px rgba(239, 68, 68, 0.4)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <button
          onClick={() => handleAnomaly("speed")}
          style={{
            width: "100%",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: "0",
            margin: "0",
            fontSize: "15px",
            color: "white",
            fontWeight: "bold",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#fef2f2";
            e.target.parentElement.style.background = "#dc2626";
            e.target.parentElement.style.boxShadow = "0 4px 12px rgba(239, 68, 68, 0.6)";
            e.target.parentElement.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "white";
            e.target.parentElement.style.background = "#ef4444";
            e.target.parentElement.style.boxShadow = "0 2px 4px rgba(239, 68, 68, 0.4)";
            e.target.parentElement.style.transform = "translateY(0)";
          }}
        >
          HIZ DÜŞÜŞÜ
        </button>
      </span>
      <span
        style={{
          display: "block",
          border: "1px solid #22c55e",
          padding: "10px",
          textAlign: "center",
          marginBottom: "8px",
          background: "#22c55e",
          borderRadius: "6px",
          boxShadow: "0 2px 4px rgba(34, 197, 94, 0.4)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <button
          onClick={handleNormalMode}
          style={{
            width: "100%",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: "0",
            margin: "0",
            fontSize: "15px",
            color: "white",
            fontWeight: "bold",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#f0fdf4";
            e.target.parentElement.style.background = "#16a34a";
            e.target.parentElement.style.boxShadow = "0 4px 12px rgba(34, 197, 94, 0.6)";
            e.target.parentElement.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "white";
            e.target.parentElement.style.background = "#22c55e";
            e.target.parentElement.style.boxShadow = "0 2px 4px rgba(34, 197, 94, 0.4)";
            e.target.parentElement.style.transform = "translateY(0)";
          }}
        >
          NORMAL MODA DÖN
        </button>
      </span>

      {/* Alt Kısım: Bağlantı Durumu */}
      <span
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "8px",
          marginTop: "12px",
        }}
      >
        <span
          style={{
            border: "1px solid #9ca3af",
            borderRadius: "12px",
            textAlign: "center",
            padding: "12px",
            background: "linear-gradient(135deg, #ffffff, #f8fafc)",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = "#6b7280";
            e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
            e.target.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = "#9ca3af";
            e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)";
            e.target.style.transform = "translateY(0)";
          }}
        >
          <select
            style={{
              width: "100%",
              border: "none",
              background: "transparent",
              textAlign: "center",
              fontSize: "14px",
              color: "#374151",
              fontWeight: "500",
              cursor: "pointer",
              outline: "none",
              appearance: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
              paddingRight: "20px",
              backgroundImage: "none",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 8px center",
              backgroundSize: "16px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "#1f2937";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "#374151";
            }}
          >
            <option>WEBSOCKET (REAL-TIME)</option>
            <option>HTTP (PERIODIC)</option>
            <option>BOTH METHODS</option>
          </select>
        </span>
        <span
          style={{
            border: "1px solid #ef4444",
            textAlign: "center",
            padding: "10px",
            background: "#ef4444",
            borderRadius: "6px",
            boxShadow: "0 2px 4px rgba(239, 68, 68, 0.4)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <button
            style={{
              width: "100%",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              padding: "0",
              margin: "0",
              fontSize: "14px",
              color: "white",
              fontWeight: "bold",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "#fef2f2";
              e.target.parentElement.style.background = "#dc2626";
              e.target.parentElement.style.boxShadow = "0 4px 12px rgba(239, 68, 68, 0.6)";
              e.target.parentElement.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "white";
              e.target.parentElement.style.background = "#ef4444";
              e.target.parentElement.style.boxShadow = "0 2px 4px rgba(239, 68, 68, 0.4)";
              e.target.parentElement.style.transform = "translateY(0)";
            }}
          >
            BAĞLANTI KESİLDİ
          </button>
        </span>
      </span>
    </span>
  );
}
