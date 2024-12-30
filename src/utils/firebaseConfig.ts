import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; // Import the authentication module
import { API_KEY } from 'react-native-dotenv'; // Import the API_KEY from the .env file

// Firebase configuration
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: 'matrimonyapp-41fbe.firebaseapp.com',
    projectId: 'matrimonyapp-41fbe',
    storageBucket: 'matrimonyapp-41fbe.appspot.com',
    messagingSenderId: '328319333273',
    appId: '1:328319333273:android:4cf20210630f796fad5908',
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // Use the already initialized app
}

export default firebase;
