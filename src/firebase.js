import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyBqiznIvCdDZyWOWdptphKk6V4oku_noYY",
    authDomain: "whatsappclone-937f2.firebaseapp.com",
    projectId: "whatsappclone-937f2",
    storageBucket: "whatsappclone-937f2.appspot.com",
    messagingSenderId: "886906753904",
    appId: "1:886906753904:web:e74d25b08eeb170ca475b5",
    measurementId: "G-ESMNF8S3WE"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider();


  export {auth,provider};
  export default db;