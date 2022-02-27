import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyA3cjv15n0IaoVQD-QTufHxdN2muHDkAmU",
    authDomain: "vue-lol.firebaseapp.com",
    projectId: "vue-lol",
    storageBucket: "vue-lol.appspot.com",
    messagingSenderId: "256172203978",
    appId: "1:256172203978:web:0eca1fb81f6b5159e7f933",
    measurementId: "G-EM9Q6CGX3J"
  };

initializeApp(firebaseConfig)

const auth = getAuth()