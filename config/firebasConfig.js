import * as firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyCqNV-FJBlky_6hBPSiy7sOwEGOZ-R_qrU",
    authDomain: "react-native-firebase-316c3.firebaseapp.com",
    databaseURL: "https://react-native-firebase-316c3.firebaseio.com",
    projectId: "react-native-firebase-316c3",
    storageBucket: "react-native-firebase-316c3.appspot.com",
    messagingSenderId: "522142220804",
    appId: "1:522142220804:web:dca710dabd77eec0222b51",
    measurementId: "G-PH9CWKV4QD"
  };

  let app = firebase.initializeApp(firebaseConfig);
  export const db = app.database();