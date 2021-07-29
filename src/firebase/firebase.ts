import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCS2vDf9RefIkot9Ob1tXkfg3U0c18exKs",
    authDomain: "linetowerwars-draym.firebaseapp.com",
    databaseURL: "https://linetowerwars-draym-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "linetowerwars-draym",
    storageBucket: "linetowerwars-draym.appspot.com",
    messagingSenderId: "578982110847",
    appId: "1:578982110847:web:dc9ba5c67d92756f43814a"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.firestore();