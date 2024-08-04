document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    const registerMessage = document.getElementById('register-message');

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = registerForm.email.value;

        if (email.length >= 15) {
            fetch('process-register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    registerMessage.textContent = 'ESTAMOS CRIANDO A SUA CONTA, AGUARDE 5 MINUTINHOS';
                } else {
                    registerMessage.textContent = 'Houve um erro ao criar sua conta. Tente novamente.';
                }
            });
        } else {
            registerMessage.textContent = 'O e-mail deve ter pelo menos 15 caracteres!';
        }
    });
});
