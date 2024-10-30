let container = document.querySelector('.main_container');
let paginationLinks = document.querySelectorAll('.pagination .page-link');
let paginationContainer = document.getElementById('pagination-container');
let applyFilterButton = document.querySelector('.normBtn button');
let menuItems = document.querySelectorAll('#menu-categories .dropdown-item');
let sortingDropdown = document.querySelectorAll('#A-Z .dropdown-item');
let vegetarianFilter = document.querySelector('#vegetarian-filter');
let selectedDishId;
let pageNumber = 1;
fetch(`https://food-delivery.kreosoft.ru/api/dish`, {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
})
    .then(response => response.json())
    .then(data => {
        container.innerHTML = '';
        data.dishes.forEach(dish => {
            let dishElem = document.createElement('div');
            dishElem.className = 'col-md-4 mb-3';
            dishElem.innerHTML = `
            <div class="card" data-id="${dish.id}">
              <img src="${dish.image}" class="card-img-top">
              <div class="card-body box1">
                <h5 class="text-uppercase">${dish.name}</h5>
                <p>Dish category-${dish.category}</p>
              </div>
                <div class="rating card-body">
                </div>
                <div class="card-body">
                <p class="card-text">${dish.description}</p>
                </div>
                <div class="container-price text-black card-body ">
                  <span>Price-${dish.price}₽</span>
                  <button type="button" class="btn btn-primary add-to-cart-btn">Add to card</button>
                </div>
            </div>
          `;
            let starsContainer = dishElem.querySelector('.rating');
            let rating = dish.rating;
            starsContainer.innerHTML = '';
            for (let i = 0; i < Math.floor(rating); i++) {
                let star = document.createElement('div');
                star.classList.add('star', 'gold');
                starsContainer.appendChild(star);
            }

            if (rating % 1 !== 0) {
                let halfStar = document.createElement('div');
                halfStar.classList.add('star', 'half');
                starsContainer.appendChild(halfStar);
            }

            let emptyStarsCount = 10 - Math.ceil(rating);

            for (let i = 0; i < emptyStarsCount; i++) {
                let emptyStar = document.createElement('div');
                emptyStar.classList.add('star');
                starsContainer.appendChild(emptyStar);
            }

            let addToCartBtn = dishElem.querySelector('.add-to-cart-btn');

            addToCartBtn.addEventListener('click', (event) => {
                let selectedDish = dish.id;
                let button = event.target;
                fetch(`https://food-delivery.kreosoft.ru/api/basket/dish/${selectedDish}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': "Bearer " + localStorage.getItem("access_token"),
                    }
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return response.text();
                    })
                    .then(data => {
                        button.classList.add('added-to-cart');
                        button.innerText = 'Added to Cart';
                        button.disabled = true;
                    })
                    .catch(error => console.error(error));
            });
            let clickdish = dishElem.querySelector('.box1');
            clickdish.addEventListener('click', () => {
                window.location.href = `menuitem.html?id=${dish.id}`;
            });
            container.appendChild(dishElem);
        });
    })
    .catch(error => console.error(error));

paginationLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        let pageNumber = parseInt(e.target.getAttribute('href').substring(1));
        fetch(`https://food-delivery.kreosoft.ru/api/dish?page=${pageNumber}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                container.innerHTML = '';

                data.dishes.forEach(dish => {
                    let dishElem = document.createElement('div');
                    dishElem.className = 'col-md-4 mb-3';
                    dishElem.innerHTML = `
          <div class="card" data-id="${dish.id}">
          <img src="${dish.image}" class="card-img-top">
          <div class="card-body box1">
            <h5 class="text-uppercase">${dish.name}</h5>
            <p>Dish category-${dish.category}</p>
          </div>
            <div class="rating card-body">
            </div>
            <div class="card-body">
            <p class="card-text">${dish.description}</p>
            </div>
            <div class="container-price text-black card-body ">
              <span>Price-${dish.price}₽</span>
              <button type="button" class="btn btn-primary add-to-cart-btn">Add to card</button>
            </div>
        </div>
          `;
                    let starsContainer = dishElem.querySelector('.rating');
                    let rating = dish.rating;

                    starsContainer.innerHTML = '';
                    for (let i = 0; i < Math.floor(rating); i++) {
                        let star = document.createElement('div');
                        star.classList.add('star', 'gold');
                        starsContainer.appendChild(star);
                    }

                    if (rating % 1 !== 0) {
                        let halfStar = document.createElement('div');
                        halfStar.classList.add('star', 'half');
                        starsContainer.appendChild(halfStar);
                    }

                    let emptyStarsCount = 10 - Math.ceil(rating);

                    for (let i = 0; i < emptyStarsCount; i++) {
                        let emptyStar = document.createElement('div');
                        emptyStar.classList.add('star');
                        starsContainer.appendChild(emptyStar);
                    }

                    paginationLinks.forEach(link => {
                        link.classList.remove('active');
                    });
                    link.classList.add('active');
                    let addToCartBtn = dishElem.querySelector('.add-to-cart-btn');

                    addToCartBtn.addEventListener('click', (event) => {
                        let selectedDish = dish.id;
                        let button = event.target;
                        fetch(`https://food-delivery.kreosoft.ru/api/basket/dish/${selectedDish}`, {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Authorization': "Bearer " + localStorage.getItem("access_token"),
                            }
                        })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error(`HTTP error! status: ${response.status}`);
                                }
                                return response.text();
                            })
                            .then(data => {
                                button.classList.add('added-to-cart');
                                button.innerText = 'Added to Cart';
                                button.disabled = true;
                            })
                            .catch(error => console.error(error));
                    });
                    let clickdish = dishElem.querySelector('.box1');
                    clickdish.addEventListener('click', () => {
                        window.location.href = `menuitem.html?id=${dish.id}`;
                    });
                    container.appendChild(dishElem);
                });
            })
            .catch(error => console.error(error));
    });
});
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        menuItems.forEach(item => {
            item.classList.remove('active');
        });
        item.classList.add('active');
        paginationContainer.style.display = 'none';
    });
});
sortingDropdown.forEach(item => {
    item.addEventListener('click', () => {
        sortingDropdown.forEach(item => {
            item.classList.remove('active');
        });
        item.classList.add('active');
    });
});
applyFilterButton.addEventListener('click', () => {

    let url = 'https://food-delivery.kreosoft.ru/api/dish';
    menuItems.forEach(item => {
        if (item.classList.contains('active')) {
            let category = item.id;
            url += `?categories=${category}`;
        }
    });
    if (vegetarianFilter.checked) {
        url += '&vegetarian=true';
    } else {
        url += '&vegetarian=false';
    }
    sortingDropdown.forEach(item => {
        if (item.classList.contains('active')) {
            let sorting = item.id;
            url += `&sorting=${sorting}`;
        }
    });
    url += `&page=${pageNumber}`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            container.innerHTML = '';

            data.dishes.forEach(dish => {
                let dishElem = document.createElement('div');
                dishElem.className = 'col-md-4 mb-3';
                dishElem.innerHTML = `
          <div class="card" data-id="${dish.id}">
          <img src="${dish.image}" class="card-img-top">
          <div class="card-body box1">
            <h5 class="text-uppercase">${dish.name}</h5>
            <p>Dish category-${dish.category}</p>
          </div>
            <div class="rating card-body">
            </div>
            <div class="card-body">
            <p class="card-text">${dish.description}</p>
            </div>
            <div class="container-price text-black card-body ">
              <span>Price-${dish.price}₽</span>
              <button type="button" class="btn btn-primary add-to-cart-btn">Add to card</button>
            </div>
        </div>
          `;
                let starsContainer = dishElem.querySelector('.rating');
                let rating = dish.rating;

                starsContainer.innerHTML = '';
                for (let i = 0; i < Math.floor(rating); i++) {
                    let star = document.createElement('div');
                    star.classList.add('star', 'gold');
                    starsContainer.appendChild(star);
                }

                if (rating % 1 !== 0) {
                    let halfStar = document.createElement('div');
                    halfStar.classList.add('star', 'half');
                    starsContainer.appendChild(halfStar);
                }

                let emptyStarsCount = 10 - Math.ceil(rating);

                for (let i = 0; i < emptyStarsCount; i++) {
                    let emptyStar = document.createElement('div');
                    emptyStar.classList.add('star');
                    starsContainer.appendChild(emptyStar);
                }

                let addToCartBtn = dishElem.querySelector('.add-to-cart-btn');

                addToCartBtn.addEventListener('click', (event) => {
                    let selectedDish = dish.id;
                    let button = event.target;
                    fetch(`https://food-delivery.kreosoft.ru/api/basket/dish/${selectedDish}`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': "Bearer " + localStorage.getItem("access_token"),
                        }
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            return response.text();
                        })
                        .then(data => {
                            button.classList.add('added-to-cart');
                            button.innerText = 'Added to Cart';
                            button.disabled = true;
                        })
                        .catch(error => console.error(error));
                });
                let clickdish = dishElem.querySelector('.box1');
                clickdish.addEventListener('click', () => {
                    window.location.href = `menuitem.html?id=${dish.id}`;
                });
                container.appendChild(dishElem);
            });
        })
        .catch(error => console.error(error));
});
