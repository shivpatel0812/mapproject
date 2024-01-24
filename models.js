// Base class for map activities
export class MapSetup {
    constructor(coords, distance, duration) {
      this.coords = coords; // [lat, lng]
      this.distance = distance;
      this.duration = duration;
      // Add other shared properties or methods
    }
  
    // Common method for all map activities
    toFirestore() {
      return {
        coords: this.coords,
        distance: this.distance,
        duration: this.duration,
        // Add other properties to store in Firestore
      };
    }
  
    // Add more methods as needed
  }
  
  // Running class, extends MapSetup
  export class Running extends MapSetup {
    constructor(coords, distance, duration, cadence) {
      super(coords, distance, duration);
      this.cadence = cadence;
      this.calcPace();
    }
  
    calcPace() {
      this.pace = this.duration / this.distance; // Adjust calculation as needed
      return this.pace;
    }
  
    toFirestore() {
      return {
        ...super.toFirestore(),
        cadence: this.cadence,
        pace: this.pace,
        type: 'Running',
      };
    }
  }
  
  // Cycling class, extends MapSetup
  export class Cycling extends MapSetup {
    constructor(coords, distance, duration, elevationGain) {
      super(coords, distance, duration);
      this.elevationGain = elevationGain;
      this.calcSpeed();
    }
  
    calcSpeed() {
      this.speed = this.distance / (this.distance / 60); // Adjust calculation as needed
      return this.speed;
    }
  
    toFirestore() {
      return {
        ...super.toFirestore(),
        elevationGain: this.elevationGain,
        speed: this.speed,
        type: 'Cycling',
      };
    }
  }
  