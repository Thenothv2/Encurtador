// admin-panel.js

document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/get-urls.php') // Supondo que você tenha um endpoint para obter URLs
        .then(response => response.json())
        .then(data => {
            const urlList = document.getElementById('url-list');
            data.urls.forEach(url => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${url.id}</td>
                    <td>${url.original_url}</td>
                    <td><a href="${url.short_url}" target="_blank">${url.short_url}</a></td>
                    <td>
                        <button onclick="deleteUrl(${url.id})">Excluir</button>
                    </td>
                `;
                urlList.appendChild(row);
            });
        });
});

function deleteUrl(id) {
    fetch(`/api/delete-url.php?id=${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload(); // Recarrega a página para atualizar a lista
            } else {
                alert('Erro ao excluir URL');
            }
        });
}
