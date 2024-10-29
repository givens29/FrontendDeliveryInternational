let form = document.getElementById('register');
form.addEventListener('submit', registerUser);

function registerUser(event) {
    event.preventDefault();

    let user = {
        fullName: form.elements.name.value,
        password: form.elements.password.value,
        email: form.elements.email.value,
        address: form.elements.address.value,
        birthDate: form.elements.birthDate.value,
        gender: form.elements.gender.value,
        phoneNumber: form.elements.phoneNumber.value,
    }

    fetch('https://food-delivery.kreosoft.ru/api/account/register', {
        method: 'POST',
        headers: { "accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Register successful:', data);
        })
        .catch(error => {
            console.error('Registration failed:', error);
        })
}