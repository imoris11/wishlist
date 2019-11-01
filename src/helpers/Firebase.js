import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

 firebase.initializeApp({
    apiKey: "AIzaSyBNOuc-kGB3Bq4FryPdehVVcifbKVeqPJk",
  authDomain: "wishlist-b5d9c.firebaseapp.com",
  databaseURL: "https://wishlist-b5d9c.firebaseio.com",
  projectId: "wishlist-b5d9c",
  storageBucket: "wishlist-b5d9c.appspot.com",
  messagingSenderId: "704244958887",
  appId: "1:704244958887:web:17f7e8d47a1478360cbd82",
  measurementId: "G-5CT898NJ7V"
});

export const auth = firebase.auth();
export const database = firebase.database();
export const storage = firebase.storage();

