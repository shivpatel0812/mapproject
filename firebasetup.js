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



// _setLocalStorage() 
// {
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