import DroneSimulator from './DroneSimulator';
import DroneDataAPI from './DroneDataAPI';

let simulator = null;
let api = null;

export function initDroneSim() {
  if (!simulator) {
    simulator = new DroneSimulator();
    api = new DroneDataAPI(simulator);
  }
  return api;
}
