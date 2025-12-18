import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyClCgShs2mYOnVYwnAyOelND3_-SnkvanQ",
  authDomain: "cartes-6aecf.firebaseapp.com",
  databaseURL: "https://cartes-6aecf-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cartes-6aecf",
  storageBucket: "cartes-6aecf.firebasestorage.app",
  messagingSenderId: "571147797168",
  appId: "1:571147797168:web:e6a99aed2a70229e8db175"
}

// Initialiser Firebase
const app = initializeApp(firebaseConfig)

// Initialiser Realtime Database
export const db = getDatabase(app)

export default app
