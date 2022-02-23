import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/database';
import'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDT0hnoLxmMXoHU4CVDX0Dps2AW-2QYrb0",
  authDomain: "chat-web-app-6d201.firebaseapp.com",
  projectId: "chat-web-app-6d201",
  storageBucket: "chat-web-app-6d201.appspot.com",
  messagingSenderId: "80384873505",
  appId: "1:80384873505:web:3610a2f26a30bce24c3f60"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();

export const database = app.database();

export const storage = app.storage();