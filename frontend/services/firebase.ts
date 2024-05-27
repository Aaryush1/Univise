// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwQ9VgdIi43iVWE5YNGX0dLs2bw5elUWg",
  authDomain: "univise-88ac3.firebaseapp.com",
  projectId: "univise-88ac3",
  storageBucket: "univise-88ac3.appspot.com",
  messagingSenderId: "148953214507",
  appId: "1:148953214507:web:3c1204a8a58f9509e6c46e",
  measurementId: "G-QRK1Y8Y98Z"
};


// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

export const signInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    await firebase.auth().signInWithPopup(provider);
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
};
  
  export const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error("Error signing out", error);
    }
  };