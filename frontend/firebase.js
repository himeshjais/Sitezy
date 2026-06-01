// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // written by me 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "zion-ai-271c5.firebaseapp.com",
  projectId: "zion-ai-271c5",
  storageBucket: "zion-ai-271c5.firebasestorage.app",
  messagingSenderId: "492840742223",
  appId: "1:492840742223:web:a5d3c73db6d97de476e93a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// above code was copied from the site 
// now below is written by me 

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider}
