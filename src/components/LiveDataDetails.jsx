import React from "react";

export default function LiveDataDetails({ data }) {
  return (
    <div style={{ margin: "20px 0" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "0",
          border: "2px solid #e2e8f0",
          borderRadius: "20px",
          backgroundColor: "white",
          width: "534px",
          height: "355px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05)",
          overflow: "hidden",
        }}
      >
        {/* Top-Left: Konum */}
        <div
          style={{
            borderRight: "1px solid #e2e8f0",
            borderBottom: "1px solid #e2e8f0",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "linear-gradient(135deg, #f1f5f9, #e2e8f0)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "linear-gradient(135deg, #f8fafc, #f1f5f9)";
          }}
        >
          <h3
            style={{
              margin: "0 0 20px 0",
              fontWeight: "700",
              fontSize: "18px",
              textAlign: "center",
              width: "100%",
              color: "#1e293b",
              letterSpacing: "0.5px",
            }}
          >
            📍 Konum
          </h3>
          <div style={{ width: "100%" }}>
            <div style={{ marginBottom: "12px", textAlign: "left" }}>
              <span style={{ fontWeight: "600", fontSize: "14px", color: "#64748b" }}>X:</span>
              <span style={{ marginLeft: "12px", fontSize: "16px", color: "#1e293b", fontWeight: "500" }}>
                {data?.coordinates?.x || 0}
              </span>
            </div>
            <div style={{ textAlign: "left" }}>
              <span style={{ fontWeight: "600", fontSize: "14px", color: "#64748b" }}>Y:</span>
              <span style={{ marginLeft: "12px", fontSize: "16px", color: "#1e293b", fontWeight: "500" }}>
                {data?.coordinates?.y || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Top-Right: Uçuş */}
        <div
          style={{
            borderBottom: "1px solid #e2e8f0",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "linear-gradient(135deg, #fef3c7, #fde68a)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "linear-gradient(135deg, #fde68a, #fcd34d)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "linear-gradient(135deg, #fef3c7, #fde68a)";
          }}
        >
          <h3
            style={{
              margin: "0 0 20px 0",
              fontWeight: "700",
              fontSize: "18px",
              textAlign: "center",
              width: "100%",
              color: "#92400e",
              letterSpacing: "0.5px",
            }}
          >
            ✈️ Uçuş
          </h3>
          <div style={{ width: "100%" }}>
            <div style={{ marginBottom: "12px", textAlign: "left" }}>
              <span style={{ fontWeight: "600", fontSize: "14px", color: "#a16207" }}>Hız:</span>
              <span style={{ marginLeft: "12px", fontSize: "16px", color: "#92400e", fontWeight: "500" }}>
                {data?.speed || 0}km/s
              </span>
            </div>
            <div style={{ textAlign: "left" }}>
              <span style={{ fontWeight: "600", fontSize: "14px", color: "#a16207" }}>Yön:</span>
              <span style={{ marginLeft: "12px", fontSize: "16px", color: "#92400e", fontWeight: "500" }}>
                {data?.direction || 0}°
              </span>
            </div>
          </div>
        </div>

        {/* Bottom-Left: Durum */}
        <div
          style={{
            borderRight: "1px solid #e2e8f0",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "linear-gradient(135deg, #bfdbfe, #93c5fd)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "linear-gradient(135deg, #dbeafe, #bfdbfe)";
          }}
        >
          <h3
            style={{
              margin: "0 0 20px 0",
              fontWeight: "700",
              fontSize: "18px",
              textAlign: "center",
              width: "100%",
              color: "#1e40af",
              letterSpacing: "0.5px",
            }}
          >
            📊 Durum
          </h3>
          <div style={{ width: "100%" }}>
            <div style={{ marginBottom: "12px", textAlign: "left" }}>
              <span style={{ fontWeight: "600", fontSize: "14px", color: "#3730a3" }}>Mod:</span>
              <span style={{ marginLeft: "12px", fontSize: "16px", color: "#1e40af", fontWeight: "500" }}>
                {data?.mode || "N/A"}
              </span>
            </div>
            <div style={{ textAlign: "left" }}>
              <span style={{ fontWeight: "600", fontSize: "14px", color: "#3730a3" }}>
                Durum:
              </span>
              <span style={{ marginLeft: "12px", fontSize: "16px", color: "#1e40af", fontWeight: "500" }}>
                {data?.status || "Beklemede"}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom-Right: Sistem */}
        <div
          style={{
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "linear-gradient(135deg, #dcfce7, #bbf7d0)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "linear-gradient(135deg, #f0fdf4, #dcfce7)";
          }}
        >
          <h3
            style={{
              margin: "0 0 20px 0",
              fontWeight: "700",
              fontSize: "18px",
              textAlign: "center",
              width: "100%",
              color: "#166534",
              letterSpacing: "0.5px",
            }}
          >
            ⚙️ Sistem
          </h3>
          <div style={{ width: "100%" }}>
            <div style={{ marginBottom: "12px", textAlign: "left" }}>
              <span style={{ fontWeight: "600", fontSize: "14px", color: "#15803d" }}>
                Batarya:
              </span>
              <span style={{ marginLeft: "12px", fontSize: "16px", color: "#166534", fontWeight: "500" }}>
                {data?.battery || 0}%
              </span>
            </div>
            <div style={{ textAlign: "left" }}>
              <span style={{ fontWeight: "600", fontSize: "14px", color: "#15803d" }}>
                İrtifa:
              </span>
              <span style={{ marginLeft: "12px", fontSize: "16px", color: "#166534", fontWeight: "500" }}>
                {data?.altitude || 0}m
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
