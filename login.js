document.addEventListener('DOMContentLoaded', function() {
    const emailForm = document.getElementById('email-form');
    const emailError = document.getElementById('email-error');

    emailForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;

        // Verifica se o e-mail está no formato correto (apenas validação básica)
        if (email.includes('@')) {
            window.location.href = 'quiz.html';
        } else {
            emailError.textContent = 'Por favor, forneça um e-mail válido.';
        }
    });
});
