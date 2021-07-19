import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyC9-7JGc3kS2EXxBb33cEEKxt8b2iN6ga4",
    authDomain: "capastone-project-1.firebaseapp.com",
    projectId: "capastone-project-1",
    storageBucket: "capastone-project-1.appspot.com",
    messagingSenderId: "134726763649",
    appId: "1:134726763649:web:c3aea5c5a94209b3e3b980"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
const firestore = firebase.firestore()
