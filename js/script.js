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
        menu.dessert
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
    }
  }

  renderBasket();
}

// =======================================
// Basket Rendering
// =======================================

function renderBasket() {
  let html = `
    <h4 class="basket_title">🛒 Warenkorb</h4>
  `;

  let contentRef = document.getElementById("basket");

  let totalPrice = 0;

  // Render all basket items
  for (let index = 0; index < basket.length; index++) {
    let basketItem = basket[index];

    totalPrice += basketItem.price * basketItem.quantity;

    html += getBasketTemplate(basketItem);
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
          <p>Zwischensumme: ${totalPrice.toFixed(2)} €</p>
          <p>Lieferkosten: ${currentDeliveryCosts.toFixed(2)} €</p>
        </div>

        <h3 class="total_price_basket">
          Gesamt: ${finalPrice.toFixed(2)} €
        </h3>

        <button onclick="order()" class="order_button">
          Buy Now
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