import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyC0Sejn0opwIKcznrjFjVsUwW1MX2KdHtA',
  authDomain: 'instagram-clone-react-4c1de.firebaseapp.com',
  databaseURL: 'https://instagram-clone-react-4c1de.firebaseio.com',
  projectId: 'instagram-clone-react-4c1de',
  storageBucket: 'instagram-clone-react-4c1de.appspot.com',
  messagingSenderId: '270643868873',
  appId: '1:270643868873:web:b5aca804671c1d5b5c8918',
  measurementId: 'G-MP22SLSE0E',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

// export default db;
