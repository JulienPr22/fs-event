// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDWMXfZe_vSWz7HggAAS5Y8YNjbnhhUhGk",
    authDomain: "fete-science-app.firebaseapp.com",
    databaseURL: "https://fete-science-app-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fete-science-app",
    storageBucket: "fete-science-app.appspot.com",
    messagingSenderId: "811590645738",
    appId: "1:811590645738:web:61fca065ab135bafe7a493"
};



// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)

export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });