import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Sign in with Google
export const signInWithGoogle = async (): Promise<User | null> => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    hd: 'wisc.edu',
  });

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (user && user.email?.endsWith('.edu')) {
      console.log('Sign-in with Google successful');

      // Extract the university name from the email
      const universityName = user.email.split('@')[1].split('.edu')[0];

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        displayName: user.displayName,
        email: user.email,
        universityName,
      });

      return user;
    } else {
      console.error('Only .edu email addresses are allowed');
      throw new Error('Only .edu email addresses are allowed');
    }
  } catch (error: any) {
    if (error.code === 'auth/popup-closed-by-user') {
      console.log('Sign-in with Google canceled by user');
    } else {
      console.error('Error signing in with Google', error);
    }
    throw error;
  }
};

// Sign out
export const signOut = async (): Promise<void> => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error('Error signing out', error);
    throw error;
  }
};

export { auth, db };