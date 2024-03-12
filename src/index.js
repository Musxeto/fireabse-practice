import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

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

const colRef = collection(db, "books");

getDocs(colRef)
  .then((snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  })
  .catch((err) => {
    console.log(err.message);
  });

const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
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
