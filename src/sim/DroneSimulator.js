export default class DroneSimulator {
  constructor() {
    this.drone = {
      x: 50,
      y: 200,
      altitude: 100,
      speed: 60,
      direction: 0,
      targetX: 550,
      targetY: 200,
      status: "Beklemede",
      battery: 100,
    };

    this.initialDroneState = { ...this.drone };
    this.initialMode = "normal";

    this.currentMode = "normal";
    this.dataHistory = [];

    this.isRunning = false;
    this.intervalId = null;
    this.altitudeLossStep = 0;
    this._startLoop();
  }

  _startLoop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      if (!this.isRunning) {
        return;
      }

      this.updateDrone();
      this.logData();
    }, 250);
  }

  updateDrone() {
    if (!this.isRunning) return;

    this.handleAnomalies();

    const dx = this.drone.targetX - this.drone.x;
    const dy = this.drone.targetY - this.drone.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 5) {
      const moveSpeed = this.drone.speed / 10;
      this.drone.x += (dx / distance) * moveSpeed;
      this.drone.y += (dy / distance) * moveSpeed;
      this.drone.direction = Math.atan2(dy, dx) * (180 / Math.PI);
      
      if(this.currentMode === 'normal') {
        this.drone.battery = Math.max(0, this.drone.battery - 0.01);
      }

    } else {
      if (this.currentMode === 'route') {
         this.setRandomTargetOutsideBounds();
      } else {
         this.setNewTarget();
      }
    }

    if (this.currentMode !== 'route') {
      this.drone.x = Math.max(10, Math.min(590, this.drone.x));
      this.drone.y = Math.max(10, Math.min(390, this.drone.y));
    }

    if (this.currentMode === 'normal') {
        if (this.drone.battery < 10) {
            this.drone.status = "Düşük Batarya";
        } else {
            this.drone.status = "Uçuşta";
        }
    }
  }

  setNewTarget() {
    if (!this.isRunning) return;
    
    if (this.currentMode === 'normal') {
      this.drone.targetX = 50 + Math.random() * 500;
      this.drone.targetY = 50 + Math.random() * 300;
    }
  }

  setRandomTargetOutsideBounds() {
      const currentX = this.drone.x;
      const currentY = this.drone.y;

      let newTargetX, newTargetY;
      const padding = 100;
      const minX = 10, maxX = 590, minY = 10, maxY = 390;
      const mapWidth = maxX - minX;
      const mapHeight = maxY - minY;

      const isOutside = (tx, ty) => tx < minX || tx > maxX || ty < minY || ty > maxY;

      do {
          const angle = Math.random() * 2 * Math.PI;
          const distance = (Math.random() * 200) + 100;

          newTargetX = currentX + distance * Math.cos(angle);
          newTargetY = currentY + distance * Math.sin(angle);

      } while (!isOutside(newTargetX, newTargetY));
      
      this.drone.targetX = newTargetX;
      this.drone.targetY = newTargetY;
  }

  handleAnomalies() {
    if (!this.isRunning || this.currentMode === 'normal') return;

    switch (this.currentMode) {
      case 'altitude':
        this.drone.altitude = Math.max(0, this.drone.altitude - 2);
        this.drone.battery = Math.max(0, this.drone.battery - 0.05);
        this.drone.status = 'ANOMALİ: İrtifa Kaybı';

        if (this.drone.altitude === 0) {
          if (this.altitudeLossStep === 0) {
            this.drone.speed = 10; 
            this.altitudeLossStep = 1;
          } else if (this.altitudeLossStep > 0 && this.altitudeLossStep < 8) {
            this.drone.speed = Math.max(0, this.drone.speed - 1.25); 
            this.altitudeLossStep += 1;
          } else if (this.altitudeLossStep >= 8) {
            this.drone.speed = 0;
            this.altitudeLossStep = 8;
          }
        } else {
          this.altitudeLossStep = 0; 
        }
        break;
      case 'speed':
        this.drone.speed = Math.max(10, this.drone.speed - 1);
        this.drone.battery = Math.max(0, this.drone.battery - 0.05);
        this.drone.status = 'ANOMALİ: Hız Düşüşü';
        break;
      case 'route':
        this.drone.status = 'ANOMALİ: Rota Değişikliği';
        break;
    }
  }

  triggerAnomaly(type) {
    if (!this.isRunning) return;

    this.currentMode = type;

    switch (type) {
        case 'route':
            this.drone.status = 'ANOMALİ: Rota Değişikliği';
            this.setRandomTargetOutsideBounds();
            break;
        case 'altitude':
            this.drone.status = 'ANOMALİ: İrtifa Kaybı';
            this.drone.altitude = Math.max(0, this.drone.altitude - 2);
            break;
        case 'speed':
            this.drone.status = 'ANOMALİ: Hız Düşüşü';
            this.drone.speed = Math.max(10, this.drone.speed - 1);
            break;
        default:
             this.drone.status = `ANOMALİ: ${type.toUpperCase()}`;
             break;
    }
  }

  returnToNormal() {
    if (!this.isRunning || this.currentMode === 'normal') {
        return;
    }

    this.currentMode = "normal";
    this.drone.speed = 60;
    this.drone.altitude = 100;
    this.altitudeLossStep = 0;
    this.setNewTarget();
  }

  logData() {
    const snapshot = {
      timestamp: new Date().toISOString(),
      coordinates: {
        x: Math.round(this.drone.x),
        y: Math.round(this.drone.y),
      },
      altitude: Math.round(this.drone.altitude),
      speed: Math.round(this.drone.speed),
      direction: Math.round(this.drone.direction),
      battery: Math.round(this.drone.battery),
      status: this.drone.status,
      mode: this.currentMode,
    };

    this.dataHistory.unshift(snapshot);
  }

  getCurrentData() {
    return { 
      timestamp: new Date().toISOString(), 
      coordinates: { x: Math.round(this.drone.x), y: Math.round(this.drone.y) },
      altitude: Math.round(this.drone.altitude),
      speed: Math.round(this.drone.speed),
      direction: Math.round(this.drone.direction),
      battery: Math.round(this.drone.battery),
      status: this.drone.status,
      mode: this.currentMode
    };
  }

  getHistoricalData(limit = 20) {
    return this.dataHistory;
  }

  reset() {
    this.isRunning = false;
    
    this.drone = { 
      x: 50,
      y: 200,
      altitude: 100,
      speed: 60,
      direction: 0,
      targetX: 550,
      targetY: 200,
      status: "Beklemede",
      battery: 100,
    };

    this.currentMode = "normal";
    this.dataHistory = [];
    this.altitudeLossStep = 0;
  }

  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    if (this.drone.battery >= 10) {
       this.drone.status = "Uçuşta";
    } else {
       this.drone.status = "Düşük Batarya";
    }
  }

  stop() {
    if (!this.isRunning) return;
    
    this.isRunning = false;
    this.drone.status = "Durduruldu";
    this.drone.speed = 0;
    this.currentMode = "normal";
    this.logData();
  }
}
