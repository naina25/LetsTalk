import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyCE0vMDv_Lurqk750oq0ADSxjBQ-BEOjM8",
    authDomain: "letschat-383b0.firebaseapp.com",
    projectId: "letschat-383b0",
    storageBucket: "letschat-383b0.appspot.com",
    messagingSenderId: "917586035608",
    appId: "1:917586035608:web:d59bc8785e75eb0f6121ed",
  })
  .auth();
