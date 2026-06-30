// =======================================
// Global Variables
// =======================================

let basket = [];
const deliveryCosts = 5;

// =======================================
// Initialization
// =======================================

function init() {
  renderMainDishes();
  renderDesserts();
  renderDrinks();
  renderBasket();
}

// =======================================
// Render Menu Categories
// =======================================

function renderMainDishes() {
  let html = `
    <h2 class="category_title">🍕 Hauptgerichte</h2>
  `;

  let contentRef = document.getElementById("mainDishes");

  for (let index = 0; index < mainDish.hauptgerichte.length; index++) {
    let dish = mainDish.hauptgerichte[index];
    html += getDishTemplate(dish);
  }

  contentRef.innerHTML = html;
}

function renderDesserts() {
  let html = `
    <h2 class="category_title">🍰 Nachspeisen</h2>
  `;

  let contentRef = document.getElementById("desserts");

  for (let index = 0; index < mainDish.nachspeisen.length; index++) {
    let dessert = mainDish.nachspeisen[index];
    html += getDishTemplate(dessert);
  }

  contentRef.innerHTML = html;
}

function renderDrinks() {
  let html = `
    <h2 class="category_title">🥤 Getränke</h2>
  `;

  let contentRef = document.getElementById("drinks");

  for (let index = 0; index < mainDish.getränke.length; index++) {
    let drink = mainDish.getränke[index];
    html += getDishTemplate(drink);
  }

  contentRef.innerHTML = html;
}

// =======================================
// Basket Logic
// =======================================

function getDishById(id) {
  // Search in main dishes
  for (let index = 0; index < mainDish.hauptgerichte.length; index++) {
    let dish = mainDish.hauptgerichte[index];

    if (dish.id === id) {
      return dish;
    }
  }

  // Search in desserts
  for (let index = 0; index < mainDish.nachspeisen.length; index++) {
    let dish = mainDish.nachspeisen[index];

    if (dish.id === id) {
      return dish;
    }
  }

  // Search in drinks
  for (let index = 0; index < mainDish.getränke.length; index++) {
    let dish = mainDish.getränke[index];

    if (dish.id === id) {
      return dish;
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