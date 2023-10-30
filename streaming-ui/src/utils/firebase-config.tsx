// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4mC85lcU3lyqQWKQGX64Y8TvTNUXoS-A",
  authDomain: "streaming-service-smm.firebaseapp.com",
  projectId: "streaming-service-smm",
  storageBucket: "streaming-service-smm.appspot.com",
  messagingSenderId: "382066065232",
  appId: "1:382066065232:web:40460e9381d1c61090f655",
  measurementId: "G-WT42PM30VW",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);

// const analytics = getAnalytics(app);
