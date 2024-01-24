
// import { months } from './utility.js';

// let map, mapEvent;

// export class mapsetup {
//   date = new Date();
//   id = (Date.now() + '').slice(-10);
//   clicks = 0;

//   constructor(coords, distance, duration) {
//     this.coords = coords; // [lat, lng]
//     this.distance = distance;
//     this.duration = duration;

//     // this._setDescription();
//   }
//   _setDescription() {
//     //prettier-ignore
//     containermap.addEventListener('click', this._moveToPopup);
//     const months = [
//       'January',
//       'February',
//       'March',
//       'April',
//       'May',
//       'June',
//       'July',
//       'August',
//       'September',
//       'October',
//       'November',
//       'December',
//     ];

//     this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
//       months[this.date.getMonth()]
//     } ${this.date.getDate()}`;
//   }
//   click() {
//     this.clicks++;
//   }
//   _toFirestore() {
//     return {
//       date: this.date,
//       id: this.id,
//       clicks: this.clicks,
//       coords: this.coords,
//       distance: this.distance,
//       duration: this.duration,
//     };
//   }
// }
// export class Running extends mapsetup {
//   type = 'Running';
//   constructor(coords, distance, duration, cadence) {
//     super(coords, distance, duration);
//     this.cadence = cadence;
//     this.calcPace();
//     this._setDescription();
//   }

//   calcPace() {
//     this.pace = this.duration / this.distance;
//     return this.pace;
//   }
//   _toFirestore() {
//     return {
//       ...super._toFirestore(),
//       cadence: this.cadence,
//       pace: this.pace,
//       type: this.type,
//     };
//   }
// }

// export class Cycling extends mapsetup {
//   type = 'cycling';
//   constructor(coords, distance, duration, elevationGain) {
//     super(coords, distance, duration);
//     this.elevationGain = elevationGain;
//     this.calcSpeed();
//     this._setDescription();
//   }
//   calcSpeed() {
//     this.speed = this.distance / (this.distance / 60);
//     return this.speed;
//   }
//   _toFirestore() {
//     return {
//       ...super._toFirestore(),
//       elevationGain: this.elevationGain,
//       speed: this.speed,
//       type: this.type,
//       // include other properties relevant for Firestore
//     };
//   }
// }

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);

// console.log(run1, cycling1);