import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyAAgQ56nIvNNYRUdOfQpDrQze9WhQd1asQ",
    authDomain: "linkedin-clone-57738.firebaseapp.com",
    projectId: "linkedin-clone-57738",
    storageBucket: "linkedin-clone-57738.appspot.com",
    messagingSenderId: "129612759705",
    appId: "1:129612759705:web:51ee5faa2d8230832cae08",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(firebaseApp);
const auth = firebase.auth();

export { db, auth };
