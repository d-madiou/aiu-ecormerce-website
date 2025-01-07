// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";

import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCWfePcJ2wAWzMeDQlz-da8rCXHDRmuTlI",
    authDomain: "aiu-ecommerce-login.firebaseapp.com",
    projectId: "aiu-ecommerce-login",
    storageBucket: "aiu-ecommerce-login.firebasestorage.app",
    messagingSenderId: "489909882909",
    appId: "1:489909882909:web:96499b93034ae939fe76f4",
    measurementId: "G-ZX0VY8PYTF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const registerBtn = document.getElementById('register');
const loginSection = document.getElementById('login-section');
const identifierSection = document.getElementById('identifier-section');
const registerSection = document.getElementById('register-section');

// Show Identifier section
registerBtn.addEventListener('click', () => {
    loginSection.classList.add('hidden');
    identifierSection.classList.remove('hidden');
});

// Redirect to Register section based on role
document.getElementById('customer').addEventListener('click', () => {
    identifierSection.classList.add('hidden');
    registerSection.classList.remove('hidden');
});

document.getElementById('seller').addEventListener('click', () => {
    identifierSection.classList.add('hidden');
    registerSection.classList.remove('hidden');
});


const submit = document.getElementById('login');
submit.addEventListener('click', (event) => {
    const userName = document.getElementById('reg-username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    event.preventDefault();
    alert('login to your account');
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            setTimeout(() => {
                window.location.href = "../index.html";
            }, 1000); 
            // Additional actions can be performed here
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert('Error logging in: ' + errorMessage);
        });
})