// import { MapUIHandler } from './mapUIHandler.js';

// import { FormHandler } from './formHandler.js';
// import { utils } from './utils.js';
// // import { firebaseUtils } from './firebaseConfig.js';
// // import { MapUIHandler } from './mapUIHandler.js';

// // import { firebaseUtils } from './firebaseConfig.js';


import { MapUIHandler } from './mapUIHandler.js';
import { FormHandler } from './formHandler.js';
import { utils } from './utils.js';
import { firebaseUtils } from './firebaseConfig.js'; // Import firebaseUtils


document.addEventListener('DOMContentLoaded', () => {

  if (firebaseUtils.initialize) { 
    firebaseUtils.initialize();
  }


  const mapHandler = new App();  
  mapHandler.initializeMap();


  const formHandler = new FormHandler('.form-selector');  
  formHandler.setupEventListeners();


  setupOtherComponents();


  console.log('Current date:', utils.formatDate(new Date()));
});

function setupOtherComponents() {
 
}
