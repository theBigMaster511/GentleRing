let cart = [];

const products = [
    { id: 1, name: "Nature doré", price: 3000 },
    { id: 2, name: "Nature noir", price: 3000 },
    { id: 3, name: "Rivière sauvage", price: 3000 },
    { id: 4, name: "Polar savage", price: 3000 },
];

function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    if (product) {
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 0 });
        }
        updateCartCounter();
        renderCart(); // Met à jour l'affichage du panier
      
    }
}

function updateCartCounter() {
    const cartCounter = document.getElementById('cart-counter');
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    cartCounter.textContent = totalQuantity;
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Réinitialise la liste
    cart.forEach((item, index) => {
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>Prix: ${item.price} Fcfa</p>
                <div>
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <span>Quantité: ${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <p>Prix total: ${item.price * item.quantity} Fcfa</p>
                <button onclick="removeItem(${index})">Supprimer</button>
            </div>`;
    });
    openCartSidebar(); // Ouvre le panier automatiquement
}

function updateQuantity(index, change) {
    const product = cart[index];
    if (product.quantity + change >= 0) { // Empêche la quantité de devenir inférieure à 1
        product.quantity += change;
        updateCartCounter();
        renderCart();
    }
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartCounter();
    renderCart();
}

function openCartSidebar() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.add('open');
}

function closeCartSidebar() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.remove('open');
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCounter();
    renderCart();

    const addToCartButtons = document.querySelectorAll('.buy-now-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.closest('.produit-card').getAttribute('data-id'));
            addToCart(productId);
        });
    });

    document.getElementById('close-cart').addEventListener('click', closeCartSidebar);
});