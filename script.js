const menuItems = [
  { id: 1, name: "Paneer Power Bowl", description: "Spiced paneer, rice & fresh greens", price: 140, category: "Meals", emoji: "🍛", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=85" },
  { id: 2, name: "Masala Maggi", description: "The classic midnight comfort bowl", price: 70, category: "Meals", emoji: "🍜", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=85" },
  { id: 3, name: "Crispy Veg Burger", description: "Crunchy patty, cheese & house sauce", price: 110, category: "Meals", emoji: "🍔", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=85" },
  { id: 4, name: "Peri Peri Fries", description: "Golden fries with a spicy kick", price: 80, category: "Snacks", emoji: "🍟", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=85" },
  { id: 5, name: "Cheese Nachos", description: "Loaded with salsa and melted cheese", price: 95, category: "Snacks", emoji: "🧀", image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=700&q=85" },
  { id: 6, name: "Cold Coffee", description: "Creamy, chilled and lightly sweet", price: 75, category: "Drinks", emoji: "🥤", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=85" },
  { id: 7, name: "Lemon Iced Tea", description: "Fresh lemon, tea and mint", price: 50, category: "Drinks", emoji: "🍋", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=700&q=85" },
  { id: 8, name: "Choco Lava Cake", description: "Warm cake with a gooey centre", price: 90, category: "Snacks", emoji: "🍰", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=85" },
  { id: 9, name: "Garden Quinoa Bowl", description: "Quinoa, avocado, chickpeas & greens", price: 155, category: "Healthy", emoji: "🥗", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=85" },
  { id: 10, name: "Avocado Toast", description: "Wholegrain toast, avocado & seeds", price: 120, category: "Healthy", emoji: "🥑", image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=700&q=85" },
  { id: 11, name: "Fruit & Yogurt Parfait", description: "Greek yogurt, berries & crunchy granola", price: 100, category: "Healthy", emoji: "🍓", image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=700&q=85" },
  { id: 12, name: "Green Power Smoothie", description: "Spinach, banana, mango & coconut water", price: 110, category: "Healthy", emoji: "🥝", image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=700&q=85" },
  { id: 13, name: "Moong Dal Chilla", description: "Protein-rich lentil pancake with mint chutney", price: 95, category: "Healthy", emoji: "🥞", image: "https://www.foodie-trail.com/wp-content/uploads/2022/02/20220226_132806397_iOS-scaled.jpg" },
  { id: 14, name: "Idli Sambar", description: "Steamed rice cakes with warm lentil stew", price: 85, category: "Healthy", emoji: "🥣", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=700&q=85" },
  { id: 15, name: "Sprouts Chaat", description: "Fresh sprouts, tomato, onion & lemon", price: 75, category: "Healthy", emoji: "🌱", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=85" },
  { id: 16, name: "Bajra Khichdi", description: "Wholesome pearl millet, dal & vegetables", price: 130, category: "Healthy", emoji: "🍲", image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=85" }
];

const cart = {};
const favourites = new Set();
const savedOrders = JSON.parse(localStorage.getItem("nightbite-orders") || "[]");
let selectedCategory = "All";
const foodGrid = document.querySelector("#food-grid");
const searchInput = document.querySelector("#search-input");

function renderMenu() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  foodGrid.innerHTML = filteredItems.map((item, index) => `
    <article class="food-card" style="--card-delay: ${index * 55}ms">
      <div class="food-image"><img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.classList.add('image-error')"><span>${item.emoji}</span><button class="favorite-button ${favourites.has(item.id) ? "liked" : ""}" data-favorite="${item.id}" type="button" aria-label="${favourites.has(item.id) ? "Remove" : "Add"} ${item.name} ${favourites.has(item.id) ? "from" : "to"} favourites">♥</button></div>
      <div class="food-info">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="food-bottom">
          <span class="price">₹${item.price}</span>
          <div class="card-action"><span class="item-count">${cart[item.id] ? `${cart[item.id].quantity} in cart` : ""}</span><button class="add-button" data-add="${item.id}" type="button" aria-label="Add ${item.name} to cart">+</button></div>
        </div>
      </div>
    </article>
  `).join("");
  document.querySelector("#empty-message").classList.toggle("hidden", filteredItems.length > 0);
  document.querySelector("#menu-count").textContent = filteredItems.length;
  document.querySelector("#clear-filters").classList.toggle("hidden", selectedCategory === "All" && !searchTerm);
}

function renderCart() {
  const cartItems = Object.values(cart);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.querySelector("#cart-count").textContent = itemCount;
  document.querySelector("#cart-total").textContent = `₹${total}`;
  document.querySelector("#checkout-button").disabled = cartItems.length === 0;

  document.querySelector("#cart-items").innerHTML = cartItems.length
    ? cartItems.map((item) => `
      <div class="cart-row">
        <div class="cart-row-image"><img src="${item.image}" alt="" onerror="this.classList.add('image-error')"><span>${item.emoji}</span></div>
        <div class="cart-row-info"><strong>${item.name}</strong><small>₹${item.price} each</small></div>
        <div class="quantity">
          <button data-change="${item.id}" data-amount="-1" type="button">−</button>
          <span>${item.quantity}</span>
          <button data-change="${item.id}" data-amount="1" type="button">+</button>
        </div>
      </div>
    `).join("")
    : `<div class="cart-empty"><span>🛍️</span><p>Your cart is empty</p><small>Add something delicious for your late-night study session.</small></div>`;
}

function renderOrders() {
  const orderList = document.querySelector("#order-list");
  if (!savedOrders.length) return;

  orderList.innerHTML = savedOrders.map((order) => `
    <article class="order-card">
      <div class="order-top">
        <div><span class="order-status">● Confirmed</span><h3>Order #${order.number}</h3></div>
        <strong>₹${order.total}</strong>
      </div>
      <p class="order-meta">${order.date} <span>·</span> Pickup: ${order.pickupTime}</p>
      <div class="order-items">${order.items.map((item) => `<span>${item.emoji} ${item.name} × ${item.quantity}</span>`).join("")}</div>
    </article>
  `).join("");
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2400);
}

function openCart() {
  document.querySelector("#cart-panel").classList.add("open");
  document.querySelector("#overlay").classList.add("visible");
}

function closeCart() {
  document.querySelector("#cart-panel").classList.remove("open");
  document.querySelector("#overlay").classList.remove("visible");
}

foodGrid.addEventListener("click", (event) => {
const favoriteButton = event.target.closest("[data-favorite]");
if (favoriteButton) {
  const id = Number(favoriteButton.dataset.favorite);
  favourites.has(id) ? favourites.delete(id) : favourites.add(id);
  renderMenu();
  showToast(favourites.has(id) ? "Added to your favourites ♥" : "Removed from favourites");
  return;
}
const button = event.target.closest("[data-add]");
  if (!button) return;
  const item = menuItems.find((menuItem) => menuItem.id === Number(button.dataset.add));
  cart[item.id] = cart[item.id] || { ...item, quantity: 0 };
  cart[item.id].quantity += 1;
  renderCart();
  renderMenu();
  showToast(`${item.name} added to your cart`);
});

document.querySelector("#cart-items").addEventListener("click", (event) => {
  const button = event.target.closest("[data-change]");
  if (!button) return;
  const id = Number(button.dataset.change);
  cart[id].quantity += Number(button.dataset.amount);
  if (cart[id].quantity <= 0) delete cart[id];
  renderCart();
  renderMenu();
});

document.querySelectorAll(".category").forEach((button) => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;
    document.querySelectorAll(".category").forEach((tab) => tab.classList.remove("active"));
    button.classList.add("active");
    renderMenu();
  });
});

searchInput.addEventListener("input", renderMenu);

document.querySelector("#clear-filters").addEventListener("click", () => {
  selectedCategory = "All";
  searchInput.value = "";
  document.querySelectorAll(".category").forEach((tab) => tab.classList.toggle("active", tab.dataset.category === "All"));
  renderMenu();
});
document.querySelector("#cart-button").addEventListener("click", openCart);
document.querySelector("#close-cart").addEventListener("click", closeCart);
document.querySelector("#overlay").addEventListener("click", closeCart);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeCart();
});
document.querySelector("#checkout-button").addEventListener("click", () => {
  const pickupTime = document.querySelector("#pickup-time").value;
  const cartItems = Object.values(cart);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = {
    number: String(Date.now()).slice(-6),
    date: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
    pickupTime: pickupTime.split(" · ")[0],
    total,
    items: cartItems.map(({ name, emoji, quantity }) => ({ name, emoji, quantity }))
  };
  savedOrders.unshift(order);
  localStorage.setItem("nightbite-orders", JSON.stringify(savedOrders.slice(0, 10)));
  renderOrders();
  showToast(`Order placed! Pickup: ${pickupTime.split(" · ")[0]} 🎉`);
  Object.keys(cart).forEach((id) => delete cart[id]);
  renderCart();
  renderMenu();
  setTimeout(closeCart, 500);
});

renderMenu();
renderCart();
renderOrders();
