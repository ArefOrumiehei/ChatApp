// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDe4C8SsecNmPHyxq2AbVkM11T5TmYxLkM",
    authDomain: "chat-c4b0d.firebaseapp.com",
    projectId: "chat-c4b0d",
    storageBucket: "chat-c4b0d.appspot.com",
    messagingSenderId: "97235152371",
    appId: "1:97235152371:web:9e880a7255a271d7f13686"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore()