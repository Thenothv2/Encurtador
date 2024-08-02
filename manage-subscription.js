document.addEventListener('DOMContentLoaded', async function() {
    const response = await fetch('/api/get-subscription-status.php');
    const result = await response.json();

    document.querySelector('#subscription-status span').textContent = result.is_premium ? 'Premium' : 'Free';

    document.getElementById('upgrade-button').addEventListener('click', async function() {
        const upgradeResponse = await fetch('/api/upgrade-to-premium.php', { method: 'POST' });
        const upgradeResult = await upgradeResponse.json();

        if (upgradeResult.success) {
            alert('Upgrade para Premium bem-sucedido!');
            document.querySelector('#subscription-status span').textContent = 'Premium';
        } else {
            alert('Erro: ' + upgradeResult.error);
        }
    });
});
