import { initializeApp } from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyBFmui2BpW3QND4tFqxdKh0bHNRXRfAPVA',
  authDomain: 'phototaggingapp-d3d78.firebaseapp.com',
  projectId: 'phototaggingapp-d3d78',
  storageBucket: 'phototaggingapp-d3d78.appspot.com',
  messagingSenderId: '948240918734',
  appId: '1:948240918734:web:215014adf25a8611fe089f',
};

const app = initializeApp(config);

export default app;
