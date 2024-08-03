document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    if (result.success) {
        window.location.href = 'index.html';
    } else {
        document.getElementById('login-message').textContent = result.error;
    }
});
