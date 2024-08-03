// quiz.js
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('quiz-form');
    const errorDiv = document.getElementById('quiz-error');

    function shuffleAnswers(container) {
        const answers = Array.from(container.querySelectorAll('label'));
        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            container.appendChild(answers[j]);
        }
    }

    // Randomiza as respostas de todas as perguntas
    document.querySelectorAll('.question').forEach(question => {
        shuffleAnswers(question.querySelector('.answers'));
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Obtendo as respostas
        const correctAnswers = {
            q1: 'brasilia',
            q2: '500',
            q3: 'azul',
            q4: 'jupiter',
            q5: 'h2o',
            q6: 'oceano-pacifico',
            q7: 'youtube',
            q8: 'whatsapp',
            q9: 'chatgpt',
            q10: 'whatsapp'
        };

        // Verificação das respostas
        const allCorrect = Object.keys(correctAnswers).every(key => {
            return document.querySelector(`input[name="${key}"][value="${correctAnswers[key]}"]`).checked;
        });

        if (allCorrect) {
            window.location.href = 'index-logged-in.html'; // Redireciona para a tela inicial após o login
        } else {
            errorDiv.textContent = 'Respostas incorretas. Tente novamente.';
        }
    });
});
