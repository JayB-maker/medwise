// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import dotenv from 'dotenv';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// dotenv.config();

const firebaseConfig = {
  apiKey: "AIzaSyBFZjAo-ejBTz2aT5iKRhWR01k_3VInLZg",
  authDomain: "medwise-2eafa.firebaseapp.com",
  projectId: "medwise-2eafa",
  storageBucket: "medwise-2eafa.appspot.com",
  messagingSenderId: "209015060979",
  appId: "1:209015060979:web:f2e937ed2476b3da847a86",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
