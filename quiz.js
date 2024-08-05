document.addEventListener('DOMContentLoaded', () => {
    const startQuizButton = document.getElementById('start-quiz');
    const emailInput = document.getElementById('email-input');

    startQuizButton.addEventListener('click', () => {
        const email = emailInput.value.trim();
        
        if (email === '') {
            alert('Por favor, insira um e-mail antes de iniciar o quiz.');
            return;
        }

        // Verificar se o e-mail já está registrado
        fetch('check-email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `email=${encodeURIComponent(email)}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.exists) {
                alert('Você já está registrado. Você não precisa refazer o quiz.');
                window.location.href = 'index-logged-in.htm'; // Redirecionar para a página após login
            } else {
                // Iniciar o quiz
                window.location.href = 'quiz.html';
            }
        })
        .catch(error => console.error('Erro:', error));
    });
});
