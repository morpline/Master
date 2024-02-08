// Import the functions you need from the SDKs you need
// import { initializeApp }  from "firebase/app"      ;
// import { getAnalytics }   from "firebase/analytics";
// import { getFirestore }   from "firebase/firestore";
const { Firestore }   = require ("@google-cloud/firestore");
const {Storage} = require('@google-cloud/storage');
var admin = require("firebase-admin");

var serviceAccount = require("./key.json");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtCwEA3WOSKrk4yMHn26cWHKdHygk6CuU",
  authDomain: "crud-ac1b0.firebaseapp.com",
  projectId: "crud-ac1b0",
  storageBucket: "crud-ac1b0.appspot.com",
  messagingSenderId: "466952165560",
  appId: "1:466952165560:web:f0763fa20272d4b2df7c4d",
  measurementId: "G-2300G5XFXZ"
};
// admin.initializeApp(firebaseConfig);
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const projectId = 'crud-ac1b0';

const db = new Firestore({
  projectId:firebaseConfig.projectId,
});
db.settings({
  credentials:{
    client_email:serviceAccount.client_email,
    private_key:serviceAccount.private_key
  }
})
// authenticateImplicitWithAdc();
// Initialize Firebase
// const analytics = getAnalytics(app);

module.exports = db;