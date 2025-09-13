import React, { useState } from "react";

const droneData = [
  {
    name: "Drone-1",
    image: "/assets/drone.png",
    parts: [
      {
        name: "Motor A1",
        serial: "MTR-58291",
        supplier: "Tusaş Motor",
        date: "2025-03-01",
      },
      {
        name: "GPS Modülü X2",
        serial: "GPS-22311",
        supplier: "Aselsan",
        date: "2025-03-05",
      },
      {
        name: "Kamera C3",
        serial: "CAM-98112",
        supplier: "Roketsan",
        date: "2025-03-10",
      },
      {
        name: "İletişim Modülü D4",
        serial: "COM-44892",
        supplier: "Havelsan",
        date: "2025-03-12",
      },
    ],
  },
  {
    name: "Drone-2",
    image: "/assets/drone2.svg.svg",
    parts: [
      {
        name: "Motor B2",
        serial: "MTR-68291",
        supplier: "Tusaş Motor",
        date: "2025-04-01",
      },
      {
        name: "GPS Modülü Y3",
        serial: "GPS-32311",
        supplier: "Aselsan",
        date: "2025-04-05",
      },
      {
        name: "Kamera D4",
        serial: "CAM-88112",
        supplier: "Roketsan",
        date: "2025-04-10",
      },
      {
        name: "İletişim Modülü E5",
        serial: "COM-54892",
        supplier: "Havelsan",
        date: "2025-04-12",
      },
    ],
  },
  {
    name: "Drone-3",
    image: "/assets/drone3.svg.svg",
    parts: [
      {
        name: "Motor C3",
        serial: "MTR-78291",
        supplier: "Tusaş Motor",
        date: "2025-05-01",
      },
      {
        name: "GPS Modülü Z4",
        serial: "GPS-42311",
        supplier: "Aselsan",
        date: "2025-05-05",
      },
      {
        name: "Kamera E5",
        serial: "CAM-78112",
        supplier: "Roketsan",
        date: "2025-05-10",
      },
      {
        name: "İletişim Modülü F6",
        serial: "COM-64892",
        supplier: "Havelsan",
        date: "2025-05-12",
      },
    ],
  },
  {
    name: "Drone-4",
    image: "/assets/drone4.svg.svg",
    parts: [
      {
        name: "Motor D4",
        serial: "MTR-88291",
        supplier: "Tusaş Motor",
        date: "2025-06-01",
      },
      {
        name: "GPS Modülü W5",
        serial: "GPS-52311",
        supplier: "Aselsan",
        date: "2025-06-05",
      },
      {
        name: "Kamera F6",
        serial: "CAM-68112",
        supplier: "Roketsan",
        date: "2025-06-10",
      },
      {
        name: "İletişim Modülü G7",
        serial: "COM-74892",
        supplier: "Havelsan",
        date: "2025-06-12",
      },
    ],
  },
];

export default function DroneData() {
  const [selected, setSelected] = useState(0);
  const drone = droneData[selected];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
        padding: "40px 20px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
          maxWidth: "1200px",
          margin: "0 auto 40px auto",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#1e293b",
            margin: "0",
            letterSpacing: "-0.5px",
          }}
        >
          Parça Takibi
        </h1>
        <select
          value={selected}
          onChange={(e) => setSelected(Number(e.target.value))}
          style={{
            padding: "12px 20px",
            border: "2px solid #cbd5e1",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #ffffff, #f8fafc)",
            color: "#374151",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
            outline: "none",
            appearance: "none",
            WebkitAppearance: "none",
            MozAppearance: "none",
            paddingRight: "40px",
            backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 12px center",
            backgroundSize: "16px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = "#94a3b8";
            e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
            e.target.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = "#cbd5e1";
            e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)";
            e.target.style.transform = "translateY(0)";
          }}
        >
          {droneData.map((d, i) => (
            <option value={i} key={d.name}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      {/* Main Content */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          maxWidth: "1200px",
          margin: "0 auto",
          alignItems: "flex-start",
        }}
      >
        {/* Drone Icon Card */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "40px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "200px",
            height: "200px",
            border: "1px solid #e2e8f0",
          }}
        >
          <img
            src={drone.image}
            alt={drone.name}
            style={{
              width: "120px",
              height: "120px",
              objectFit: "contain",
              filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))",
            }}
          />
        </div>

        {/* Data Table Card */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05)",
            border: "1px solid #e2e8f0",
            flex: "1",
            overflow: "hidden",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: "0",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    background: "#f8fafc",
                    padding: "16px 20px",
                    textAlign: "left",
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "#374151",
                    borderBottom: "2px solid #e2e8f0",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  Parça Adı
                </th>
                <th
                  style={{
                    background: "#f8fafc",
                    padding: "16px 20px",
                    textAlign: "left",
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "#374151",
                    borderBottom: "2px solid #e2e8f0",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  Seri Numarası
                </th>
                <th
                  style={{
                    background: "#f8fafc",
                    padding: "16px 20px",
                    textAlign: "left",
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "#374151",
                    borderBottom: "2px solid #e2e8f0",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  Tedarikçi
                </th>
                <th
                  style={{
                    background: "#f8fafc",
                    padding: "16px 20px",
                    textAlign: "left",
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "#374151",
                    borderBottom: "2px solid #e2e8f0",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  Montaj Tarihi
                </th>
              </tr>
            </thead>
            <tbody>
              {drone.parts.map((part, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderBottom: "1px solid #f1f5f9",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.parentElement.style.background = "#f8fafc";
                  }}
                  onMouseLeave={(e) => {
                    e.target.parentElement.style.background = "transparent";
                  }}
                >
                  <td
                    style={{
                      padding: "16px 20px",
                      fontSize: "15px",
                      color: "#1e293b",
                      fontWeight: "500",
                    }}
                  >
                    {part.name}
                  </td>
                  <td
                    style={{
                      padding: "16px 20px",
                      fontSize: "15px",
                      color: "#64748b",
                      fontFamily: "monospace",
                      fontWeight: "500",
                    }}
                  >
                    {part.serial}
                  </td>
                  <td
                    style={{
                      padding: "16px 20px",
                      fontSize: "15px",
                      color: "#1e293b",
                      fontWeight: "500",
                    }}
                  >
                    {part.supplier}
                  </td>
                  <td
                    style={{
                      padding: "16px 20px",
                      fontSize: "15px",
                      color: "#64748b",
                      fontWeight: "500",
                    }}
                  >
                    {part.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
