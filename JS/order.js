let dishId = localStorage.getItem('selectedDishId');
let container = document.querySelector('.orders-container');
let url = `https://food-delivery.kreosoft.ru/api/order`;

fetch(url, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem("access_token")
    }
})
    .then(response => response.json())
    .then(dish => {
        container.innerHTML = '';
        dish.forEach((item, index) => {
            let orderTime = item.orderTime.split("T")[0];
            let deliveryTime = new Date(item.deliveryTime);
            let formattedDeliveryTime = deliveryTime.toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
            let dishElem = document.createElement('div');
            dishElem.className = 'row-md-4 mb-3';

            if (item.status === 'InProcess') {
                dishElem.innerHTML = `
                    <div>
                        <div class="row">
                            <div class="col-md-12">
                                <ul class="list-group" id="order">
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        <div class="d-flex align-items-center">
                                            <ul class="list-group">
                                                <li class="list-group">
                                                    <h6>Order from ${orderTime}</h6>
                                                </li>
                                                <li class="list-group">
                                                    <p>Order status - ${item.status}</p>
                                                </li>
                                                <li class="list-group">
                                                    <p>Delivery time: ${formattedDeliveryTime}</p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="justify-content-end">
                                        <div class="row">
                                            <button type="button" class="btn btn-success confirmOrder">Confirm delivery</button>
                                        </div>
                                        <div class="justify-content-end">
                                            <div class="row">
                                                <h6>Total order cost: ${item.price}₽</h6>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
            }
            if (item.status === 'Delivered') {
                dishElem.innerHTML = `
                    <div>
                        <div class="row">
                            <div class="col-md-12">
                                <ul class="list-group" id="order">
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        <div class="d-flex align-items-center">
                                            <ul class="list-group">
                                                <li class="list-group">
                                                    <h6><u id="detail">Order from ${orderTime}</u></h6>
                                                </li>
                                                <li class="list-group">
                                                    <p>Order status - ${item.status}</p>
                                                </li>
                                                <li class="list-group">
                                                    <p>Delivery time: ${formattedDeliveryTime}</p>
                                                </li>
                                            </ul>
                                        </div>
                                            <div class="row">
                                                <h6>Total order cost: ${item.price}₽</h6>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
            }

            container.appendChild(dishElem);

            let url = 'https://food-delivery.kreosoft.ru/api/order/';
            let id = item.id;
            url += `${id}`;
            url += `/status`;
            let detail = document.getElementById('detail');
            detail.addEventListener('click', () => {
                window.location.href = `orderDetail.html?id=${item.id}`;
                localStorage.setItem("OrderDetail", item.id);
            });

            let confirmOrders = dishElem.querySelector('.confirmOrder');
            if (confirmOrders) {
                confirmOrders.addEventListener('click', () => {
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Authorization': "Bearer " + localStorage.getItem("access_token"),
                            'Accept': 'application/json'
                        }
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
            }
        });
    })
    .catch(error => console.error(error));

document.getElementById('createOrder').addEventListener('click', () => {
    window.location.href = 'purchase.html';
});
