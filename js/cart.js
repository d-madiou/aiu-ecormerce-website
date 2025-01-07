// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, onValue, ref, remove, update } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCWfePcJ2wAWzMeDQlz-da8rCXHDRmuTlI",
    authDomain: "aiu-ecommerce-login.firebaseapp.com",
    projectId: "aiu-ecommerce-login",
    storageBucket: "aiu-ecommerce-login.appspot.com",
    messagingSenderId: "489909882909",
    appId: "1:489909882909:web:96499b93034ae939fe76f4",
    measurementId: "G-ZX0VY8PYTF",
    databaseURL: "https://aiu-ecommerce-login-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.addEventListener("DOMContentLoaded", () => {
    const cartTableBody = document.querySelector("tbody");
    const subtotalElement = document.querySelector(".sumCp span:first-child");
    const totalElement = document.querySelector(".total span:last-child");

    const cartRef = ref(database, "/cart/");
    let subtotal = 0;

    // Fetch cart items from Firebase
    onValue(cartRef, (snapshot) => {
        const cartItems = snapshot.val();
        cartTableBody.innerHTML = ""; // Clear the table before populating
        subtotal = 0; // Reset subtotal for new calculation

        if (cartItems) {
            Object.keys(cartItems).forEach((key) => {
                const item = cartItems[key];
                const itemTotal = item.price * item.quantity;

                // Create a row for each item
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td class="align-middle">
                        <img src="${item.image}" alt="Product Image" class="product-img">
                        ${item.name}
                    </td>
                    <td class="align-middle">RM${item.price.toFixed(2)}</td>
                    <td class="align-middle">
                        <div class="quantity-controls">
                            <button class="btn btn-sm btn-primary btn-minus" data-id="${key}"><i class="fas fa-minus"></i></button>
                            <input type="number" value="${item.quantity}" class="quantity-input" min="1" data-id="${key}">
                            <button class="btn btn-sm btn-primary btn-plus" data-id="${key}"><i class="fas fa-plus"></i></button>
                        </div>
                    </td>
                    <td class="align-middle">RM${itemTotal.toFixed(2)}</td>
                    <td class="align-middle">
                        <button class="btn btn-sm btn-danger btn-remove" data-id="${ key}"><i class="fas fa-times"></i></button>
                    </td>
                `;

                cartTableBody.appendChild(row);
                subtotal += itemTotal;
            });
        } else {
            subtotalElement.textContent = `RM0.00`;
            totalElement.textContent = `RM2.00`; // Assuming shipping cost is RM10
            return; // Exit if there are no items
        }

        subtotalElement.textContent = `RM${subtotal.toFixed(2)}`;
        totalElement.textContent = `RM${(subtotal + 10).toFixed(2)}`; // Assuming shipping cost is RM10
    });

    // Update quantity
    cartTableBody.addEventListener("click", (e) => {
        const button = e.target.closest("button");
        if (!button) return;

        const itemId = button.dataset.id;

        if (button.classList.contains("btn-minus")) {
            updateQuantity(itemId, -1);
        } else if (button.classList.contains("btn-plus")) {
            updateQuantity(itemId, 1);
        } else if (button.classList.contains("btn-remove")) {
            removeItem(itemId);
        }
    });

    function updateQuantity(itemId, delta) {
        const itemRef = ref(database, `cart/${itemId}`);
        onValue(itemRef, (snapshot) => {
            const item = snapshot.val();
            if (item) {
                const newQuantity = Math.max(1, item.quantity + delta); // Ensure minimum quantity is 1
                update(itemRef, { quantity: newQuantity, total: item.price * newQuantity });
            }
        });
    }

    function removeItem(itemId) {
        if (confirm("Are you sure you want to remove this item from the cart?")) {
            const itemRef = ref(database, `cart/${itemId}`);
            remove(itemRef).then(() => alert("Item removed from cart"));
        }
    }
});