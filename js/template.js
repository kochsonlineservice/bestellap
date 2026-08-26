function getDishTemplate(dish) {
  return `
    <div class="dish">
      <img
        class="dish_img"
        src="${dish.image}"
        alt="${dish.name}"
      >

      <div class="dish_content">
        <div class="dish_header">
          <h3 class="dish_name">
            ${dish.name}
          </h3>

          <p class="dish_price">
            ${dish.price.toFixed(2)} €
          </p>
        </div>

        <p class="dish_description">
          ${dish.description}
        </p>

        <button
          id="add-button-${dish.id}"
          onclick="addToBasket(${dish.id})"
          class="add_button"
        >
          Add to basket
        </button>
      </div>
    </div>
  `;
}

function getBasketTemplate(basketItem) {
  return `
    <div class="basket_items">
      <p class="basket_item_name">
        ${basketItem.quantity}x ${basketItem.name}
      </p>

      <div class="basket_item_footer">
       <div class="basket_quantity_controls">
  ${getRemoveButton(basketItem)}

  ${getDeleteButtonTemplate(basketItem.id)}

  <button
    class="basket_btn"
    onclick="addToBasket(${basketItem.id})"
  >
    ➕
  </button>
</div>

        <p class="basket_item_price">
          ${(basketItem.price * basketItem.quantity).toFixed(2)} €
        </p>
      </div>
    </div>
  `;
}

function getEmptyBasketTemplate() {
  return `
    <div class="empty_basket">
      <p>Nothing here yet.</p>
      <p>Go ahead and choose something delicious!</p>
      <span class="empty_basket_icon">🛒</span>
    </div>
  `;
}

function getDeleteButtonTemplate(id) {
  return `
    <button
      class="basket_btn"
      onclick="deleteFromBasket(${id})"
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

function deleteFromBasket(id) {
  basket = basket.filter((basketItem) => basketItem.id !== id);

  localStorage.setItem("basket", JSON.stringify(basket));

  renderBasket();
  updateBasketCount();
}
