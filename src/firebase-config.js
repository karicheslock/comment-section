import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeFirestore, CACHE_SIZE_UNLIMITED } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDh6cKg5PfCnk7Fdri84uGqXLPCntLa7hU",
  authDomain: "comment-section-64996.firebaseapp.com",
  projectId: "comment-section-64996",
  storageBucket: "comment-section-64996.appspot.com",
  messagingSenderId: "1055863958040",
  appId: "1:1055863958040:web:a1de59f1c8dea39c2b316d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED
});
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();