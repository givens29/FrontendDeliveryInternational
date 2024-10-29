let profileForm = document.getElementById('profile');
let dataForm = document.getElementById('data-form');
fetch('https://food-delivery.kreosoft.ru/api/account/profile', {
    method: 'GET',
    headers: {
        'Authorization': "Bearer " + localStorage.getItem("access_token"),
        'Accept': 'application/json'
    }
})
    .then(response => response.json())
    .then(data => {
        let name = document.getElementById('name');
        name.value = data.fullName;
        let email = document.getElementById('email');
        email.value = data.email;
        let birthdate = document.getElementById('birthdate');
        let date = new Date(data.birthDate);
        let formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        birthdate.value = formattedDate;
        let gender = document.getElementById('gender');
        gender.value = data.gender;
        let address = document.getElementById('address');
        address.value = data.address;
        let phonenumber = document.getElementById('phone-number');
        phonenumber.value = data.phoneNumber;

    })
    .catch(error => console.error(error));

let editProfile = document.getElementById('editProfile');
editProfile.addEventListener('click', function () {
    event.preventDefault();
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let birthdate = document.getElementById('birthdate');
    let gender = document.getElementById('gender');
    let address = document.getElementById('address');
    let phonenumber = document.getElementById('phone-number');
    let editProfile = {
        fullName: name.value,
        birthDate: birthdate.value,
        gender: gender.value,
        address: address.value,
        phoneNumber: phonenumber.value
    }
    fetch('https://food-delivery.kreosoft.ru/api/account/profile', {
        method: 'PUT',
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("access_token"),
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editProfile)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return;
        })
        .then(data => { })
        .catch(error => console.error(error));
});
