import { initializeApp } from "firebase/app";
//import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBqMbwB24v7HXP5J7jcjhl67wHT49HTHmQ",
    authDomain: "scenario2-847bf.firebaseapp.com",
    projectId: "scenario2-847bf",
    storageBucket: "scenario2-847bf.appspot.com",
    messagingSenderId: "777064844449",
    appId: "1:777064844449:web:582aa2e88077d3a2ef34e0"
};

//firebase.initializeApp(firebaseConfig);

//export const db = firebase.firestore();

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };