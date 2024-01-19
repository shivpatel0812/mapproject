const db = firebase.firestore(); // Access Firestore

// Function to get documents
async function getDocs() {
  try {
    const snapshot = await db.collection('MapPicture').get();
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
  } catch (error) {
    console.error('Error getting documents: ', error);
  }
}

getDocs();

('use strict');

// prettier-ignore

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance;
    this.duration = duration;

    // this._setDescription();
  }
  _setDescription() {
    //prettier-ignore
    containerWorkouts.addEventListener('click', this._moveToPopup);
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
  click() {
    this.clicks++;
  }
  _toFirestore() {
    return {
      date: this.date,
      id: this.id,
      clicks: this.clicks,
      coords: this.coords,
      distance: this.distance,
      duration: this.duration,
    };
  }
}
class Running extends Workout {
  type = 'Running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
  _toFirestore() {
    return {
      ...super._toFirestore(),
      cadence: this.cadence,
      pace: this.pace,
      type: this.type,
    };
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }
  calcSpeed() {
    this.speed = this.distance / (this.distance / 60);
    return this.speed;
  }
  _toFirestore() {
    return {
      ...super._toFirestore(),
      elevationGain: this.elevationGain,
      speed: this.speed,
      type: this.type,
      // include other properties relevant for Firestore
    };
  }
}

const run1 = new Running([39, -12], 5.2, 24, 178);
const cycling1 = new Cycling([39, -12], 27, 95, 523);

console.log(run1, cycling1);

class App {
  #map;
  #mapEvent;
  #workouts = [];
  #mapZoomLevel = 13;
  constructor() {
    //get user's position
    this._getPosition();

    //get data from local storage
    this._getLocalStorage();

    //Attach event handlers
    form.addEventListener('submit', this._newWorkout.bind(this));

    inputType.addEventListener('change', function () {});

    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));

    // this._setupEventListeners();

    // this._setupImageUpload();

    // this._displayImagesForWorkout();

    // this._getImagesForWorkout();
  }

  //this key word orginially undefined because it is set as a function call
  //and function call this key word is always undefined
  //adding bind is how you fix
  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        }
      );
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    // console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    if (!this.#map) {
      this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.#map);

      // ... other map initialization code ...
    } else {
      this.#map.setView(coords, this.#mapZoomLevel);
    }

    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  // In the constructor or initialization method

  _showForm(mapE) {
    console.log('Map clicked:', mapE);
    this.#mapEvent = mapE;
    // Enable the form submit button here
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    form.style.display = 'none';
    form.classList.add('hidden');

    //run a function after certain amount of time has passed
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationFields() {
    inputElevation.closest('.form_row').classList.toggle('form_row--hidden');
    inputCadence.closest('.form_row').classList.toggle('form_row--hidden');
  }

  _newWorkout(e) {
    // e.preventDefault();

    // Check if mapEvent is defined
    // if (!this.#mapEvent || !this.#mapEvent.latlng) {
    //   alert('Please select a location on the map.');
    //   return;
    // }

    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));

    const allPositive = (...inputs) => inputs.every(inp => inp > 0);
    e.preventDefault();
    if (!this.#mapEvent) {
      // alert('Please select a location on the map first.');
      return;
    }
    //get data from form

    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;

    let workout;

    //check if data is valid

    //if workout running, create running object

    if (type == 'running') {
      const cadence = +inputCadence.value;

      //check if data is valid
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs have to be postive numbers!');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    //if working cycling, create cycling object
    if (type == 'cycling') {
      const elevation = +inputElevation.value;

      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('inputs have to be postive numbers!');
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    //Add new object to the workout array
    this.#workouts.push(workout);
    console.log(workout);

    //Render workout on map as marker
    this._renderWorkoutMarker(workout);

    //render workout on list
    this._renderWorkout(workout);

    //hide form + Clear input fields
    this._hideForm();

    //set local storage to all workouts

    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    // const workoutType = workout instanceof Running ? 'running' : 'cycling';

    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(`${'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`)
      .openPopup();
  }
  _renderWorkout(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${
            workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
          }</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
    `;

    if (workout.type === 'running')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>
      `;

    if (workout.type === 'cycling')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>
      `;

    form.insertAdjacentHTML('afterend', html);
  }
  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');
    console.log('this is the workoutEL', workoutEl);

    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );
    console.log('This is the workout', workout);

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    //SET AND GET FOR LOCAL

    //Using the public interface
    // workout.click();
  }
  // _setLocalStorage() {
  //   localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  // }

  // _getLocalStorage() {
  //   const data = JSON.parse(localStorage.getItem('workouts'));

  //   if (!data) return;

  //   this.#workouts = data;

  //   this.#workouts.forEach(work => {
  //     this._renderWorkout(work);
  //   });
  // }

  //SET AND GET FOR FIREBASE

  // _setLocalStorage() {
  //   this.#workouts.forEach(workout => {
  //     addDoc(collection(db, 'workouts'), workout)
  //       .then(docRef => console.log('Document written with ID: ', docRef.id))
  //       .catch(error => console.error('Error adding document: ', error));
  //   });
  // }

  // async _getLocalStorage() {
  //   const querySnapshot = await firebase
  //     .firestore()
  //     .collection('workouts')
  //     .get();
  //   querySnapshot.forEach(doc => {
  //     this.#workouts.push(doc.data());
  //     this._renderWorkout(doc.data());
  //   });
  // }

  _setLocalStorage() {
    const db = firebase.firestore(); // Access Firestore

    this.#workouts.forEach(workout => {
      const workoutData = workout._toFirestore(); // Convert to plain object
      db.collection('workouts')
        .add(workoutData)
        .then(docRef => console.log('Document written with ID: ', docRef.id))
        .catch(error => console.error('Error adding document: ', error));
    });
  }

  async _getLocalStorage() {
    const db = firebase.firestore(); // Access Firestore

    try {
      const querySnapshot = await db.collection('workouts').get();
      querySnapshot.forEach(doc => {
        const data = doc.data();
        let workout;
        if (data.type === 'Running') {
          workout = new Running(
            data.coords,
            data.distance,
            data.duration,
            data.cadence
          );
        } else if (data.type === 'Cycling') {
          workout = new Cycling(
            data.coords,
            data.distance,
            data.duration,
            data.elevationGain
          );
        }
        if (workout) {
          this.#workouts.push(workout);
          this._renderWorkout(workout);
        }
      });
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  }

  //Image uploading code

  // _setupEventListeners() {
  //   document
  //     .getElementById('image-upload-form')
  //     .addEventListener('submit', async event => {
  //       event.preventDefault();
  //       const fileInput = document.getElementById('image-upload-input');
  //       const file = fileInput.files[0];

  //       if (file) {
  //         try {
  //           const storageRef = firebase.storage().ref();
  //           const fileRef = storageRef.child('images/' + file.name);
  //           await fileRef.put(file);
  //           const fileUrl = await fileRef.getDownloadURL();

  //           const img = document.createElement('img');
  //           img.src = fileUrl;
  //           document.getElementById('image-display-area').appendChild(img);
  //         } catch (error) {
  //           console.error('Error uploading file:', error);
  //         }
  //       }
  //     });
  // }

  // _setupImageUpload() {
  //   document
  //     .getElementById('image-upload-form')
  //     .addEventListener('submit', function (event) {
  //       event.preventDefault();
  //       const fileInput = document.getElementById('image-upload-input');
  //       const file = fileInput.files[0];

  //       if (file) {
  //         const reader = new FileReader();
  //         reader.onload = function (e) {
  //           const img = document.createElement('img');
  //           img.src = e.target.result;
  //           document.getElementById('image-display-area').appendChild(img);
  //         };
  //         reader.readAsDataURL(file);
  //       }
  //     });
  // }

  // async displayImagesForWorkout(workoutId) {
  //   const imageURLs = await this.getImagesForWorkout(workoutId);
  //   const imageDisplayArea = document.getElementById('image-display-area');
  //   imageDisplayArea.innerHTML = ''; // Clear existing images

  //   imageURLs.forEach(url => {
  //     const img = document.createElement('img');
  //     img.src = url;
  //     imageDisplayArea.appendChild(img);
  //   });
  // }

  // async getImagesForWorkout(workoutId) {
  //   // Fetch image URLs from your database or storage based on workoutId
  //   // This needs to be implemented
  //   return []; // Should return an array of image URLs
  // }

  // _renderWorkoutMarker(workout) {
  //   L.marker(workout.coords)
  //     .addTo(this.#map)
  //     .bindPopup(
  //       L.popup({
  //         maxWidth: 250,
  //         minWidth: 100,
  //         autoClose: false,
  //         closeOnClick: false,
  //         className: `${workout.type}-popup`,
  //       })
  //     )
  //     .setPopupContent(
  //       document.getElementById('image-upload-section').innerHTML
  //     )
  //     .openPopup();
  // }

  // Call this function when a pin is clicked, passing the workout's ID

  _getImageUploadFormHtml() {
    // Ensure that your image upload form HTML is correct and includes all necessary input fields and buttons.
    return `
      <form id="image-upload-form">
        <input type="file" id="image-upload-input" accept="image/*" />
        <button type="submit">Upload</button>
      </form>
      <div id="image-display-area"></div>
    `;
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: true, // This allows the popup to close if another popup is opened
          closeOnClick: true, // This allows the popup to close if the map is clicked
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        this._getImageUploadFormHtml() + `${workout.description}`
      )
      .on('popupopen', e => {
        // When the popup is opened, you can initialize the form and setup event listeners
        this._setupEventListeners();
      })
      .on('popupclose', e => {
        // Cleanup if needed when the popup is closed
      });
  }

  _setupEventListeners() {
    document.addEventListener('submit', async function (event) {
      if (event.target.matches('#image-upload-form')) {
        event.preventDefault();
        const fileInput = event.target.querySelector('#image-upload-input');
        const file = fileInput.files[0];

        if (file) {
          try {
            // Create a storage reference in Firebase
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(`images/${file.name}`);

            // Upload the file
            await fileRef.put(file);

            // After the upload is complete, get the download URL
            const fileUrl = await fileRef.getDownloadURL();

            // Here, you can now set the image URL to your state, display it in the UI, or save it to Firestore
            // For example, to display the image in the 'image-display-area' div:
            const imageDisplayArea =
              document.getElementById('image-display-area');
            const img = document.createElement('img');
            img.src = fileUrl;
            imageDisplayArea.appendChild(img);

            // If you need to associate the image with a workout, you can do so by storing the URL in Firestore
            // along with the workout details.

            // Clear the input after upload
            fileInput.value = '';

            // Optionally, display a success message to the user
            alert('Image uploaded successfully!');
          } catch (error) {
            // Handle any errors here
            console.error('Error uploading file:', error);
            alert('There was a problem uploading the image.');
          }
        } else {
          // If no file was selected, inform the user
          alert('Please select a file to upload.');
        }
      }
    });
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}
// After a resize or layout change that affects the map container

document.addEventListener('DOMContentLoaded', function () {
  const app = new App();
});
