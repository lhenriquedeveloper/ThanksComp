import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

let firebaseConfig = {
    apiKey: "AIzaSyAlopk0GorZMlpdLSEFwI_IMtie2kFTp4c",
    authDomain: "thankscomp-8bc97.firebaseapp.com",
    projectId: "thankscomp-8bc97",
    storageBucket: "thankscomp-8bc97.appspot.com",
    messagingSenderId: "728444629930",
    appId: "1:728444629930:web:8125123a2d9aaa84a2f1d3",
    measurementId: "G-R9K70ZMBBT"
}

if (!firebase.apps.lenght) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase; 