let form = document.getElementById('login');
let email = document.getElementById('email');
let password = document.getElementById('password')
form.addEventListener('submit', loginUser);

function loginUser(event) {
    event.preventDefault();

    let user = {
        email: form.elements.email.value,
        password: form.elements.password.value
    }

    fetch('https://food-delivery.kreosoft.ru/api/account/login', {
        method: 'POST',
        headers: { "accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(user)
    })
        .then(async response => {
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`HTTP Error: ${response.status}, Message: ${errorText}`);
                throw new Error(errorText);
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('access_token', data.token);
            window.location.href = '/profile.html';
        })
        .catch(error => {
            alert('Login failed', error.message)
            console.error('Login failed:', error);
        })
}