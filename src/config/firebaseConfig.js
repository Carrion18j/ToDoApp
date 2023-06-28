import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCj-iCmJMKS9TmurxaSOZCTG1sj05GJFvc",
  authDomain: "todotasksapp-62328.firebaseapp.com",
  projectId: "todotasksapp-62328",
  storageBucket: "todotasksapp-62328.appspot.com",
  messagingSenderId: "754050455259",
  appId: "1:754050455259:web:fc717451d1ca9efd8edefe",
  measurementId: "G-BF7SS8YC3X",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)
