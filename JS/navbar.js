var access = localStorage.getItem("access_token");
var logoutButton = document.getElementById('logout');

if (access) {
    fetch('https://food-delivery.kreosoft.ru/api/account/profile', {
        method: 'GET',
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("access_token"),
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            let userEmail = data.email;
            let userEmailElement = document.getElementById('user-email');
            userEmailElement.innerText = userEmail;
            userEmailElement.addEventListener('click', () => {
                window.location.href = 'profile.html';
            });
        })
        .catch(error => console.error(error));

    let totalItem = 0;

    fetch(`https://food-delivery.kreosoft.ru/api/basket`, {
        method: 'GET',
        headers: {
            'accept': 'text/plain',
            'Authorization': "Bearer " + localStorage.getItem("access_token")
        }
    })
        .then(response => response.json())
        .then(dish => {
            dish.forEach((item, index) => {
                totalItem++;
            })
            document.getElementById('cart-count').textContent = totalItem.toString();
        })

        .catch(error => console.error(error))

    document.getElementById('logout').addEventListener('click', function () {
        fetch('https://food-delivery.kreosoft.ru/api/account/logout', {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("access_token"),
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                localStorage.removeItem("access_token");
                logoutButton.remove();
                let container = document.getElementById('userEmail');
                container.innerHTML = '';
                let logincontainer = document.createElement('div');
                logincontainer.innerHTML = `<div>
    <button type="button" class="btn btn-success" id="login">Login</button>
    </div>`;
                let clicklogin = logincontainer.querySelector('.btn');
                clicklogin.addEventListener('click', () => {
                    window.location.href = `login.html`;
                })
                container.appendChild(logincontainer);
            })
            .catch(error => console.error(error));
    });
}
else {
    logoutButton.style.display = 'none';
    let container = document.getElementById('userEmail');
    container.innerHTML = '';
    let logincontainer = document.createElement('div');
    logincontainer.innerHTML = `<div>
    <button type="button" class="btn btn-success" id="login">Login</button>
    </div>`;
    let clicklogin = logincontainer.querySelector('.btn');
    clicklogin.addEventListener('click', () => {
        window.location.href = `login.html`;
    })
    container.appendChild(logincontainer);
}
document.querySelector('.btnNavbar').addEventListener('click', function () {
    let navbar = document.getElementById('navbarNav');
    navbar.classList.toggle('collapse');
});



