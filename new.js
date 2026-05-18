document.addEventListener('DOMContentLoaded', function () {
    const signupBtn = document.getElementById('signupBtn');
    const signInBtn = document.getElementById('signInBtn');
    const closePopup = document.getElementById('closePopup');
    const closeSignInPopup = document.getElementById('closeSignInPopup');
    const popup = document.getElementById('popup');
    const signInPopup = document.getElementById('signInPopup');
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');

    signupBtn.addEventListener('click', function () {
        popup.style.display = 'flex';
    });

    signInBtn.addEventListener('click', function () {
        signInPopup.style.display = 'flex';
    });

    closePopup.addEventListener('click', function () {
        popup.style.display = 'none';
    });

    closeSignInPopup.addEventListener('click', function () {
        signInPopup.style.display = 'none';
    });

    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(signupForm);

        fetch('http://localhost/VeilNova/register.php', {
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            if (data.message === "User registered successfully!") {
                popup.style.display = 'none';
                signupForm.reset();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred while submitting the form.");
        });
    });

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(loginForm);

        fetch('http://localhost/VeilNova/login.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            if (data.message === "Login successful!") {
                signInPopup.style.display = 'none';
                loginForm.reset();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred while submitting the form.");
        });
    });
});
