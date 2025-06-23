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
}
