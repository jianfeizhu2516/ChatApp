// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDUlubI2TiqD1GpEgZKrPiPW7pBIPT-r_Q",
  authDomain: "reactchat-7e94f.firebaseapp.com",
  projectId: "reactchat-7e94f",
  storageBucket: "reactchat-7e94f.appspot.com",
  messagingSenderId: "196835829642",
  appId: "1:196835829642:web:a30bd829cff7888fad4a73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();