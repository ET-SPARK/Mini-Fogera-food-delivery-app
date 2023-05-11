import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { getDatabase } from 'firebase/database';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCrNmmJvAXBQ_Eq8keN-RuPUwyn5hR4dwo",
    authDomain: "spark-foods-a5293.firebaseapp.com",
    projectId: "spark-foods-a5293",
    storageBucket: "spark-foods-a5293.appspot.com",
    messagingSenderId: "287080897584",
    appId: "1:287080897584:web:7609db9133ceec5b1be1f5",
    measurementId: "G-TRLZBT2HCP"
  };


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app);


