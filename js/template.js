function getDishTemplate(dish) {
  return `
                <div class="dish">


                    <div class ="dish_top">
                             <h3 class="dishes_line">${dish.name}</h3> 

                              <button class="btn-plus">+</button>
                    </div>
                         
                            <p class="dishes_line">${dish.price.toFixed(2)} €</p>
                   
                            <p class="dishes_line">${dish.description}</p>

                   

                </div>
 
     `;
}


function getBasketTemplate(basketItem){
        return`
        
        
        `



}