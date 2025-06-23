import React, { useState } from 'react';

const droneData = [
  {
    name: 'İHA-1',
    image: '/assets/drone.png',
    parts: [
      { name: 'Motor A1', serial: 'MTR-58291', supplier: 'Tusaş Motor', date: '2025-03-01' },
      { name: 'GPS Modülü X2', serial: 'GPS-22311', supplier: 'Aselsan', date: '2025-03-05' },
      { name: 'Kamera C3', serial: 'CAM-98112', supplier: 'Roketsan', date: '2025-03-10' },
      { name: 'İletişim Modülü D4', serial: 'COM-44892', supplier: 'Havelsan', date: '2025-03-12' },
    ],
  },
  {
    name: 'İHA-2',
    image: '/assets/drone2.svg.svg',
    parts: [
      { name: 'Motor B2', serial: 'MTR-68291', supplier: 'Tusaş Motor', date: '2025-04-01' },
      { name: 'GPS Modülü Y3', serial: 'GPS-32311', supplier: 'Aselsan', date: '2025-04-05' },
      { name: 'Kamera D4', serial: 'CAM-88112', supplier: 'Roketsan', date: '2025-04-10' },
      { name: 'İletişim Modülü E5', serial: 'COM-54892', supplier: 'Havelsan', date: '2025-04-12' },
    ],
  },
  {
    name: 'İHA-3',
    image: '/assets/drone3.svg.svg',
    parts: [
      { name: 'Motor C3', serial: 'MTR-78291', supplier: 'Tusaş Motor', date: '2025-05-01' },
      { name: 'GPS Modülü Z4', serial: 'GPS-42311', supplier: 'Aselsan', date: '2025-05-05' },
      { name: 'Kamera E5', serial: 'CAM-78112', supplier: 'Roketsan', date: '2025-05-10' },
      { name: 'İletişim Modülü F6', serial: 'COM-64892', supplier: 'Havelsan', date: '2025-05-12' },
    ],
  },
  {
    name: 'İHA-4',
    image: '/assets/drone4.svg.svg',
    parts: [
      { name: 'Motor D4', serial: 'MTR-88291', supplier: 'Tusaş Motor', date: '2025-06-01' },
      { name: 'GPS Modülü W5', serial: 'GPS-52311', supplier: 'Aselsan', date: '2025-06-05' },
      { name: 'Kamera F6', serial: 'CAM-68112', supplier: 'Roketsan', date: '2025-06-10' },
      { name: 'İletişim Modülü G7', serial: 'COM-74892', supplier: 'Havelsan', date: '2025-06-12' },
    ],
  },
];

export default function DroneData() {
  const [selected, setSelected] = useState(0);
  const drone = droneData[selected];

  return (
    <div style={{ background: '#eef5fd', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '2.5rem', margin: 0 }}>Parça Takibi</h1>
        <select
          value={selected}
          onChange={e => setSelected(Number(e.target.value))}
          style={{ fontSize: '1.2rem', padding: '0.4rem 1.2rem', borderRadius: '8px' }}
        >
          {droneData.map((d, i) => (
            <option value={i} key={d.name}>{d.name}</option>
          ))}
        </select>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
        <img src={drone.image} alt={drone.name} style={{ width: '180px', height: 'auto', borderRadius: '12px', background: '#fff', boxShadow: '0 2px 12px #0001', padding: '1rem' }} />
        <div style={{ flex: 1 }}>
          <table style={{ width: '100%', background: '#fff', borderRadius: '10px', boxShadow: '0 2px 12px #0001', overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: '#f5f7fa' }}>
                <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 'bold' }}>Parça Adı</th>
                <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 'bold' }}>Seri Numarası</th>
                <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 'bold' }}>Tedarikçi</th>
                <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 'bold' }}>Montaj Tarihi</th>
              </tr>
            </thead>
            <tbody>
              {drone.parts.map((part, idx) => (
                <tr key={idx}>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>{part.name}</td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>{part.serial}</td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>{part.supplier}</td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>{part.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
