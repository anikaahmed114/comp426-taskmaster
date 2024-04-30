import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyAGlAzEM4OWhQ5UNWJlYQoKJ2Tc7tDtA18",
    authDomain: "comp426-final-1690b.firebaseapp.com",
    projectId: "comp426-final-1690b",
    storageBucket: "comp426-final-1690b.appspot.com",
    messagingSenderId: "632172303747",
    appId: "1:632172303747:web:4f596d220ad53f73f352b6",
    measurementId: "G-S26KLC84RY"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to sign in
const doSignInWithEmailAndPassword = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export { auth, doSignInWithEmailAndPassword };