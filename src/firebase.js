// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqMbwB24v7HXP5J7jcjhl67wHT49HTHmQ",
  authDomain: "scenario2-847bf.firebaseapp.com",
  projectId: "scenario2-847bf",
  storageBucket: "scenario2-847bf.appspot.com",
  messagingSenderId: "777064844449",
  appId: "1:777064844449:web:582aa2e88077d3a2ef34e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();
