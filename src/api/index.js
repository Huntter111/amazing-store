// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCa2uxnJMncTL2rNM-mAaRXgmjNIdtOX8Q",
  authDomain: "amazing-pizza-804d5.firebaseapp.com",
  projectId: "amazing-pizza-804d5",
  storageBucket: "amazing-pizza-804d5.appspot.com",
  messagingSenderId: "968997243018",
  appId: "1:968997243018:web:18c2fd804287e6b0afc573",
  measurementId: "G-XPKSG2BTT6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase auth
export const auth = getAuth(app);
export default app