import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBoFJpymz_j3rbtMLC4oX3ZJOlR8QWe254",
  authDomain: "react-slack-clone-6048e.firebaseapp.com",
  databaseURL: "https://react-slack-clone-6048e.firebaseio.com",
  projectId: "react-slack-clone-6048e",
  storageBucket: "react-slack-clone-6048e.appspot.com",
  messagingSenderId: "352149837638",
  appId: "1:352149837638:web:d8effc55fbbe4e71287747"
};
firebase.initializeApp(firebaseConfig);

export default firebase;
