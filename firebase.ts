import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyB49lew2vIYpE_DkkGV4fWPeKPALu5Ekfk',
    authDomain: 'usaidwhat-1a685.firebaseapp.com',
    projectId: 'usaidwhat-1a685',
    storageBucket: 'usaidwhat-1a685.appspot.com',
    messagingSenderId: '785733717169',
    appId: '1:785733717169:web:2e39ec5398324765c32690',
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();
