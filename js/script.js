
let basket = [];
const deliveryCosts = 5;


function init() {
  loadBasket();
  renderMenu();
  renderBasket();
  updateBasketCount();
}

function loadBasket() {
  let savedBasket = localStorage.getItem("basket");

  if (savedBasket) {
    basket = JSON.parse(savedBasket);
  }
}

function renderMenu() {
  renderBurger();
  renderPizza();
  renderSalat();
  renderGetraenke();
  renderDessert();
}



function renderBurger() {
  renderCategory(menu.burger, "burger_content");
}

function renderPizza() {
  renderCategory(menu.pizza, "pizza_content");
}

function renderSalat() {
  renderCategory(menu.salat, "salat_content");
}

function renderGetraenke() {
  renderCategory(menu.getraenke, "getraenke_content");
}

function renderDessert() {
  renderCategory(menu.dessert, "dessert_content");
}

function renderCategory(category, contentId) {
  let html = "";
  let contentRef = document.getElementById(contentId);

  for (let index = 0; index < category.length; index++) {
    html += getDishTemplate(category[index]);
  }

  contentRef.innerHTML = html;
}



function getDishById(id) {
  let categories = getMenuCategories();

  for (let index = 0; index < categories.length; index++) {
    let dish = findDishInCategory(categories[index], id);

    if (dish) {
      return dish;
    }
  }
}

function getMenuCategories() {
  return [
    menu.burger,
    menu.pizza,
    menu.salat,
    menu.getraenke,
    menu.dessert,
  ];
}

function findDishInCategory(category, id) {
  for (let index = 0; index < category.length; index++) {
    if (category[index].id === id) {
      return category[index];
    }
  }
}

function addToBasket(id) {
  let dish = getDishById(id);

  if (!dish) {
    return;
  }

  let basketItem = basket.find((item) => item.id === dish.id);

  if (basketItem) {
    basketItem.quantity++;
  } else {
    addNewBasketItem(dish);
  }

  saveAndRenderBasket();
  updateAddButton(id);
}

function addNewBasketItem(dish) {
  let basketItem = {
    id: dish.id,
    name: dish.name,
    price: dish.price,
    description: dish.description,
    quantity: 1,
  };

  basket.push(basketItem);
}

function removeFromBasket(id) {
  let basketItem = basket.find((item) => item.id === id);

  if (!basketItem) {
    return;
  }

  if (basketItem.quantity === 1) {
    removeBasketItem(id);
  } else {
    basketItem.quantity--;
  }

  saveAndRenderBasket();
  updateAddButton(id);
}

function deleteFromBasket(id) {
  basket = basket.filter((basketItem) => basketItem.id !== id);

  saveAndRenderBasket();
  updateAddButton(id);
}

function deleteFromBasket(id) {
  basket = basket.filter((basketItem) => basketItem.id !== id);

  localStorage.setItem("basket", JSON.stringify(basket));

  renderBasket();
  updateBasketCount();
}

function removeBasketItem(id) {
  let index = basket.findIndex((item) => item.id === id);

  basket.splice(index, 1);
}

function saveBasket() {
  localStorage.setItem("basket", JSON.stringify(basket));
}

function saveAndRenderBasket() {
  saveBasket();
  renderBasket();
  updateBasketCount();
}

function updateAddButton(id) {
  let button = document.querySelector(`#add-button-${id}`);
  let basketItem = basket.find((item) => item.id === id);

  if (!button) {
    return;
  }

  if (basketItem) {
    button.textContent = `Added ${basketItem.quantity}`;
  } else {
    button.textContent = "Add to basket";
  }
}


function renderBasket() {
  let html = getBasketTitleTemplate();
  html += getBasketContent();

  renderBasketContent(html);
  renderBasketDialog(html);
}

function getBasketTitleTemplate() {
  return `
    <h4 class="basket_title">🛒 Your Basket</h4>
  `;
}

function getBasketContent() {
  if (basket.length === 0) {
    return getEmptyBasketTemplate();
  }

  return getFilledBasketTemplate();
}

function getFilledBasketTemplate() {
  let totalPrice = getTotalPrice();
  let html = getBasketItemsTemplate();
  html += getBasketTotalTemplate(totalPrice);

  return html;
}

function getBasketItemsTemplate() {
  let html = `<div class="basket_items_container">`;

  for (let index = 0; index < basket.length; index++) {
    html += getBasketTemplate(basket[index]);
  }

  html += `</div>`;

  return html;
}

function getTotalPrice() {
  let totalPrice = 0;

  for (let index = 0; index < basket.length; index++) {
    totalPrice += basket[index].price * basket[index].quantity;
  }

  return totalPrice;
}

function getDeliveryCosts(totalPrice) {
  if (totalPrice >= 50) {
    return 0;
  }

  return deliveryCosts;
}

function getBasketTotalTemplate(totalPrice) {
  let currentDeliveryCosts = getDeliveryCosts(totalPrice);
  let finalPrice = totalPrice + currentDeliveryCosts;

  return `
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

function renderBasketContent(html) {
  let contentRef = document.getElementById("basket");
  contentRef.innerHTML = html;
}

function renderBasketDialog(html) {
  let dialogContentRef = document.getElementById("basket_dialog_content");

  if (dialogContentRef) {
    dialogContentRef.innerHTML = html;
  }
}


function getRemoveButton(basketItem) {
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

function getDeleteButtonTemplate(id) {
  return `
    <button
      class="basket_btn"
      onclick="removeFromBasket(${id})"
      aria-label="Remove item from basket"
    >
      🗑️
    </button>
  `;
}

function getDecreaseButtonTemplate(id) {
  return `
    <button
      class="basket_btn"
      onclick="removeFromBasket(${id})"
      aria-label="Decrease quantity"
    >
      ➖
    </button>
  `;
}

function order() {
  basket = [];

  localStorage.setItem("basket", JSON.stringify(basket));

  renderBasket();
  updateBasketCount();

  document.getElementById("order_dialog").showModal();
}

function closeOrderDialog() {
  document.getElementById("order_dialog").close();
}

// =======================================
// Basket Dialog
// =======================================

function openBasketDialog() {
  document.getElementById("basket_dialog").showModal();
}

function closeBasketDialog() {
  document.getElementById("basket_dialog").close();
}


function updateBasketCount() {
  let basketCount = 0;

  for (let index = 0; index < basket.length; index++) {
    basketCount += basket[index].quantity;
  }

  document.getElementById("basket_count").textContent = basketCount;
}



const toTopButton = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
  toggleToTopButton();
});

function toggleToTopButton() {
  if (window.scrollY > 500) {
    toTopButton.style.display = "block";
  } else {
    toTopButton.style.display = "none";
  }
}

toTopButton.addEventListener("click", () => {
  scrollToTop();
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}


const homeButton = document.getElementById("home_button");

homeButton.addEventListener("click", () => {
  scrollToTop();
});