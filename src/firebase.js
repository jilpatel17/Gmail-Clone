import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBrWRsw_-TfJd628Y_-Oos5dEqjfdJbH3o",
    authDomain: "clone-3e158.firebaseapp.com",
    projectId: "clone-3e158",
    storageBucket: "clone-3e158.appspot.com",
    messagingSenderId: "570698361883",
    appId: "1:570698361883:web:829f5b7411421a8ebcdcbe"
  };

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth()
const storage = app.storage()

export {db,firebase,auth,storage}


// https://clone-3e158.web.app hoasting link