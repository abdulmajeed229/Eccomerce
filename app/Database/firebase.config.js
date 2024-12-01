import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUCuOZhpjKuSlwsLf7ZFPwFEXCDsbTiSA",
  authDomain: "eccomer-64357.firebaseapp.com",
  projectId: "eccomer-64357",
  storageBucket: "eccomer-64357.firebasestorage.app",
  messagingSenderId: "943279482683",
  appId: "1:943279482683:web:570e78534c8bb3e312791e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);