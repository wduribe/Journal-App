
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore  } from 'firebase/firestore/lite';
import { getEnvVariables } from "../helpers/getEnvVariable";
// TODO: Add SDKs for Firebase products that you want to use
const { VITE_API_KEY, VITE_AUTH_DOMAIN, VITE_PROJECT_ID, VITE_STORAGE_BUCKET, VITE_MESSAGING_SENDER_ID, VITE_APP_ID } = getEnvVariables();


const firebaseConfig = {
  apiKey: VITE_API_KEY,
  authDomain: VITE_AUTH_DOMAIN,
  projectId: VITE_PROJECT_ID,
  storageBucket: VITE_STORAGE_BUCKET,
  messagingSenderId: VITE_MESSAGING_SENDER_ID,
  appId: VITE_APP_ID,
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );