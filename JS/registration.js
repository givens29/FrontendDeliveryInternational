let form = document.getElementById('register');
form.addEventListener('submit', registerUser);

function registerUser(event) {
    event.preventDefault();

    let user = {
        fullName: form.elements.name.value,
        password: form.elements.password.value,
        email: form.elements.email.value,
        addressId: form.elements.address.value,
        birthDate: new Date(form.elements.birthDate.value).toISOString(),
        gender: form.elements.gender.value,
        phoneNumber: form.elements.phoneNumber.value,
    }

    fetch('https://food-delivery.kreosoft.ru/api/account/register', {
        method: 'POST',
        headers: { "accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(user)
    })
        .then(async response => {
            if (!response.ok) {
                alert(`Registration failed: ${response.status}`);
                const errorText = await response.text();
                console.error(`HTTP Error: ${response.status}, Message: ${errorText}`);
                throw new Error(errorText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Register successful:', data);
        })
        .catch(error => {
            console.error('Registration failed:', error.message || error);
        });
}