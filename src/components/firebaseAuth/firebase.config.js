// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_GU2_DhsOf9SMY7JP1VGkDrPBLyuBXqs",
  authDomain: "otp-verification-b2231.firebaseapp.com",
  projectId: "otp-verification-b2231",
  storageBucket: "otp-verification-b2231.appspot.com",
  messagingSenderId: "1040758235912",
  appId: "1:1040758235912:web:fd6ee90721e5a8f1ca02bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);