const hamburger = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");

if(hamburger){
    hamburger.addEventListener("click", () => {
        navList.classList.toggle("open");
    });
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, push, ref, set } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
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
    measurementId: "G-ZX0VY8PYTF",
    databaseURL : "https://aiu-ecommerce-login-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// // Firestore Database
// const db = getFirestore(app);
// Initialize Firebase Database
const database = getDatabase(app);

// Firebase Storage
// const storage = getStorage(app);

function addProductToCart(productId, productName, productPrice) {
    const cartRef = ref(database, "cart/");
    const newCartItemRef = push(cartRef); // Generate unique key for the item

    // Retrieve the product element to get the image URL
    const productElement = document.querySelector(`[data-product-id="${productId}"]`).closest(".product-item");
    const productImageURL = productElement.querySelector("img").src; // Fetch the image URL

    set(newCartItemRef, {
        id: productId,
        name: productName,
        price: parseFloat(productPrice),
        quantity: 1,
        total: parseFloat(productPrice),
        image: productImageURL // Add the image property
    }).then(() => {
        alert(`${productName} has been added to the cart.`);
    }).catch((error) => {
        console.error("Error adding product to cart:", error);
    });
}

// Add event listeners to cart icons
document.querySelectorAll(".add-to-cart").forEach((cartIcon) => {
    cartIcon.addEventListener("click", () => {
        console.log("Cart icon clicked!");
        const productId = cartIcon.dataset.productId;
        const productName = cartIcon.dataset.productName;
        const productPrice = cartIcon.dataset.productPrice;

        console.log({ productId, productName, productPrice }); // Debugging product data
        addProductToCart(productId, productName, productPrice);
    });
});
