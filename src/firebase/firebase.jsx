import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDAjWw3gv54xagXAEbQ7y7qK-8Pwj4sHXk",
    authDomain: "anonymous-8e460.firebaseapp.com",
    projectId: "anonymous-8e460",
    storageBucket: "anonymous-8e460.appspot.com",
    messagingSenderId: "1057610447544",
    appId: "1:1057610447544:web:c52364fad53f8915ef124d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);