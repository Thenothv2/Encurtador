document.addEventListener('DOMContentLoaded', function() {
    const quizForm = document.getElementById('quiz-form');
    const quizQuestionsContainer = document.getElementById('quiz-questions');
    const quizMessage = document.getElementById('quiz-message');

    const questions = [
        {
            question: "Qual é a capital do Brasil?",
            options: ["Brasília", "São Paulo", "Rio de Janeiro", "Salvador"],
            answer: "Brasília"
        },
        {
            question: "Quanto é 50 vezes 10?",
            options: ["500", "5", "50", "100"],
            answer: "500"
        },
        {
            question: "Qual é a cor do céu em um dia claro?",
            options: ["Azul", "Verde", "Amarelo", "Vermelho"],
            answer: "Azul"
        },
        {
            question: "Qual é o maior planeta do sistema solar?",
            options: ["Júpiter", "Terra", "Marte", "Saturno"],
            answer: "Júpiter"
        },
        {
            question: "Qual é a fórmula química da água?",
            options: ["H₂O", "H₂O₂", "HO", "H₂"],
            answer: "H₂O"
        },
        {
            question: "Qual é o maior oceano do mundo?",
            options: ["Oceano Pacífico", "Oceano Atlântico", "Oceano Índico", "Oceano Ártico"],
            answer: "Oceano Pacífico"
        },
        {
            question: "Qual é a raiz quadrada de 144?",
            options: ["12", "14", "16", "18"],
            answer: "12"
        },
        {
            question: "Qual é o símbolo químico do ouro?",
            options: ["Au", "Ag", "Pt", "Pb"],
            answer: "Au"
        },
        {
            question: "Quem pintou 'A Última Ceia'?",
            options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Michelangelo"],
            answer: "Leonardo da Vinci"
        },
        {
            question: "Qual é o nome da nave espacial que levou os primeiros humanos à Lua?",
            options: ["Apollo 11", "Challenger", "Discovery", "Endeavour"],
            answer: "Apollo 11"
        }
    ];

    // Randomizar as perguntas
    questions.sort(() => Math.random() - 0.5);

    let currentQuestionIndex = 0;

    function showQuestion(index) {
        const question = questions[index];
        quizQuestionsContainer.innerHTML = `
            <div class="question">
                <p>${question.question}</p>
                ${question.options.map((option, i) => `
                    <label>
                        <input type="radio" name="question${index}" value="${option}" ${i === 0 ? 'required' : ''}>
                        ${option}
                    </label>
                `).join('')}
            </div>
        `;
    }

    showQuestion(currentQuestionIndex);

    quizForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(quizForm);
        const answers = [];
        for (let [name, value] of formData.entries()) {
            answers.push(value);
        }

        if (answers.length !== questions.length) {
            quizMessage.textContent = 'Por favor, responda todas as perguntas.';
            return;
        }

        // Verificar respostas
        const correctAnswers = questions.filter((q, index) => q.answer === answers[index]);

        if (correctAnswers.length === questions.length) {
            const email = new URLSearchParams(window.location.search).get('email');
            fetch('process-quiz.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })
            .then(response => response.json())
            .then(data => {
                quizMessage.textContent = data.message;
                if (data.success) {
                    window.location.href = 'index-logged-in.html';
                }
            });
        } else {
            quizMessage.textContent = 'Você errou alguma(s) pergunta(s). Por favor, tente novamente.';
        }
    });
});
