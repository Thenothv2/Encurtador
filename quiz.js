document.addEventListener('DOMContentLoaded', function() {
    const questions = [
        // Suas perguntas aqui...
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const questionContainer = document.getElementById('question-container');
    const nextButton = document.getElementById('next-button');
    const quizResult = document.getElementById('quiz-result');

    function showQuestion(index) {
        const questionData = questions[index];
        questionContainer.innerHTML = `
            <h2>${questionData.question}</h2>
            <ul>
                ${questionData.options.map((option, i) => `
                    <li>
                        <label>
                            <input type="radio" name="question${index}" value="${i}">
                            ${option}
                        </label>
                    </li>
                `).join('')}
            </ul>
        `;
        nextButton.style.display = 'block';
    }

    function checkAnswer() {
        const selectedOption = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
        if (selectedOption) {
            const answerIndex = parseInt(selectedOption.value);
            if (answerIndex === questions[currentQuestionIndex].correct) {
                score++;
            }
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion(currentQuestionIndex);
            } else {
                showResult();
            }
        } else {
            quizResult.textContent = 'Por favor, selecione uma resposta!';
        }
    }

    function showResult() {
        const userEmail = localStorage.getItem('userEmail');
        fetch('process-quiz.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userEmail,
                score: score
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = 'register.html';
            } else {
                quizResult.textContent = 'Houve um erro ao processar seu quiz. Tente novamente.';
            }
        });
    }

    nextButton.addEventListener('click', checkAnswer);

    // Inicia o quiz com a primeira pergunta
    showQuestion(currentQuestionIndex);
});
