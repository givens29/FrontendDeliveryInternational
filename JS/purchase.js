let container = document.querySelector('.main_container');
let form = document.getElementById('createOrder');
let totalPrice = 0;
fetch('https://food-delivery.kreosoft.ru/api/account/profile', {
    method: 'GET',
    headers: {
        'Authorization': "Bearer " + localStorage.getItem("access_token"),
        'Accept': 'application/json'
    }
})
    .then(response => response.json())
    .then(data => {
        let phonenumber = document.getElementById('phone-number');
        phonenumber.value = data.phoneNumber;
        let email = document.getElementById('email');
        email.value = data.email;
    })
    .catch(error => console.error(error));

let containers = document.querySelector('.itemList');

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
            let totalItemPrice = item.price * item.amount;
            let itemTotalPrice = item.price * item.amount;
            totalPrice += itemTotalPrice;
            let dishElem = document.createElement('div');
            dishElem.className = 'row-md-4 mb-3';
            dishElem.innerHTML = `
          <div>
            <div class="row">
              <div class="col-md-12">
                <ul class="list-group">
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span>${index + 1}.</span>
                    <div class="col-md-3">
                      <img src="${item.image}" class="rounded card-img-top">
                    </div>
                    <div class="col-md-6 d-flex align-items-center">
                    <ul class="list-group">
                    <li class="list-group">
                    <h5>${item.name}</h5>
                    </li>
                    <li class="list-group">
                    <p>Price:  ${item.price}₽/dish</p>
                    </li>
                    <li class="list-group">
                    <p>Quantity: ${item.amount}</p>
                    </li>
                    </ul>
                  </div>
                  <p class="text-muted ml-3">Price: ${totalItemPrice}₽</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        `;
            containers.appendChild(dishElem);
        })
        let totalElem = document.createElement('div');
        totalElem.innerHTML = `
        <div>
          <p>Total: ${totalPrice}₽</p>
          <button type="button" class="btn btn-success confirmOrder">Confirm Order</button>
        </div>
      `;
        containers.appendChild(totalElem);

        let confirmOrders = document.querySelector('.confirmOrder');
        confirmOrders.addEventListener('click', () => {
            let orderConf = {
                deliveryTime: document.getElementById('delivery-time').value,
                address: document.getElementById('delivery-address').value
            }
            fetch('https://food-delivery.kreosoft.ru/api/order', {
                method: 'POST',
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem("access_token"),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderConf)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(data => {
                })
                .catch(error => console.error(error));
        });
    })

    .catch(error => console.error(error))  