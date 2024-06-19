import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import 'firebase/auth';
import { getFirestore, doc, setDoc } from "firebase/firestore";

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
} else {
  firebase.app();
}

// Initialize Firestore
const db = getFirestore();

export const auth = firebase.auth();

// Sign in with Google
export const signInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    hd: 'wisc.edu' // Replace with your allowed domain
  });

  try {
    const userCredential = await firebase.auth().signInWithPopup(provider);
    const user = userCredential.user;

    if (user) {
      const displayName = user.displayName;
      const email = user.email;
      const uid = user.uid;

      if (user.email && user.email.endsWith('.edu')) {
        console.log('Sign-in with Google successful');

        // Extract the university name from the email
        const universityName = user.email.split('@')[1].split('.edu')[0];

        // Save user data to Firestore
        await setDoc(doc(db, "users", uid), {
          displayName,
          email,
          universityName,
        });

        return user;
      } else {
        console.error('Only .edu email addresses are allowed');
        throw new Error('Only .edu email addresses are allowed');
      }
    } else {
      console.error('Sign-in with Google failed');
      throw new Error('Sign-in with Google failed');
    }
  } catch (error: any) {
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
  } catch (error: any) {
    console.error('Error signing out', error);
    throw error;
  }
};

export default firebaseConfig;