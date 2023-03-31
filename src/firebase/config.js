import { initializeApp } from 'firebase/app'
import {getFirestore, collection, addDoc, serverTimestamp, onSnapshot, query, where, orderBy, deleteDoc, doc} from 'firebase/firestore'
import {getAuth, createUserWithEmailAndPassword, updateProfile, signOut, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCmARsmEZu7o6MmvP2NdcTQxfPMgnZi6e8",
    authDomain: "projectmgtsite-644a8.firebaseapp.com",
    projectId: "projectmgtsite-644a8",
    storageBucket: "projectmgtsite-644a8.appspot.com",
    messagingSenderId: "1055089118352",
    appId: "1:1055089118352:web:b96373fb4d75d4ee0f5c15"
  };

  //init firebase
  initializeApp(firebaseConfig)

  //init services
  const db = getFirestore();
  const auth = getAuth();

  //init timestamp
  const timestamp = serverTimestamp();

  //exporting
  export { db, auth, createUserWithEmailAndPassword, updateProfile, signOut, signInWithEmailAndPassword, onAuthStateChanged, collection, addDoc, timestamp, onSnapshot, query, where, orderBy, deleteDoc, doc }