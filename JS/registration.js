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
        .then(response => {
            if (!response.ok) {
                alert(`${response.status} Registration failed! Status`);
                throw new Error(`${response.status} Registration failed! Status`);
            }
            return response.json();
        })
        .then(data => {
            alert('Register successful');
            console.log('Register successful');
        })
        .catch(error => {
            alert('Registration failed!');
            console.error('Registration failed!');
        })
}