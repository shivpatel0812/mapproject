

// import { initialize } from './firebaseConfig.js';

const firebaseConfig = {

};

// export default firebaseConfig;


class FirebaseUtils {
  #maparray = [];

  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

   

    // Firestore database
    this.db = firebase.firestore();
    
  }

  async setLocalStorage(maparray) {
    maparray.forEach(async (mapset) => {
      const mapdata = mapset.toFirestore(); 
      try {
        const docRef = await this.db.collection('mapset').add(mapdata);
        console.log('Document written with ID: ', docRef.id);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    });
  }

  _setLocalStorage() {
    const db = firebase.firestore(); // Access Firestore

    this.#maparray.forEach((mapset) => {
      const mapdata = mapset._toFirestore();
      db.collection('mapset')
        .add(mapdata)
        .then((docRef) => console.log('Document written with ID: ', docRef.id))
        .catch((error) => console.error('Error adding document: ', error));
    });
  }

  async _getLocalStorage() {
    const db = firebase.firestore(); // Access Firestore

    try {
      const querySnapshot = await db.collection('mapset').get();
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        let mapset;
        if (data.type === 'Vacation') {
          mapset = new Vacation(
            data.coords,
            data.distance,
            data.duration,
            data.cadence
          );
        } else if (data.type === 'Travel') {
          mapset = new Travel(
            data.coords,
            data.distance,
            data.duration,
            data.elevationGain
          );
        }
        if (mapset) {
          this.#maparray.push(mapset);
          this._rendermap(mapset);
        }
      });
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  }
}


const firebaseUtilsInstance = new FirebaseUtils();
export {  firebaseUtilsInstance as firebaseUtils };