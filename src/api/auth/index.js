import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  updateProfile,
  sendPasswordResetEmail,
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
  return signInWithEmailAndPassword(auth, email, password);
};

export const updateUserProfile = ({ phone, displayName, photoURL }) => {
  const auth = getAuth();
  updateProfile(auth.currentUser, {
    displayName: displayName || null,
    photoURL: photoURL || null,
    phone: phone || null,
  });
};

export const passwordReset = (email) => {
  const auth = getAuth();
  return sendPasswordResetEmail(auth, email);
};

export const logoutUser = () => signOut(auth);
