// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage'; 
import {GoogleAuthProvider,getAuth, signInWithPopup} from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDVBC8mJjZQWw17KOLovy-E4a-MeNvaGVU",
    authDomain: "mvgr-voices.firebaseapp.com",
    projectId: "mvgr-voices",
    storageBucket: "mvgr-voices.appspot.com",
    messagingSenderId: "534905911445",
    appId: "1:534905911445:web:f07cb1af64876b8d05439c",
    measurementId: "G-5MPL2WRC3F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

const provider = new GoogleAuthProvider();

const auth = getAuth();

//  Firebase Storage initialization
const storage = getStorage(app);

export const authWithGoogle = async () => {
    let user = null;
    await signInWithPopup(auth,provider)
    .then((result)=>[
        user = result.user
    ])
    .catch(err=>{
        console.log(err);
    })
    return user;
}