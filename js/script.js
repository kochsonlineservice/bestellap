// =======================================
// Global Variables
// =======================================

let basket = [];
const deliveryCosts = 5;


// =======================================
// Initialization
// =======================================

function init() {
  renderBurger();
  renderPizza();
  renderSalat();
  renderGetraenke();
  renderDessert();
  renderBasket();
}


// =======================================
// Render Menu Categories
// =======================================

function renderBurger() {
  let html = "";
  let contentRef = document.getElementById("burger_content");

  for (let index = 0; index < menu.burger.length; index++) {
    let dish = menu.burger[index];
    html += getDishTemplate(dish);
  }

  contentRef.innerHTML = html;
}


function renderPizza() {
  let html = "";
  let contentRef = document.getElementById("pizza_content");

  for (let index = 0; index < menu.pizza.length; index++) {
    let dish = menu.pizza[index];
    html += getDishTemplate(dish);
  }

  contentRef.innerHTML = html;
}


function renderSalat() {
  let html = "";
  let contentRef = document.getElementById("salat_content");

  for (let index = 0; index < menu.salat.length; index++) {
    let dish = menu.salat[index];
    html += getDishTemplate(dish);
  }

  contentRef.innerHTML = html;
}


function renderGetraenke() {
  let html = "";
  let contentRef = document.getElementById("getraenke_content");

  for (let index = 0; index < menu.getraenke.length; index++) {
    let dish = menu.getraenke[index];
    html += getDishTemplate(dish);
  }

  contentRef.innerHTML = html;
}


function renderDessert() {
  let html = "";
  let contentRef = document.getElementById("dessert_content");

  for (let index = 0; index < menu.dessert.length; index++) {
    let dish = menu.dessert[index];
    html += getDishTemplate(dish);
  }

  contentRef.innerHTML = html;
}


// =======================================
// Basket Logic
// =======================================

function getDishById(id) {
  let categories = [
    menu.burger,
    menu.pizza,
    menu.salat,
    menu.getraenke,
    menu.dessert,
  ];

  for (let categoryIndex = 0; categoryIndex < categories.length; categoryIndex++) {
    let currentCategory = categories[categoryIndex];

    for (let dishIndex = 0; dishIndex < currentCategory.length; dishIndex++) {
      let dish = currentCategory[dishIndex];

      if (dish.id === id) {
        return dish;
      }
    }
  }
}


function addToBasket(id) {
  // Get selected dish
  let dish = getDishById(id);

  if (!dish) {
    return;
  }

  let found = false;

  // Check if dish already exists in basket
  for (let index = 0; index < basket.length; index++) {
    let currentBasketItem = basket[index];

    if (currentBasketItem.id === dish.id) {
      currentBasketItem.quantity++;
      found = true;
      break;
    }
  }

  // Add new item if it does not exist yet
  if (!found) {
    let basketItem = {
      id: dish.id,
      name: dish.name,
      price: dish.price,
      description: dish.description,
      quantity: 1,
    };

    basket.push(basketItem);
  }

  renderBasket();

  // Change button text
  let button = document.querySelector(`#add-button-${id}`);
  let basketItem = basket.find((item) => item.id === id);

  if (button && basketItem) {
    button.textContent = `Added ${basketItem.quantity}`;
  }
}


function removeFromBasket(id) {
  // Reduce quantity or remove item completely
  for (let index = 0; index < basket.length; index++) {
    let currentBasketItem = basket[index];

    if (currentBasketItem.id === id) {
      if (currentBasketItem.quantity === 1) {
        basket.splice(index, 1);
      } else {
        currentBasketItem.quantity--;
      }

      break;
    }
  }

  renderBasket();

  // Update Add to basket button
  let button = document.querySelector(`#add-button-${id}`);
  let basketItem = basket.find((item) => item.id === id);

  if (button) {
    if (basketItem) {
      button.textContent = `Added ${basketItem.quantity}`;
    } else {
      button.textContent = "Add to basket";
    }
  }
}


// =======================================
// Basket Rendering
// =======================================

function renderBasket() {
  let html = `
    <h4 class="basket_title">🛒 Your Basket</h4>
  `;

  let contentRef = document.getElementById("basket");
  let totalPrice = 0;

  // Render empty basket message
  if (basket.length === 0) {
    html += `
      <div class="empty_basket">
        <p>Nothing here yet.</p>
        <p>Go ahead and choose something delicious!</p>
        <span class="empty_basket_icon">🛒</span>
      </div>
    `;
  }


  // Render basket items
  if (basket.length > 0) {
    html += `
      <div class="basket_items_container">
    `;

    for (let index = 0; index < basket.length; index++) {
      let basketItem = basket[index];

      totalPrice += basketItem.price * basketItem.quantity;

      html += getBasketTemplate(basketItem);
    }

    html += `
      </div>
    `;
  }


  // Show total only when basket is not empty
  if (basket.length > 0) {
    let currentDeliveryCosts = deliveryCosts;

    // Free delivery from 50 €
    if (totalPrice >= 50) {
      currentDeliveryCosts = 0;
    }

    let finalPrice = totalPrice + currentDeliveryCosts;

    html += `
      <div class="basket_total">

        <div class="total_delivery_price">
  <p>
    <span>Subtotal</span>
    <span>${totalPrice.toFixed(2)} €</span>
  </p>

  <p>
    <span>Delivery fee</span>
    <span>${currentDeliveryCosts.toFixed(2)} €</span>
  </p>
</div>

        <div class="total_price_basket">
  <span>Total</span>
  <span>${finalPrice.toFixed(2)} €</span>
</div>

        <button onclick="order()" class="order_button">
  Buy now (${finalPrice.toFixed(2)} €)
</button>

      </div>
    `;
  }

  contentRef.innerHTML = html;
}


function getRemoveButton(basketItem) {
  if (basketItem.quantity === 1) {
    return `
      <button
        class="basket_btn"
        onclick="removeFromBasket(${basketItem.id})"
        aria-label="Remove item from basket"
      >
        🗑️
      </button>
    `;
  }

  return `
    <button
      class="basket_btn"
      onclick="removeFromBasket(${basketItem.id})"
      aria-label="Decrease quantity"
    >
      ➖
    </button>
  `;
}


// =======================================
// Order
// =======================================

function order() {
  basket = [];

  renderBasket();

  alert("Vielen Dank! Ihre Bestellung ist unterwegs. 🍕");
}


// =======================================
// Back to Top Button
// =======================================

const toTopButton = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    toTopButton.style.display = "block";
  } else {
    toTopButton.style.display = "none";
  }
});


toTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});