// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_DWsqJO6-c3H-FFQTMb5fV7Y3_z6RaVY",
  authDomain: "registeration-system-project.firebaseapp.com",
  projectId: "registeration-system-project",
  storageBucket: "registeration-system-project.appspot.com",
  messagingSenderId: "345871553806",
  appId: "1:345871553806:web:a800d12d1359372bc8b35f",
  measurementId: "G-V66NPXNHF6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log("analytics", analytics);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const storage = getStorage(app);
