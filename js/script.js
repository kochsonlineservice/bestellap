function init() {
  renderMainDishes();
  renderDesserts();
  renderDrinks();
}

function renderMainDishes() {
  let html = "";

  let contentRef = document.getElementById("mainDishes");

  for (let index = 0; index < mainDish.hauptgerichte.length; index++) {
    let dish = mainDish.hauptgerichte[index];

    html += getDishTemplate(dish);
  }
  contentRef.innerHTML = html;
}

function renderDesserts() {
  let html = "";

  let contentRef = document.getElementById("desserts");

  for (let index = 0; index < mainDish.nachspeisen.length; index++) {
    let dessert = mainDish.nachspeisen[index];

    html += getDishTemplate(dessert);
  }
  contentRef.innerHTML = html;
}

function renderDrinks() {
  let html = "";

  let contentRef = document.getElementById("drinks");

  for (let index = 0; index < mainDish.getränke.length; index++) {
    let drink = mainDish.getränke[index];

    html += getDishTemplate(drink);
  }

  contentRef.innerHTML = html;
}
