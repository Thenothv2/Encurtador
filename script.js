// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    // Lidar com o envio do formulário de encurtamento de URL
    document.getElementById('shorten-form').addEventListener('submit', function(event) {
        event.preventDefault();

        let longUrl = document.getElementById('long-url').value;
        let customUrl = document.getElementById('custom-url').value;

        // Implementar lógica para enviar o URL longo para o servidor e receber o URL curto
        // Exemplo de como você pode manipular a resposta (ajustar conforme sua lógica de backend)
        let shortUrl = 'http://short.url/' + (customUrl || 'generated-short-url');

        document.getElementById('short-url').innerText = shortUrl;
        document.getElementById('copy-button').style.display = 'inline-block';
    });

    // Lidar com a cópia do URL para a área de transferência
    document.getElementById('copy-button').addEventListener('click', function() {
        let shortUrlText = document.getElementById('short-url').innerText;
        navigator.clipboard.writeText(shortUrlText)
            .then(() => {
                alert('URL copiado para a área de transferência!');
            })
            .catch(err => {
                console.error('Erro ao copiar URL: ', err);
            });
    });

    // Carregar e exibir URLs encurtadas do usuário
    loadUserUrls();
});

function loadUserUrls() {
    // Exemplo de como você pode buscar URLs encurtadas do usuário e exibi-las
    // Você deve ajustar isso com base na sua lógica de backend
    const urls = [
        { original: 'https://example.com', short: 'http://short.url/abcd1234' },
        { original: 'https://another-example.com', short: 'http://short.url/efgh5678' }
    ];

    const userUrlsContainer = document.getElementById('user-urls');
    urls.forEach(url => {
        const urlElement = document.createElement('div');
        urlElement.innerHTML = `
            <p><strong>Original:</strong> <a href="${url.original}" target="_blank">${url.original}</a></p>
            <p><strong>Encurtado:</strong> <a href="${url.short}" target="_blank">${url.short}</a></p>
        `;
        userUrlsContainer.appendChild(urlElement);
    });
}
