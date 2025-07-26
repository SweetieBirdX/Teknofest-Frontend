export default class DroneDataAPI {
  constructor(simulator) {
    this.simulator = simulator;
  }

  getCurrentData() {
    return this.simulator.getCurrentData();
  }

  getHistoricalData(limit = 10) {
    return this.simulator.getHistoricalData(limit);
  }

  triggerAnomaly(type) {
    this.simulator.triggerAnomaly(type);
  }

  stop() {
    this.simulator.stop();
  }

  start() {
    this.simulator.start();
  }

  reset() {
    this.simulator.reset();
  }

  returnToNormal() {
    this.simulator.returnToNormal();
  }

  /**
   * Simülasyon verilerini anomaly API'ye gönderir ve sonucu döndürür.
   * @returns {Promise<Object>} Anomali analiz sonucu
   */
  /**
   * Simülasyon verilerini JS ile analiz eder ve anomali skorlarını döndürür.
   * @returns {Promise<Object>} Anomali analiz sonucu
   */
  async anomalyAnalyze() {
    const telemetry = this.simulator.getHistoricalData();
    if (!telemetry || telemetry.length < 2) return null;

    // Eşikler
    const SPEED_THRESHOLD = 10;
    const ALTITUDE_THRESHOLD = 5;
    const HEADING_THRESHOLD = 10;

    // Dönüştür: [{timestamp, ...telemetry}] => [{timestamp, speed, altitude, heading}]
    const records = telemetry.map(d => ({
      timestamp: d.timestamp,
      speed: d.speed,
      altitude: d.altitude,
      heading: d.direction
    }));

    // Farklar ve eşik tabanlı anomali
    let prev = records[0];
    const anomalies = [];
    for (let i = 1; i < records.length; i++) {
      const curr = records[i];
      const speedDiff = Math.abs(curr.speed - prev.speed);
      const altitudeDiff = Math.abs(curr.altitude - prev.altitude);
      const headingDiff = Math.abs(curr.heading - prev.heading);
      if (speedDiff > SPEED_THRESHOLD) anomalies.push({ type: 'speed', timestamp: curr.timestamp, diff: speedDiff });
      if (altitudeDiff > ALTITUDE_THRESHOLD) anomalies.push({ type: 'altitude', timestamp: curr.timestamp, diff: altitudeDiff });
      if (headingDiff > HEADING_THRESHOLD) anomalies.push({ type: 'heading', timestamp: curr.timestamp, diff: headingDiff });
      prev = curr;
    }

    // Z-score tabanlı anomali
    function zscores(arr) {
      const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
      const std = Math.sqrt(arr.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / arr.length);
      return arr.map(v => std === 0 ? 0 : Math.abs((v - mean) / std));
    }
    const speedArr = records.map(r => r.speed);
    const altitudeArr = records.map(r => r.altitude);
    const headingArr = records.map(r => r.heading);
    const speedZ = zscores(speedArr);
    const altitudeZ = zscores(altitudeArr);
    const headingZ = zscores(headingArr);

    // Lineer regresyon tabanlı anomali (basit)
    function linearResiduals(arr) {
      const n = arr.length;
      const x = Array.from({length: n}, (_, i) => i);
      const xMean = x.reduce((a, b) => a + b, 0) / n;
      const yMean = arr.reduce((a, b) => a + b, 0) / n;
      const num = x.reduce((sum, xi, i) => sum + (xi - xMean) * (arr[i] - yMean), 0);
      const den = x.reduce((sum, xi) => sum + Math.pow(xi - xMean, 2), 0);
      const slope = den === 0 ? 0 : num / den;
      const intercept = yMean - slope * xMean;
      const yPred = x.map(xi => slope * xi + intercept);
      return arr.map((v, i) => Math.abs(v - yPred[i]));
    }
    const speedLin = linearResiduals(speedArr);
    const altitudeLin = linearResiduals(altitudeArr);
    const headingLin = linearResiduals(headingArr);

    // Log-diff tabanlı anomali
    function logDiff(arr) {
      const logArr = arr.map(v => Math.log(v === 0 ? 1 : Math.abs(v)));
      const diffs = [0];
      for (let i = 1; i < logArr.length; i++) {
        diffs.push(Math.abs(logArr[i] - logArr[i-1]));
      }
      return diffs;
    }
    const speedLog = logDiff(speedArr);
    const altitudeLog = logDiff(altitudeArr);
    const headingLog = logDiff(headingArr);

    // GMM benzeri (2 modlu normalizasyon, JS'de gerçek GMM yok)
    function gmmLike(arr) {
      // Basit: ortalamadan uzaklık, iki modlu gibi normalize et
      const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
      const std = Math.sqrt(arr.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / arr.length);
      return arr.map(v => Math.abs(v - mean) / (std + 1e-8));
    }
    const speedGmm = gmmLike(speedArr);
    const altitudeGmm = gmmLike(altitudeArr);
    const headingGmm = gmmLike(headingArr);

    // Normalizasyon fonksiyonu (0-100 arası)
    function norm01(arr) {
      const min = Math.min(...arr);
      const max = Math.max(...arr);
      return arr.map(v => max > min ? 100 * (v - min) / (max - min) : 0);
    }

    // Ensemble skor (her satır için ortalama)
    const ensembleScores = records.map((_, i) => {
      const scores = [
        norm01(speedLin)[i], norm01(altitudeLin)[i], norm01(headingLin)[i],
        norm01(speedLog)[i], norm01(altitudeLog)[i], norm01(headingLog)[i],
        norm01(speedZ)[i], norm01(altitudeZ)[i], norm01(headingZ)[i],
        norm01(speedGmm)[i], norm01(altitudeGmm)[i], norm01(headingGmm)[i]
      ];
      return scores.reduce((a, b) => a + b, 0) / scores.length;
    });

    // Sonuçları her satıra ekle
    const detailed = records.map((r, i) => ({
      ...r,
      speed_linear: norm01(speedLin)[i],
      altitude_linear: norm01(altitudeLin)[i],
      heading_linear: norm01(headingLin)[i],
      speed_log: norm01(speedLog)[i],
      altitude_log: norm01(altitudeLog)[i],
      heading_log: norm01(headingLog)[i],
      speed_zscore: norm01(speedZ)[i],
      altitude_zscore: norm01(altitudeZ)[i],
      heading_zscore: norm01(headingZ)[i],
      speed_gmm: norm01(speedGmm)[i],
      altitude_gmm: norm01(altitudeGmm)[i],
      heading_gmm: norm01(headingGmm)[i],
      ensemble: ensembleScores[i]
    }));

    // Kritik anomali noktaları (ensemble > 50)
    const ensembleCritical = detailed.filter(r => r.ensemble > 50);
    const ensembleMean = ensembleScores.reduce((a, b) => a + b, 0) / ensembleScores.length;

    return {
      thresholdAnomalies: anomalies,
      detailed,
      ensembleCritical,
      ensembleMean,
      all: records
    };
  }
}
