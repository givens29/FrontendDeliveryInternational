let containers = document.querySelector('.main_container');
let RemoveId;
let totalItems = 0;

fetch(`https://food-delivery.kreosoft.ru/api/basket`, {
    method: 'GET',
    headers: {
        'accept': 'text/plain',
        'Authorization': "Bearer " + localStorage.getItem("access_token")
    }
})
    .then(response => response.json())
    .then(dish => {
        containers.innerHTML = '';
        dish.forEach((item, index) => {
            totalItems++;
            let dishElem = document.createElement('div');
            dishElem.className = 'row-md-4 mb-3';
            dishElem.innerHTML = `
          <div class="container">
            <div class="row">
              <div class="col-md-12 ">
                <ul class="list-group">
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span class="mx-2">${index + 1}.</span>
                    <div class="col-2 mx-2">
                      <img src="${item.image}" class="rounded card-img-top">
                    </div>
                    <h5 class="mx-2">${item.name}</h5>
                    <div class="col-md-6">
                      <div class="input-group">
                        <button class="decrease-button btn-outline-secondary" type="button">-</button>
                        <input type="text" class="form-control text-center quantity-input" value="${item.amount}">
                        <button class="increase-button btn-outline-secondary" type="button">+</button>
                      </div>
                    </div>
                    <p class="text-muted mx-2">${item.price}₽</p>             
                    <button type="button" class="remove-button btn-danger fixed">Remove</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        `;

            containers.appendChild(dishElem);

            let removeButton = dishElem.querySelector('.remove-button');
            let increaseButton = dishElem.querySelector('.increase-button');
            let decreaseButton = dishElem.querySelector('.decrease-button');
            let quantityInput = dishElem.querySelector('.quantity-input');

            let dishId = item.id;

            removeButton.addEventListener('click', function () {
                let listItem = removeButton.closest('li');
                listItem.remove();

                fetch(`https://food-delivery.kreosoft.ru/api/basket/dish/${dishId}?increase=false`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': "Bearer " + localStorage.getItem("access_token"),
                        'Accept': 'application/json'
                    }
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return;
                    })
                    .then(data => {
                    })
                    .catch(error => console.error(error));
            });

            increaseButton.addEventListener('click', function () {
                let quantity = parseInt(quantityInput.value);
                quantity++;
                quantityInput.value = quantity.toString();
                updateQuantity(dishId, quantity);
            });

            decreaseButton.addEventListener('click', function () {
                let quantity = parseInt(quantityInput.value);
                quantity--;
                quantityInput.value = quantity.toString();

                updateQuantity1(dishId, quantity);
            });
        });

        document.getElementById('cart-count').textContent = totalItems.toString();
    })
    .catch(error => console.error(error));

function updateQuantity(dishId, quantity) {
    fetch(`https://food-delivery.kreosoft.ru/api/basket/dish/${dishId}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("access_token"),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: quantity })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return;
        })
        .then(data => { })
        .catch(error => console.error(error));
}
function updateQuantity1(dishId, quantity) {
    fetch(`https://food-delivery.kreosoft.ru/api/basket/dish/${dishId}?increase=true`, {
        method: 'DELETE',
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("access_token"),
            'Accept': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return;
        })
        .then(data => {
        })
        .catch(error => console.error(error));
}

