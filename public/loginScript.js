document.addEventListener('DOMContentLoaded', function () {
    // Handle login button click
    let loginBtn = document.getElementById('submitLogin')
    loginBtn.addEventListener('click', function (e) {
        e.preventDefault()
        let loginForm = document.getElementById('loginForm')
        let formData = new FormData(loginForm)
        let data = {
            username: formData.get('username'),
            password: formData.get('password')
        }

        fetch(`http://localhost:3006/user/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then((data) => {
            if (data.success) {
                localStorage.removeItem('token')
                localStorage.setItem('token', data.token)
                window.location.href = 'http://localhost:3006/home'
            }
        })
    })

    // Handle register
    let registerBtn = document.getElementById('submitRegister')
    registerBtn.addEventListener('click', function (e) {
        e.preventDefault()
        let registerForm = document.getElementById('registerForm')
        let formData = new FormData(registerForm)
        let data = {
            username: formData.get('username'),
            password: formData.get('password'),
            role: formData.get('role')
        }

        fetch(`http://localhost:3006/user/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then((data) => {
            document.getElementById('registerMessage').innerText = data.message
        })
    })
})