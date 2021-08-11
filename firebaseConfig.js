import firebase from 'firebase';
import {API_KEY,
    DATABASE_URL,
    PROJECT_ID,
    AUTH_DOMAIN,
    STORAGE_BUCKET,
    APP_ID,
    MESSAGE_SENDER_ID,
    MEASUREMENT_ID
} from '@env';

const firebaseConfig = {
    apiKey: API_KEY,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    authDomain: AUTH_DOMAIN,
    storageBucket: STORAGE_BUCKET,
    appId: APP_ID,
    messagingSenderId: MESSAGE_SENDER_ID,
    measurementid: MEASUREMENT_ID
}


console.log('api key is ',API_KEY);
const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;