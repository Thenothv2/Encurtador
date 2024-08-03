document.getElementById('shorten-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const url = document.getElementById('url').value;

    const response = await fetch('shorten.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
    });

    const result = await response.json();
    if (result.short_url) {
        document.getElementById('result').textContent = `Shortened URL: ${result.short_url}`;
    } else {
        document.getElementById('result').textContent = `Error: ${result.error}`;
    }
});
