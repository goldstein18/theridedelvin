
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCzQgDO0X0Hq12aognibVb9g7muKLRlLRM",
  authDomain: "theride-c70b7.firebaseapp.com",
  projectId: "theride-c70b7",
  storageBucket: "theride-c70b7.appspot.com",
  messagingSenderId: "497049305653",
  appId: "1:497049305653:web:3c4e831c4a7544b0b3a77c",
  measurementId: "G-97Q0S6W8RN"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); 
const db = getFirestore(app);


export { auth, analytics};

export { db };
export default db; // 👈 Exportar por defecto