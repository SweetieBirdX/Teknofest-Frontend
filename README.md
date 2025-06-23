# METUChain Drone Simülasyonu

Blokzincir Destekli İHA/SİHA ve Orijin Takip Sistemi  
**2025 Teknofest Blokzincir Yarışması**  
Takım ID: 736026  
Başvuru ID: 3614435

## Proje Hakkında

Bu proje, gerçek zamanlı drone (İHA/SİHA) simülasyonu ve parça orijin takibi sunar.  
Amaç, birden fazla drone'un uçuş verilerini, anomali tespitlerini ve parça geçmişini kullanıcı dostu bir arayüzde sunmak ve yönetmektir.

## Özellikler

- **Gerçek Zamanlı Drone Takibi:**  
  Canlı harita üzerinde drone konumunu ve uçuş verilerini izleyin.

- **Anomali Tespiti ve Yönetimi:**  
  Rota değişikliği, irtifa kaybı, hız düşüşü gibi anomali senaryolarını simüle edin ve anlık olarak görüntüleyin.

- **Veri Geçmişi (Log):**  
  Drone'dan gelen tüm veriler saniyede iki kez kaydedilir, geçmişe dönük olarak incelenebilir ve kolayca kopyalanabilir.

- **Parça Takibi:**  
  Her drone için parça listesi, tedarikçi, seri numarası ve montaj tarihiyle birlikte görüntülenir. Drone seçimine göre ilgili görsel ve bilgiler değişir.

- **Kapsamlı Dashboard:**  
  Durum göstergeleri, batarya seviyesi, hız, irtifa, bağlantı durumu ve anomali kontrol paneli tek ekranda.

## Kullanılan Teknolojiler

- **React** (Vite ile hızlı geliştirme ortamı)
- **TailwindCSS** (modern ve responsive arayüz)
- **React Router** (sayfa geçişleri)
- **Leaflet & React-Leaflet** (harita ve konum gösterimi)
- **Simülasyon Motoru:**  
  `src/sim/DroneSimulator.js` dosyasında, drone hareketleri ve anomali senaryoları simüle edilir.

## Kurulum ve Çalıştırma

1. **Bağımlılıkları yükleyin:**
   ```
   npm install
   ```

2. **Geliştirme sunucusunu başlatın:**
   ```
   npm run dev
   ```

3. **Uygulamayı açın:**  
   [http://localhost:5173](http://localhost:5173)

## Klasör Yapısı

- `src/pages/`  
  - **Dashboard.jsx:** Ana kontrol paneli ve canlı izleme ekranı  
  - **DroneData.jsx:** Drone parça geçmişi ve görselleri
- `src/components/`  
  - **DataLogPanel.jsx:** Veri geçmişi ve kopyalama özelliği  
  - **AnomalyControlPanel.jsx:** Anomali senaryoları ve bağlantı durumu  
  - **StatusBar.jsx, Map.jsx, LiveDataDetails.jsx, DroneStatusCard.jsx:** Diğer yardımcı bileşenler
- `src/sim/`  
  - **DroneSimulator.js:** Simülasyon motoru  
  - **DroneDataAPI.js:** API arayüzü

## Katkı ve Lisans

Bu proje Teknofest yarışması için geliştirilmiştir.  
Her türlü katkı ve öneri için iletişime geçebilirsiniz.
