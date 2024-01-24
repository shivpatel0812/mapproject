// Firebase storage utility functions
export const firebaseStorageUtils = {
    async uploadFile(file) {
      try {
        // Create a storage reference in Firebase
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(`images/${file.name}`);
  
        // Upload the file
        await fileRef.put(file);
  
        // After the upload is complete, get the download URL
        return await fileRef.getDownloadURL();
      } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
      }
    }
  };