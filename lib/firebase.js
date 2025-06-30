import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDu7uhAfx9Nes1aROjasfBJi-56SWsqcAk",
    authDomain: "book-my-table-9be57.firebaseapp.com",
    projectId: "book-my-table-9be57",
    storageBucket: "book-my-table-9be57.firebasestorage.app",
    messagingSenderId: "772199141221",
    appId: "1:772199141221:web:a6bed0d18e896e2b6d1b8c",
    measurementId: "G-85KHCSJF3M"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);

export { auth, db };

