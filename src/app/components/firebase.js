import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const config = {
    apiKey: 'AIzaSyCzgKpzGNfNFrq7M2dHE5wQf_8YOytP-2E',
    authDomain: 'brewski-7c778.firebaseapp.com',
    databaseURL: 'https://brewski-7c778.firebaseio.com',
    projectId: 'brewski-7c778',
    storageBucket: 'gs://brewski-7c778.appspot.com/',
    messagingSenderId: '264186724578'
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const database = firebase.database();

export default firebase;
