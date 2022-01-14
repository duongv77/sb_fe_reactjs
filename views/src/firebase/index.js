import firebase from "firebase/compat/app";
import "firebase/compat/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDoZS8WPc74aPwrF_mYocmW8wkgkxRtOLA",
  authDomain: "fistproject-d19c7.firebaseapp.com",
  projectId: "fistproject-d19c7",
  storageBucket: "fistproject-d19c7.appspot.com",
  messagingSenderId: "1057440524254",
  appId: "1:1057440524254:web:5ec007096d622fbe949f4f"
};

  firebase.initializeApp(firebaseConfig)

  const storage = firebase.storage
  export {storage, firebase as default}