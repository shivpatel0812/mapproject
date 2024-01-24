
// import { MapUIHandler } from './mapUIHandler.js';


export class MapUIHandler {
  constructor(map) {
    this.map = map;
    this.setupEventListeners();
  }

  getImageUploadFormHtml() {
    return `
      <form id="image-upload-form">
        <input type="file" id="image-upload-input" accept="image/*" />
        <button type="submit">Upload</button>
      </form>
      <div id="image-display-area"></div>
    `;
  }

  renderMapMarker(mapset) {
    L.marker(mapset.coords)
      .addTo(this.map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: true, // This allows the popup to close if another popup is opened
          closeOnClick: true, // This allows the popup to close if the map is clicked
          className: `${mapset.type}-popup`,
        })
      )
      .setPopupContent(
        this.getImageUploadFormHtml() + `${mapset.description}`
      )
      .on('popupopen', e => {
        // Initialize the form and setup event listeners when the popup is opened
      })
      .on('popupclose', e => {
        // Cleanup if needed when the popup is closed
      });
  }

  setupEventListeners() {
    document.addEventListener('submit', async function (event) {
      if (event.target.matches('#image-upload-form')) {
        event.preventDefault();
        const fileInput = event.target.querySelector('#image-upload-input');
        const file = fileInput.files[0];

        if (file) {
          try {
            // Upload the file using Firebase storage utility
            const fileUrl = await firebaseStorageUtils.uploadFile(file);

            // Display the image in the 'image-display-area' div
            const imageDisplayArea = document.getElementById('image-display-area');
            const img = document.createElement('img');
            img.src = fileUrl;
            imageDisplayArea.appendChild(img);

            // Clear the input after upload
            fileInput.value = '';

            alert('Image uploaded successfully!');
          } catch (error) {
            console.error('Error uploading file:', error);
            alert('There was a problem uploading the image.');
          }
        } else {
          alert('Please select a file to upload.');
        }
      }
    });
  }
}
