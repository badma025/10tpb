// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJrgnAXO0ru2J8BpJBcZrYQPWZIo03AhI",
  authDomain: "x10tpb.firebaseapp.com",
  projectId: "x10tpb",
  storageBucket: "x10tpb.appspot.com",
  messagingSenderId: "889463213248",
  appId: "1:889463213248:web:677a80678957a864347125"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
