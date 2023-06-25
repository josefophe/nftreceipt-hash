import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJNNuAG3-qmBD_3Z1AHOiyvVMyj--1b9U",
  authDomain: "parrot-dcc75.firebaseapp.com",
  databaseURL: "https://parrot-dcc75.firebaseio.com",
  projectId: "parrot-dcc75",
  storageBucket: "parrot-dcc75.appspot.com",
  messagingSenderId: "24022232481",
  appId: "1:24022232481:web:c5239c158330e0d75a2fe0",
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()
