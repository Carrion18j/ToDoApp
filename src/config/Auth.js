import { auth, googleProvider } from "../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const createUser = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log(err);
  }
};

export const sighInWithGoogle = async (e) => {
  e.preventDefault();
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (err) {
    console.log(err);
  }
};

export const signOutFromGoogle = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.log(err);
  }
};
