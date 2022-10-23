import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../";

export const createUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const checkUser = (getUser) => {
  onAuthStateChanged(auth, (currentUser) => getUser(currentUser));
};

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const logoutUser = () => signOut(auth);