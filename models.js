
export class MapSetup {
    constructor(coords, distance, duration) {
      this.coords = coords; // [lat, lng]
      this.distance = distance;
      this.duration = duration;
      
    }
  
   
    toFirestore() {
      return {
        coords: this.coords,
        distance: this.distance,
        duration: this.duration,
     
      };
    }
  

  }
  

  export class Vacation extends MapSetup {
    constructor(coords, distance, duration, cadence) {
      super(coords, distance, duration);
      this.cadence = cadence;
      this.calcPace();
    }
  
    calcPace() {
      this.pace = this.duration / this.distance;
      return this.pace;
    }
  
    toFirestore() {
      return {
        ...super.toFirestore(),
        cadence: this.cadence,
        pace: this.pace,
        type: 'Vacation',
      };
    }
  }

  export class Travel extends MapSetup {
    constructor(coords, distance, duration, elevationGain) {
      super(coords, distance, duration);
      this.elevationGain = elevationGain;
      this.calcSpeed();
    }
  
    calcSpeed() {
      this.speed = this.distance / (this.distance / 60);
      return this.speed;
    }
  
    toFirestore() {
      return {
        ...super.toFirestore(),
        elevationGain: this.elevationGain,
        speed: this.speed,
        type: 'Travel',
      };
    }
  }
  