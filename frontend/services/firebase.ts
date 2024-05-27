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

export const auth = firebase.auth();

// Sign in with Google
export const signInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    hd: 'example.edu' // Replace with your allowed domain
  });

  try {
    const userCredential = await firebase.auth().signInWithPopup(provider);
    const user = userCredential.user;

    // Check if the user object is not null
    if (user) {
      // Check if the user's email ends with the allowed domain
      if (user.email && user.email.endsWith('.edu')) {
        console.log('Sign-in with Google successful');
        // Proceed with the desired logic (e.g., redirect to another page)
        return user;
      } else {
        console.error('Only .edu email addresses are allowed');
        // Display an error message or take appropriate action
        throw new Error('Only .edu email addresses are allowed');
      }
    } else {
      console.error('Sign-in with Google failed');
      // Display an error message or take appropriate action
      throw new Error('Sign-in with Google failed');
    }
  } catch (error: any) { // or catch (error: Error)
    if (error.code === 'auth/popup-closed-by-user') {
      console.log('Sign-in with Google canceled by user');
    } else {
      console.error('Error signing in with Google', error);
      throw error;
    }
  }
};

export const signOut = async () => {
  try {
    await firebase.auth().signOut();
  } catch (error: any) { // or catch (error: Error)
    console.error('Error signing out', error);
    throw error;
  }
};