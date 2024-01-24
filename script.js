// const db = firebase.firestore(); // Access Firestore

// // Function to get documents
// async function getDocs() {
//   try {
//     const snapshot = await db.collection('MapPicture').get();
//     snapshot.forEach(doc => {
//       console.log(doc.id, '=>', doc.data());
//     });
//   } catch (error) {
//     console.error('Error getting documents: ', error);
//   }
// }

// getDocs();

// ('use strict');

// // prettier-ignore

// const months = [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
//   'July',
//   'August',
//   'September',
//   'October',
//   'November',
//   'December',
// ];

// const form = document.querySelector('.form');
// const containermap = document.querySelector('.mapsetup');
// const inputType = document.querySelector('.form__input--type');
// const inputDistance = document.querySelector('.form__input--distance');
// const inputDuration = document.querySelector('.form__input--duration');
// const inputCadence = document.querySelector('.form__input--cadence');
// const inputElevation = document.querySelector('.form__input--elevation');

// let map, mapEvent;

// class mapsetup {
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
// class Running extends mapsetup {
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

// class Cycling extends mapsetup {
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

// class App {
//   #map;
//   #mapEvent;
//   #maparray = [];
//   #mapZoomLevel = 13;
//   constructor() {
//     //get user's position
//     this._getPosition();

//     //get data from local storage
//     this._getLocalStorage();

//     //Attach event handlers
//     form.addEventListener('submit', this._newmap.bind(this));

//     inputType.addEventListener('change', function () {});

//     containermap.addEventListener('click', this._moveToPopup.bind(this));

//     // this._setupEventListeners();

//     // this._setupImageUpload();

//     // this._displayImagesForWorkout();

//     // this._getImagesForWorkout();
//   }

//   //this key word orginially undefined because it is set as a function call
//   //and function call this key word is always undefined
//   //adding bind is how you fix
//   _getPosition() {
//     if (navigator.geolocation)
//       navigator.geolocation.getCurrentPosition(
//         this._loadMap.bind(this),
//         function () {
//           alert('Could not get your position');
//         }
//       );
//   }

//   _loadMap(position) {
//     const { latitude } = position.coords;
//     const { longitude } = position.coords;
//     // console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);

//     const coords = [latitude, longitude];

//     if (!this.#map) {
//       this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
//       L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }).addTo(this.#map);

//       // ... other map initialization code ...
//     } else {
//       this.#map.setView(coords, this.#mapZoomLevel);
//     }

//     // Handling clicks on map
//     this.#map.on('click', this._showForm.bind(this));

//     this.#maparray.forEach(map => {
//       this._rendermapMarker(map);
//     });
//   }

//   // In the constructor or initialization method

//   _showForm(mapE) {
//     console.log('Map clicked:', mapE);
//     this.#mapEvent = mapE;
//     // Enable the form submit button here
//     form.classList.remove('hidden');
//     inputDistance.focus();
//   }

//   _hideForm() {
//     inputDistance.value =
//       inputDuration.value =
//       inputCadence.value =
//       inputElevation.value =
//         '';

//     form.style.display = 'none';
//     form.classList.add('hidden');

//     //run a function after certain amount of time has passed
//     setTimeout(() => (form.style.display = 'grid'), 1000);
//   }

//   _toggleElevationFields() {
//     inputElevation.closest('.form_row').classList.toggle('form_row--hidden');
//     inputCadence.closest('.form_row').classList.toggle('form_row--hidden');
//   }

//   _newmap(e) {
//     // e.preventDefault();

//     // Check if mapEvent is defined
//     // if (!this.#mapEvent || !this.#mapEvent.latlng) {
//     //   alert('Please select a location on the map.');
//     //   return;
//     // }

//     const validInputs = (...inputs) =>
//       inputs.every(inp => Number.isFinite(inp));

//     const allPositive = (...inputs) => inputs.every(inp => inp > 0);
//     e.preventDefault();
//     if (!this.#mapEvent) {
//       // alert('Please select a location on the map first.');
//       return;
//     }
//     //get data from form

//     const type = inputType.value;
//     const distance = +inputDistance.value;
//     const duration = +inputDuration.value;
//     const { lat, lng } = this.#mapEvent.latlng;

//     let mapset;

//     //check if data is valid

//     //if workout running, create running object

//     if (type == 'running') {
//       const cadence = +inputCadence.value;

//       //check if data is valid
//       if (
//         // !Number.isFinite(distance) ||
//         // !Number.isFinite(duration) ||
//         // !Number.isFinite(cadence)
//         !validInputs(distance, duration, cadence) ||
//         !allPositive(distance, duration, cadence)
//       )
//         return alert('Inputs have to be postive numbers!');

//       mapset = new Running([lat, lng], distance, duration, cadence);
//     }

//     //if working cycling, create cycling object
//     if (type == 'cycling') {
//       const elevation = +inputElevation.value;

//       if (
//         !validInputs(distance, duration, elevation) ||
//         !allPositive(distance, duration)
//       )
//         return alert('inputs have to be postive numbers!');
//       mapset = new Cycling([lat, lng], distance, duration, elevation);
//     }

//     //Add new object to the map array
//     this.#maparray.push(mapset);
//     console.log(mapset);

//     //Render point on map as marker
//     this._rendermapMarker(mapset);

//     //render point on list
//     this._rendermap(mapset);

//     //hide form + Clear input fields
//     this._hideForm();

//     //set local storage to all cordinates of map

//     this._setLocalStorage();
//   }

//   _rendermapMarker(mapset) {


//     L.marker(mapset.coords)
//       .addTo(this.#map)
//       .bindPopup(
//         L.popup({
//           maxWidth: 250,
//           minWidth: 100,
//           autoClose: false,
//           closeOnClick: false,
//           className: `${mapset.type}-popup`,
//         })
//       )
//       .setPopupContent(`${'running' ? '🏃‍♂️' : '🚴‍♀️'} ${mapset.description}`)
//       .openPopup();
//   }
//   _rendermap(mapset) {
//     let html = `
//       <li class="mapset mapset--${mapset.type}" data-id="${mapset.id}">
//         <h2 class="mapset">${mapset.description}</h2>
//         <div class="mapset">
//           <span class="mapset">${
//             mapset.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
//           }</span>
//           <span class="mapset__value">${mapset.distance}</span>
//           <span class="mapset__unit">km</span>
//         </div>
//         <div class="mapset__details">
//           <span class="mapset__icon">⏱</span>
//           <span class="mapset__value">${mapset.duration}</span>
//           <span class="mapset__unit">min</span>
//         </div>
//     `;

//     if (mapset.type === 'running')
//       html += `
//         <div class="mapset__details">
//           <span class="mapset__icon">⚡️</span>
//           <span class="mapset__value">${mapset.pace.toFixed(1)}</span>
//           <span class="mapset__unit">min/km</span>
//         </div>
//         <div class="mapset__details">
//           <span class="mapset__icon">🦶🏼</span>
//           <span class="mapset__value">${mapset.cadence}</span>
//           <span class="mapset__unit">spm</span>
//         </div>
//       </li>
//       `;

//     if (mapset.type === 'cycling')
//       html += `
//         <div class="mapset__details">
//           <span class="mapset__icon">⚡️</span>
//           <span class="mapset__value">${mapset.speed.toFixed(1)}</span>
//           <span class="mapset__unit">km/h</span>
//         </div>
//         <div class="mapset__details">
//           <span class="mapset__icon">⛰</span>
//           <span class="mapset__value">${mapset.elevationGain}</span>
//           <span class="mapset__unit">m</span>
//         </div>
//       </li>
//       `;

//     form.insertAdjacentHTML('afterend', html);
//   }
//   _moveToPopup(e) {
//     const mapEl = e.target.closest('.mapset');
//     console.log('this is the mapEl', mapEl);

//     if (!mapEl) return;

//     const mapset = this.#maparray.find(
//       map => map.id === mapEl.dataset.id
//     );
//     console.log('This is the mapsetup', mapset);

//     this.#map.setView(mapset.coords, this.#mapZoomLevel, {
//       animate: true,
//       pan: {
//         duration: 1,
//       },
//     });

//     //SET AND GET FOR LOCAL

//   }


//   _setLocalStorage() {
//     const db = firebase.firestore(); // Access Firestore

//     this.#maparray.forEach(mapset => {
//       const mapdata = mapset._toFirestore(); // Convert to plain object
//       db.collection('mapset')
//         .add(mapdatacol)
//         .then(docRef => console.log('Document written with ID: ', docRef.id))
//         .catch(error => console.error('Error adding document: ', error));
//     });
//   }

//   async _getLocalStorage() {
//     const db = firebase.firestore(); // Access Firestore

//     try {
//       const querySnapshot = await db.collection('mapset').get();
//       querySnapshot.forEach(doc => {
//         const data = doc.data();
//         let mapset;
//         if (data.type === 'Running') {
//           mapset = new Running(
//             data.coords,
//             data.distance,
//             data.duration,
//             data.cadence
//           );
//         } else if (data.type === 'Cycling') {
//           mapset = new Cycling(
//             data.coords,
//             data.distance,
//             data.duration,
//             data.elevationGain
//           );
//         }
//         if (mapset) {
//           this.#maparray.push(mapset);
//           this._rendermap(mapset);
//         }
//       });
//     } catch (error) {
//       console.error('Error getting documents: ', error);
//     }
//   }


//   // Call this function when a pin is clicked, passing the mappoiont's ID

//   _getImageUploadFormHtml() {
//     // Ensure that your image upload form HTML is correct and includes all necessary input fields and buttons.
//     return `
//       <form id="image-upload-form">
//         <input type="file" id="image-upload-input" accept="image/*" />
//         <button type="submit">Upload</button>
//       </form>
//       <div id="image-display-area"></div>
//     `;
//   }

//   _rendermapMarker(mapset) {
//     L.marker(mapset.coords)
//       .addTo(this.#map)
//       .bindPopup(
//         L.popup({
//           maxWidth: 250,
//           minWidth: 100,
//           autoClose: true, // This allows the popup to close if another popup is opened
//           closeOnClick: true, // This allows the popup to close if the map is clicked
//           className: `${mapset.type}-popup`,
//         })
//       )
//       .setPopupContent(
//         this._getImageUploadFormHtml() + `${mapset.description}`
//       )
//       .on('popupopen', e => {
//         // When the popup is opened, you can initialize the form and setup event listeners
//         this._setupEventListeners();
//       })
//       .on('popupclose', e => {
//         // Cleanup if needed when the popup is closed
//       });
//   }

//   _setupEventListeners() {
//     document.addEventListener('submit', async function (event) {
//       if (event.target.matches('#image-upload-form')) {
//         event.preventDefault();
//         const fileInput = event.target.querySelector('#image-upload-input');
//         const file = fileInput.files[0];

//         if (file) {
//           try {
//             // Create a storage reference in Firebase
//             const storageRef = firebase.storage().ref();
//             const fileRef = storageRef.child(`images/${file.name}`);

//             // Upload the file
//             await fileRef.put(file);

//             // After the upload is complete, get the download URL
//             const fileUrl = await fileRef.getDownloadURL();

//             // Here, you can now set the image URL to your state, display it in the UI, or save it to Firestore
//             // For example, to display the image in the 'image-display-area' div:
//             const imageDisplayArea =
//               document.getElementById('image-display-area');
//             const img = document.createElement('img');
//             img.src = fileUrl;
//             imageDisplayArea.appendChild(img);

//             // If you need to associate the image with a mappoint, you can do so by storing the URL in Firestore
//             // along with the mappoint details.

//             // Clear the input after upload
//             fileInput.value = '';

//             // Optionally, display a success message to the user
//             alert('Image uploaded successfully!');
//           } catch (error) {
//             // Handle any errors here
//             console.error('Error uploading file:', error);
//             alert('There was a problem uploading the image.');
//           }
//         } else {
//           // If no file was selected, inform the user
//           alert('Please select a file to upload.');
//         }
//       }
//     });
//   }

//   reset() {
//     localStorage.removeItem('mapset');
//     location.reload();
//   }
// }
// // After a resize or layout change that affects the map container

// document.addEventListener('DOMContentLoaded', function () {
//   const app = new App();
// });
