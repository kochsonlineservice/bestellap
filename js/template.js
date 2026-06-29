function getDishTemplate(dish) {
  return `
                <div class="dish">


                    <div class ="dish_top">
                             <h3 class="dishes_line">${dish.name}</h3> 

                              <button onclick="addToBasket(${dish.id})" class="btn-plus">+</button>
                    </div>
                         
                            <p class="dishes_line">${dish.price.toFixed(2)} €</p>
                   
                            <p class="dishes_line">${dish.description}</p>

                   

                </div>
 
     `;
}

function getBasketTemplate(basketItem) {
  return `

    <div class="basket_items">

        <div class="basket_item_header">

    ${getRemoveButton(basketItem)}

    <p class="basket_item_name">
        ${basketItem.quantity}x ${basketItem.name}
    </p>

    <button class="basket_btn" onclick="addToBasket(${basketItem.id})">➕</button>

</div>
        </div>

        <p class="basket_item_price">
            ${(basketItem.price * basketItem.quantity).toFixed(2)} €
        </p>

    </div>

  `;

  renderBasket();
}


 