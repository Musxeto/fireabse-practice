import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxwbTPPXK_TJ58-CUtda_xij6e81SGSpw",
  authDomain: "wired-rex-414706.firebaseapp.com",
  projectId: "wired-rex-414706",
  storageBucket: "wired-rex-414706.appspot.com",
  messagingSenderId: "326739103673",
  appId: "1:326739103673:web:46888e1009097132ebb068",
  measurementId: "G-5LF60E44R7",
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

const colRef = collection(db, "books");

// const q = query(colRef, where("title", "==", "rich dad poor dad"));
const q = query(colRef, orderBy("createdAt"));

//  getDocs(colRef)
//    .then((snapshot) => {let books = [];
//     snapshot.docs.forEach((doc) => {
//       books.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(books);})
//    .catch((err) => {
//      console.log(err.message);
//    });

const unsubCol = onSnapshot(q, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});

const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
  }).then(() => {
    addBookForm.reset();
  });
});

const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", deleteBookForm.id.value);
  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});

const docRef = doc(db, "books", "a2mD6ahLZbaOt7ZQ3S1w");
// getDoc(docRef).then((doc) => {
//   console.log(doc.data(), doc.id);
// });

const unsubDoc = onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
});

const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", (e) => {
  e.preventDefault;

  const docRef = doc(db, "books", updateForm.id.value);
  updateDoc(docRef, {
    title: "updated title",
  }).then(() => {
    updateForm.reset;
  });
});

const userHeading = document.querySelector(".username");

const signupForm = document.querySelector(".signup");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signupForm.email.value;
  const password = signupForm.password.value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      // console.log("User Created: ", cred.user);
      signupForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});

const loginForm = document.querySelector(".login");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;
  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      // console.log("user logged in:", cred.user);
      userHeading.innerText = "Current User: " + cred.user.email; // Update the DOM element here
      loginForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});

const logoutButton = document.querySelector(".logout");
logoutButton.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      // console.log("user signed out");
      userHeading.innerText = "No User Logged In";
    })
    .catch((err) => {
      console.log(err.message);
    });
});

const unsubAuth = onAuthStateChanged(auth, (user) => {
  console.log("user status changed", user);
});

const unsubButton = document.querySelector(".unsub");
unsubButton.addEventListener("click", (e) => {
  console.log("unsubscribing");
  unsubAuth();
  unsubButton();
  unsubCol();
});
