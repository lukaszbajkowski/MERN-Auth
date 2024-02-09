// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-6f4ae.firebaseapp.com",
  projectId: "mern-auth-6f4ae",
  storageBucket: "mern-auth-6f4ae.appspot.com",
  messagingSenderId: "1017425809004",
  appId: "1:1017425809004:web:01c2c1a4cc2b3929509249",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
