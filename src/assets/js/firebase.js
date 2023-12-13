/* Imports */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Timestamp, addDoc, collection, getFirestore, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { USE_EMAIL_VERIFICATION } from "./gvars";

/* Declare variables. */
export let isAuthenticated = false;
export let userLoggedIn = true;
export let currentUser = null;

/* Firebase Initialization */
const firebaseConfig = {
  apiKey: "AIzaSyADghj-nmn8DQsmSr9gBODdrZANt74qy9M",
  authDomain: "markdown-editor-b29d9.firebaseapp.com",
  projectId: "markdown-editor-b29d9",
  storageBucket: "markdown-editor-b29d9.appspot.com",
  messagingSenderId: "706396148962",
  appId: "1:706396148962:web:29bc679bfb27b521003abb",
  measurementId: "G-4TJEZYFKPP",
};

/* Firestore Variables */
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

/* Setup Providers. */
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export const auth = getAuth(app);

/* Function to delete a document */
export const deleteDocument = async (document) => {
  await deleteDoc(doc(db, "documents", document.id));
};

/* Function to update an existing document */
export const updateDocument = async (document) => {
  const postRef = doc(db, "documents", document.id);
  await updateDoc(postRef, {
    title: document.title,
    body: document.body,
    dateLastEdit: Timestamp.now(),
  });
};

/* Function that is called whenever a user attempts
 * to save a document. */
export const createDocument = async (documentTitle, documentBody) => {
  if (!auth.currentUser) {
    console.error("No authenticated user.");
    return;
  }
  try {
    const docRef = await addDoc(collection(db, "documents"), {
      uid: auth.currentUser.uid,
      title: documentTitle,
      body: documentBody,
      dateCreated: Timestamp.now(),
      dateLastEdit: Timestamp.now(),
      summary: "",
    });
    return docRef;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

/* Function that is called to refresh a list of documents */
export const getDocumentsManually = async () => {
  const querySnapshot = await getDocs(collection(db, "documents"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/* Function that returns a readable date based upon
 * a Firestore date. */
export const getFirestoreDate = (timestamp) => {
  if (!timestamp || !timestamp.toDate) {
    return "Invalid date";
  }

  // Convert the Firestore Timestamp to a JavaScript Date object
  const date = timestamp.toDate();

  // Format the date to a human-readable format
  // You can adjust the options to suit your needs
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

/* Function that is called whenever we attempt
 * to login using Google as our auth provider. */
export const authSignInWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error(error);
    });
};

/* Function that is called whenever we attempt
 * to login using Email as our auth provider. */
export const authSignInWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      currentUser = userCredential.user; // Update currentUser with logged-in user
      return true;
    })
    .catch((error) => {
      console.error(errorCode, errorMessage);
      return false;
    });
};

/* Function that is called whenever we attempt
 * to create a user account with email. */
export const createUserWithEmail = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      if (USE_EMAIL_VERIFICATION) {
        sendEmailVerification(auth.currentUser).then(() => {});
        isAuthenticated = true;
        return true;
      } else {
        isAuthenticated = true;
        return true;
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      return false;
    });
};

/* Function that is called when a user attempts
 * to sign out of the application. */
export const signOutOfApplication = () => {
  signOut(auth)
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.log(error);
    });
};

/* Function that is ran automatically ever time
 * the auth state changes within the application. */
onAuthStateChanged(auth, (user) => {
  user ? (currentUser = user) : (currentUser = null);
});
