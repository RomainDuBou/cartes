import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCcFZFeN-uSpXIWgsg8p4rhxZv_F-sVYPw",
  authDomain: "geanbresilien.firebaseapp.com",
  projectId: "geanbresilien",
  storageBucket: "geanbresilien.firebasestorage.app",
  messagingSenderId: "691843324614",
  appId: "1:691843324614:web:574916fc6908ab420d15c7",
  measurementId: "G-L3ZEFX1T22"
}

// Initialiser Firebase
const app = initializeApp(firebaseConfig)

// Initialiser Firestore (la base de données)
export const db = getFirestore(app)

export default app
