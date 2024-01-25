
export const firebaseStorageUtils = {
    async uploadFile(file) {
      try {
    
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(`images/${file.name}`);
  
     
        await fileRef.put(file);
  

        return await fileRef.getDownloadURL();
      } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
      }
    }
  };