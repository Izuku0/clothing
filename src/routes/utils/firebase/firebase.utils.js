import { initializeApp } from "firebase/app";
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD7rBnxC7UFPQ_uCVqVnzoxih2lfzfE1Ro",
  authDomain: "crwn-clothing-db-31f64.firebaseapp.com",
  projectId: "crwn-clothing-db-31f64",
  storageBucket: "crwn-clothing-db-31f64.appspot.com",
  messagingSenderId: "874767808833",
  appId: "1:874767808833:web:d575521d9c7db15b2889c0"
};


const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth) =>{
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);
  const userSnapshot =await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt =new Date;

    try {
        await setDoc(userDocRef,{
            displayName,
            email,
            createdAt,
        });
    } catch (error) {
        console.log('error creating user',error.message);
    }
  }
  return userDocRef;

}