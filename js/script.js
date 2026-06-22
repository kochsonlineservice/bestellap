function init() {
  renderMainDishes();
  renderDesserts();
  renderDrinks();
  renderBasket();
}

function renderMainDishes() {
  let html = `
  <h2 class="category_title">🍕 Hauptgerichte</h2>
  `
;

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
  `
  
  ;

  let contentRef = document.getElementById("drinks");

  for (let index = 0; index < mainDish.getränke.length; index++) {
    let drink = mainDish.getränke[index];

    html += getDishTemplate(drink);
  }

  contentRef.innerHTML = html;
}


// basket rendern

 let basket =[]

 function renderBasket(){
    let html = `
                 <h4 class="basket_title">🛒 Warenkorb</h4>
    `

    let contentRef = document.getElementById("basket");


    for (let index = 0; index < basket.length; index++) {
          
      let basketItem = basket[index];
      
      html += getBasketTemplate(basketItem);

      
    }

     contentRef.innerHTML = html;

 }
 
