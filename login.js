document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = loginForm.email.value;

        if (email) {
            localStorage.setItem('userEmail', email);
            window.location.href = 'quiz.html';
        } else {
            errorMessage.textContent = 'Por favor, insira um e-mail válido!';
        }
    });
});
