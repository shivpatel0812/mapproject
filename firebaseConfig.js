// Firebase configuration
// Add your Firebase configuration details here
const firebaseConfig = {
  // Your Firebase Config
};

export default firebaseConfig;


class firebaseUtils {
  #maparray = [];

  constructor() {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Firestore database
    this.db = firebase.firestore();
  }

  async setLocalStorage(maparray) {
    maparray.forEach(async (mapset) => {
      const mapdata = mapset.toFirestore(); // Convert to plain object
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
      const mapdata = mapset._toFirestore(); // Convert to plain object
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
        if (data.type === 'Running') {
          mapset = new Running(
            data.coords,
            data.distance,
            data.duration,
            data.cadence
          );
        } else if (data.type === 'Cycling') {
          mapset = new Cycling(
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
