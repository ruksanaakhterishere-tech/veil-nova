
let cart = JSON.parse(localStorage.getItem("cart")) || {};

document.querySelectorAll(".add-to-cart").forEach((button, index) => {
    button.addEventListener("click", () => addToCart(index));
});


function addToCart(index) {
    const card = document.querySelectorAll(".product-item")[index];
    const itemName = card.querySelector("img").alt; 
    const selectedOption = card.querySelector("select").value;

  
    const itemKey = `${itemName} - ${selectedOption}`;

    if (cart[itemKey]) {
        cart[itemKey].quantity += 1;
    } else {
        const price = card.querySelector("p").innerText.replace('$', '');
        cart[itemKey] = { name: itemName, option: selectedOption, price: price, quantity: 1 };
    }


    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartButton();
}

function updateCartButton() {
    const itemCount = Object.values(cart).reduce((total, item) => total + item.quantity, 0);

    if (itemCount > 0) {

        if (!document.getElementById("cart-container")) {
            const cartContainer = document.createElement("div");
            cartContainer.id = "cart-container";
            cartContainer.style.position = "fixed";
            cartContainer.style.bottom = "20px";
            cartContainer.style.right = "20px";

            const cartButton = document.createElement("button");
            cartButton.id = "cart-button";
            cartButton.onclick = openCartModal;
            cartButton.innerText = `VIEW CART (${itemCount})`;
            cartContainer.appendChild(cartButton);

            document.body.appendChild(cartContainer);
        } else {
    
            document.getElementById("cart-button").innerText = `VIEW CART (${itemCount})`;
        }
    } else {

        const cartContainer = document.getElementById("cart-container");
        if (cartContainer) {
            cartContainer.remove();
        }
    }
}


function openCartModal() {

    if (!document.getElementById("cart-modal")) {
        const modal = document.createElement("div");
        modal.id = "cart-modal";
        modal.style.display = "none";
        modal.style.position = "fixed";
        modal.style.top = "0";
        modal.style.left = "0";
        modal.style.width = "100%";
        modal.style.height = "100%";
        modal.style.backgroundColor = "rgba(0,0,0,0.5)";
        modal.style.zIndex = "1000";

        const modalContent = document.createElement("div");
        modalContent.id = "cart-modal-content";
        modalContent.style.backgroundColor = "white";
        modalContent.style.margin = "15% auto";
        modalContent.style.padding = "20px";
        modalContent.style.width = "80%";
        modalContent.style.maxWidth = "600px";

        const closeButton = document.createElement("span");
        closeButton.id = "cart-close";
        closeButton.innerHTML = "&times;";
        closeButton.style.cursor = "pointer";
        closeButton.onclick = closeCartModal;
        modalContent.appendChild(closeButton);

        const cartItemsContainer = document.createElement("div");
        cartItemsContainer.id = "cart-items";
        modalContent.appendChild(cartItemsContainer);

    
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    }

    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";
    Object.keys(cart).forEach(itemKey => {
        const item = cart[itemKey];

        const itemElement = document.createElement("div");
        itemElement.style.display = "flex";
        itemElement.style.justifyContent = "space-between";
        itemElement.style.alignItems = "center";
        itemElement.style.marginBottom = "10px";

        const itemText = document.createElement("span");
        itemText.innerText = `${item.name} (${item.option}) - Quantity: ${item.quantity} - Price: $${item.price}`;
        itemElement.appendChild(itemText);

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Remove";
        deleteButton.className = 'cart-remove-button';
        deleteButton.style.marginLeft = "10px";
        deleteButton.onclick = () => removeFromCart(itemKey);
        itemElement.appendChild(deleteButton);

        cartItemsContainer.appendChild(itemElement);
    });


    const checkoutButton = document.createElement("button");
    checkoutButton.innerText = "Proceed to Checkout";
    checkoutButton.style.marginTop = "20px";
    checkoutButton.style.width = "100%";
    checkoutButton.style.padding = "10px";
    checkoutButton.style.backgroundColor = "#4CAF50";
    checkoutButton.style.color = "white";
    checkoutButton.style.border = "none";
    checkoutButton.style.cursor = "pointer";
    checkoutButton.onclick = proceedToCheckout;
    cartItemsContainer.appendChild(checkoutButton);

    document.getElementById("cart-modal").style.display = "block";
}

function removeFromCart(itemKey) {
    if (cart[itemKey].quantity > 1) {
        cart[itemKey].quantity -= 1;
    } else {
        delete cart[itemKey]; 
    }

  
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartButton();
    openCartModal(); 
}

function closeCartModal() {
    document.getElementById("cart-modal").style.display = "none";
}

function proceedToCheckout() {
    if (Object.keys(cart).length === 0) {
        alert("Your cart is empty! Please add items before proceeding to checkout.");
        return;
    }

    sessionStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "checkout.html";
}


window.onload = () => {
    if (Object.keys(cart).length > 0) {
        updateCartButton();
    }
};
