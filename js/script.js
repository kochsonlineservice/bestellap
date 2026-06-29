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
  `;

  let contentRef = document.getElementById("drinks");

  for (let index = 0; index < mainDish.getränke.length; index++) {
    let drink = mainDish.getränke[index];

    html += getDishTemplate(drink);
  }

  contentRef.innerHTML = html;
}

// basket rendern

 let basket =[]

 const deliveryCosts = 5;

 function getDishById(id){
    for (let index = 0; index < mainDish.hauptgerichte.length; index++) {

    let dish = mainDish.hauptgerichte[index];

    if (dish.id === id){

      return dish;
    }
}


  for (let index = 0; index < mainDish.nachspeisen.length; index++) {

    let dish = mainDish.nachspeisen[index];

    if (dish.id === id){

      return dish;
    }
}


for (let index = 0; index < mainDish.getränke.length; index++) {

    let dish = mainDish.getränke[index];

    if (dish.id === id){

      return dish;
    }
}


 }

 function renderBasket(){

    let html = `
                 <h4 class="basket_title">🛒 Warenkorb</h4>
    `

    let contentRef = document.getElementById("basket");

    let totalPrice = 0;

        for (let index = 0; index < basket.length; index++) {
          
                let basketItem = basket[index];

                totalPrice += basketItem.price * basketItem.quantity;
      
                 html += getBasketTemplate(basketItem);
    }


    if (basket.length >0){


      let currentDeliveryCosts = deliveryCosts;

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
                  <h3 class="total_price_basket">Gesamt: ${finalPrice.toFixed(2)} €</h3>
 
                <button class="order_button">
                     Bestellen
                </button>
     
         </div>

      
    

     
`

;
}

     contentRef.innerHTML = html;
         
 }

function addToBasket(id) {

    let dish = getDishById(id);

    if (!dish) {
        return;
    }

    let found = false;

      for (let index = 0; index < basket.length; index++) {

    let currentBasketItem = basket[index];

    if (currentBasketItem.id === dish.id) {
        currentBasketItem.quantity++;


    console.log("Gefunden:", currentBasketItem);
        found = true;
        break;
    }
}

if (!found) {
  

  let basketItem = {
    id: dish.id,
    name: dish.name,
    price: dish.price,
    description: dish.description,
    quantity: 1
};

basket.push(basketItem);
}

 renderBasket();
}


function removeFromBasket(id) {

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




