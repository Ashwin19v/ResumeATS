import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDCpAJtoXUCNge5IchQnnrunth49LqLRBw",
  authDomain: "resumeats-50ccf.firebaseapp.com",
  projectId: "resumeats-50ccf",
  storageBucket: "resumeats-50ccf.firebasestorage.app",
  messagingSenderId: "35440213629",
  appId: "1:35440213629:web:94ac327fe3987910a8fb14",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
