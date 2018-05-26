import firebase from 'firebase';
// Initialize Firebase
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

export default firebase;
