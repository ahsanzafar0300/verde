import { auth } from "./config";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithRedirect,
  signOut,
} from "@firebase/auth";

export const googleSignIn = () => {
  const googleprovider = new GoogleAuthProvider();
  signInWithRedirect(auth, googleprovider);
};

export const facebookSignIn = () => {
  const facebookprovider = new FacebookAuthProvider();
  signInWithRedirect(auth, facebookprovider);
};

export const logOut = () => {
  signOut(auth);
};
