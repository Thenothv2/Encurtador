document.getElementById('url-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const urlInput = document.getElementById('url-input').value;
    
    const response = await fetch('/api/shorten.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: urlInput })
    });

    const result = await response.json();

    if (result.short_url) {
        document.getElementById('result').style.display = 'block';
        document.getElementById('short-url').href = result.short_url;
        document.getElementById('short-url').textContent = result.short_url;
    } else {
        alert('Ocorreu um erro ao encurtar a URL.');
    }
});
