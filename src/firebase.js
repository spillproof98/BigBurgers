// src/firebase.js
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPhoneNumber,
  signInWithPopup,
  signInWithEmailAndPassword
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig); // ✅ initializeApp must be exported
const auth = getAuth(app);

export const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const loginWithPhone = (phoneNumber, appVerifier) => {
  return signInWithPhoneNumber(auth, phoneNumber, appVerifier);
};

export const loginEmployee = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export { auth, app }; // ✅ Export app too
