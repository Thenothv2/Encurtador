document.addEventListener('DOMContentLoaded', function() {
    const emailList = document.getElementById('email-list');
    const approveButton = document.getElementById('approve-button');
    const rejectButton = document.getElementById('reject-button');

    function loadPendingEmails() {
        fetch('get-pending-emails.php')
        .then(response => response.json())
        .then(data => {
            emailList.innerHTML = data.emails.map(email => `
                <div class="email-item">
                    <p>${email}</p>
                    <input type="radio" name="email" value="${email}">
                </div>
            `).join('');
        });
    }

    function approveEmail() {
        const selectedEmail = document.querySelector('input[name="email"]:checked');
        if (selectedEmail) {
            fetch('process-email.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: selectedEmail.value,
                    action: 'approve'
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    loadPendingEmails();
                } else {
                    alert('Houve um erro ao aprovar o e-mail.');
                }
            });
        } else {
            alert('Selecione um e-mail para aprovar.');
        }
    }

    function rejectEmail() {
        const selectedEmail = document.querySelector('input[name="email"]:checked');
        if (selectedEmail) {
            fetch('process-email.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: selectedEmail.value,
                    action: 'reject'
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    loadPendingEmails();
                } else {
                    alert('Houve um erro ao rejeitar o e-mail.');
                }
            });
        } else {
            alert('Selecione um e-mail para rejeitar.');
        }
    }

    approveButton.addEventListener('click', approveEmail);
    rejectButton.addEventListener('click', rejectEmail);

    // Carregar e-mails pendentes ao carregar a página
    loadPendingEmails();
});
