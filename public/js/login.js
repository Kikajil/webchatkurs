document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (response.status === 200) {
            localStorage.setItem('token', result.token);
            window.location.href = '/admin.html'; // или главная страница
        } else {
            document.getElementById('error-message').innerText = result.message;
        }
    } catch (error) {
        console.error('Error logging in:', error);
    }
});
