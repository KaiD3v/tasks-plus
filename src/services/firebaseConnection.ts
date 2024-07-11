import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTkdabbSLbkWNxbgLskNe4rq3Z7MROrC0",
  authDomain: "tasks-plus-2bc6c.firebaseapp.com",
  projectId: "tasks-plus-2bc6c",
  storageBucket: "tasks-plus-2bc6c.appspot.com",
  messagingSenderId: "699208222578",
  appId: "1:699208222578:web:2fa47e91a7310f4d45bfeb"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db };