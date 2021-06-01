import firebase from 'firebase';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAa1TM9C7nY_h69OZUCvONyYpLXpVRNGnw",
    authDomain: "neuromonia-4c970.firebaseapp.com",
    projectId: "neuromonia-4c970",
    storageBucket: "neuromonia-4c970.appspot.com",
    messagingSenderId: "867914195302",
    appId: "1:867914195302:web:9d0101341fb60b3972e8a7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase };