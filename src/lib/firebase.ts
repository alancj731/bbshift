import { initializeApp } from 'firebase/app';
import { getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "bbshift.firebaseapp.com",
    projectId: "bbshift",
    storageBucket: "bbshift.appspot.com",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export default storage;