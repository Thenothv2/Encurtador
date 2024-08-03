// login.js
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário padrão
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Aqui você pode validar com um backend real ou usar um valor fixo para teste
    if (username === 'admin' && password === 'senha123') {
        window.location.href = 'dashboard.html'; // Redireciona para a página principal do encurtador
    } else {
        document.getElementById('login-error').textContent = 'Usuário ou senha incorretos!';
    }
});
