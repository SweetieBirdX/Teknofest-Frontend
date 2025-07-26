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
    const zscoreAnomalies = [];
    for (let i = 0; i < records.length; i++) {
      if (speedZ[i] > 2) zscoreAnomalies.push({ type: 'speed_zscore', timestamp: records[i].timestamp, z: speedZ[i] });
      if (altitudeZ[i] > 2) zscoreAnomalies.push({ type: 'altitude_zscore', timestamp: records[i].timestamp, z: altitudeZ[i] });
      if (headingZ[i] > 2) zscoreAnomalies.push({ type: 'heading_zscore', timestamp: records[i].timestamp, z: headingZ[i] });
    }

    // Sonuç
    return {
      thresholdAnomalies: anomalies,
      zscoreAnomalies: zscoreAnomalies,
      all: records
    };
  }
}
