// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIdV4rBL8hHkivWXfYaCk6OxDEn8tPHD4",
  authDomain: "marham-c41fc.firebaseapp.com",
  projectId: "marham-c41fc",
  storageBucket: "marham-c41fc.appspot.com",
  messagingSenderId: "404485597335",
  appId: "1:404485597335:web:c04ff233e8207e5014e1d2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
