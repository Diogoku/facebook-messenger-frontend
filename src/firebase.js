import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC2v8mHruz61tH-YtsT8jwHlW7EOgNLskQ",
  authDomain: "facebook-messenger-clone-9000c.firebaseapp.com",
  databaseURL: "https://facebook-messenger-clone-9000c.firebaseio.com",
  projectId: "facebook-messenger-clone-9000c",
  storageBucket: "facebook-messenger-clone-9000c.appspot.com",
  messagingSenderId: "210532282193",
  appId: "1:210532282193:web:2443a859dbd4d3f190ad70",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.FacebookAuthProvider();

export { auth, provider };
export default db;
