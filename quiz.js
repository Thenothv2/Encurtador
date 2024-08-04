document.addEventListener('DOMContentLoaded', function() {
    const questions = [
        {
            question: "Qual é a capital do Brasil?",
            options: ["São Paulo", "Brasília", "Rio de Janeiro", "Salvador"],
            correct: 1
        },
        {
            question: "Quanto é 50 vezes 10?",
            options: ["500", "1000", "50", "5000"],
            correct: 0
        },
        {
            question: "Qual é a cor do céu em um dia claro?",
            options: ["Verde", "Azul", "Vermelho", "Preto"],
            correct: 1
        },
        {
            question: "Qual é o maior planeta do sistema solar?",
            options: ["Terra", "Marte", "Júpiter", "Saturno"],
            correct: 2
        },
        {
            question: "Qual é a fórmula química da água?",
            options: ["H2O", "CO2", "O2", "H2SO4"],
            correct: 0
        },
        {
            question: "Qual é o maior oceano do mundo?",
            options: ["Oceano Atlântico", "Oceano Índico", "Oceano Pacífico", "Oceano Ártico"],
            correct: 2
        },
        {
            question: "Qual é a raiz quadrada de 144?",
            options: ["10", "11", "12", "13"],
            correct: 2
        },
        {
            question: "Qual é o símbolo químico do ouro?",
            options: ["Au", "Ag", "Pb", "Fe"],
            correct: 0
        },
        {
            question: "Quem pintou 'A Última Ceia'?",
            options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
            correct: 1
        },
        {
            question: "Qual é o nome da nave espacial que levou os primeiros humanos à Lua?",
            options: ["Apollo 13", "Apollo 11", "Sputnik", "Challenger"],
            correct: 1
        }
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
        questionContainer.innerHTML = `<h2>Você acertou ${score} de ${questions.length} perguntas!</h2>`;
        nextButton.style.display = 'none';
    }

    nextButton.addEventListener('click', checkAnswer);

    // Inicia o quiz com a primeira pergunta
    showQuestion(currentQuestionIndex);
});
