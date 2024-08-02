document.getElementById('shorten-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var url = document.getElementById('url-input').value;
    var data = JSON.stringify({ url: url });

    fetch('shorten.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })
    .then(response => response.json())
    .then(data => {
        if (data.short_url) {
            document.getElementById('result').innerHTML = `<a href="${data.short_url}" target="_blank">${data.short_url}</a>`;
        } else {
            document.getElementById('result').innerText = data.error || 'An error occurred';
        }
    })
    .catch(error => {
        document.getElementById('result').innerText = 'An error occurred: ' + error;
    });
});
