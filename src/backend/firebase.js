import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCnqHUTYA-1t8ykW9ukkMRvq0Bi2_NZzs4",
  authDomain: "aims-public-school-55307.firebaseapp.com",
  databaseURL: "https://aims-public-school-55307-default-rtdb.firebaseio.com",
  projectId: "aims-public-school-55307",
  storageBucket: "aims-public-school-55307.appspot.com",
  messagingSenderId: "466475030046",
  appId: "1:466475030046:web:b7eb113cf5c87609f7400f",
  measurementId: "G-7X5QZBFDSC",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);