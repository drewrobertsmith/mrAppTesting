import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";

// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCX-6hPWFayQzXRCGTIMBLCG9LGfOddPd0",
  authDomain: "moody-radio-drs-testing.firebaseapp.com",
  databaseURL: "https://moody-radio-drs-testing-default-rtdb.firebaseio.com",
  projectId: "moody-radio-drs-testing",
  storageBucket: "moody-radio-drs-testing.appspot.com",
  messagingSenderId: "185501910646",
  appId: "1:185501910646:web:aa662956357aceb4328157",
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
//Initialize Auth
const auth = getAuth(app);
//Initialize Realtime database
const db = getDatabase(app);

export const loginRequest = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const registerRequest = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);
