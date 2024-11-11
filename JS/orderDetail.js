let container = document.querySelector('.orderDetail-container');
let orderId = localStorage.getItem("OrderDetail");
let totalPrice = 0;
let url = `https://food-delivery.kreosoft.ru/api/order/`;
url += `${orderId}`;
fetch(url, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem("access_token")
    }
})
    .then(response => response.json())
    .then(order => {
        let orderTime = order.orderTime.split("T")[0];
        let deliveryTime = new Date(order.deliveryTime);
        let formattedDeliveryTime = deliveryTime.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
        container.innerHTML = '';
        let dishElem = document.createElement('div');
        dishElem.className = 'row-md-4 mb-3';
        dishElem.innerHTML = `
    <div class="row">
    <p>Created at: ${orderTime}</p>
      <p>Delivery time: ${formattedDeliveryTime}</p>
      <p>Delivery address: ${order.address}</p>
      </div>
      <div class="row">
      <p>Order status - ${order.status}</p>
      </div>
    `;
        container.appendChild(dishElem);
        let dishesContainer = document.createElement('div');
        dishesContainer.className = 'dishes-container';

        order.dishes.forEach((dish, index) => {
            let totalItemPrice = dish.price * dish.amount;
            let itemTotalPrice = dish.price * dish.amount;
            totalPrice += itemTotalPrice;
            let dishElem = document.createElement('div');
            dishElem.className = 'dish-item';
            dishElem.innerHTML = `
    <div class="row">
    <div class="col">
      <img src="${dish.image}" alt="${dish.name}" class="dish-image img-thumbnail">
    </div>
    <div class="col">
      <h5 class="dish-name">${dish.name}</h5>
      <p class="dish-price">Price: ${dish.price}₽/dish</p>
      <p class="dish-amount">Quantity: ${dish.amount}</p>
    </div>
    <div class="col">
    <p class="text-muted ml-3">Price: ${totalItemPrice}₽</p>
    </div>
      </div>
      `;
            dishesContainer.appendChild(dishElem);
        });
        container.appendChild(dishesContainer);
        let totalElem = document.createElement('div');
        totalElem.innerHTML = `
        <div>
          <p>Total: ${totalPrice}₽</p>
        </div>
      `;
        container.appendChild(totalElem);
    })
    .catch(error => console.error(error)
    );