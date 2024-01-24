import { MapUIHandler } from './mapUIHandler.js';
// Assuming this is your map-related class
import { FormHandler } from './formHandler.js';
import { utils } from './utils.js';
import {firestoreUtils} from './firebaseConfig.js';  // Import Firebase utilities
// import { MapUIHandler } from './mapUIHandler.js';


document.addEventListener('DOMContentLoaded', () => {
  // Initialize Firebase utilities
  firestoreUtils.initialize();

  // Initialize the map handling
  const mapHandler = new App();  // You'll pass any required parameters here
  mapHandler.initializeMap();

  // Initialize the form handling
  const formHandler = new FormHandler('.form-selector');  // Replace '.form-selector' with your actual form selector
  formHandler.setupEventListeners();

  // Perform any additional setup
  setupOtherComponents();

  // Example utility usage
  console.log('Current date:', utils.formatDate(new Date()));
});

function setupOtherComponents() {
  // Additional setup tasks
  // This could include setting up event listeners, loading data, etc.
}
