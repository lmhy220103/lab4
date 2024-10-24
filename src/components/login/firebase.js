// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPkhWZBO49BQG603nL2wOznn1xurO3vHY",
  authDomain: "orch-5d77d.firebaseapp.com",
  projectId: "orch-5d77d",
  storageBucket: "orch-5d77d.appspot.com",
  messagingSenderId: "1030635015801",
  appId: "1:1030635015801:web:7338c84328868ab8ee8ea8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
