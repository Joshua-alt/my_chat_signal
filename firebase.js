
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAirQeLPBiH-yo0QzJD9G6O6Rt9LCYyfsE",
    authDomain: "signalreact-native.firebaseapp.com",
    projectId: "signalreact-native",
    storageBucket: "signalreact-native.appspot.com",
    messagingSenderId: "81211648404",
    appId: "1:81211648404:web:01393ad7086a2d622b0781"
  };
  let app;
  if (firebase.apps.length === 0) {
     app = firebase.initializeApp(firebaseConfig);
  } else {
     app= firebase.app();
  }
  const db = app.firestore();
  const auth= firebase.auth();
  export { db, auth};