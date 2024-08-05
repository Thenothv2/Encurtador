document.addEventListener('DOMContentLoaded', () => {
    const startQuizButton = document.getElementById('start-quiz');
    const emailInput = document.getElementById('email-input');
    const questionElement = document.getElementById('quiz-question');
    const optionsElement = document.getElementById('quiz-options');
    const nextButton = document.getElementById('next-question');

    let currentQuestionIndex = 0;
    const questions = [
        {
            question: 'Qual é a capital do Brasil?',
            options: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador'],
            correct: 2
        },
        {
            question: 'Quanto é 50 vezes 10?',
            options: ['450', '500', '550', '600'],
            correct: 1
        },
        {
            question: 'Qual é a cor do céu em um dia claro?',
            options: ['Verde', 'Azul', 'Amarelo', 'Vermelho'],
            correct: 1
        },
        {
            question: 'Qual é o maior planeta do sistema solar?',
            options: ['Terra', 'Marte', 'Júpiter', 'Saturno'],
            correct: 2
        },
        {
            question: 'Qual é a fórmula química da água?',
            options: ['CO2', 'H2O', 'NaCl', 'O2'],
            correct: 1
        },
        {
            question: 'Qual é o maior oceano do mundo?',
            options: ['Atlântico', 'Índico', 'Ártico', 'Pacífico'],
            correct: 3
        },
        {
            question: 'Qual é a raiz quadrada de 144?',
            options: ['10', '12', '14', '16'],
            correct: 1
        },
        {
            question: 'Qual é o símbolo químico do ouro?',
            options: ['Ag', 'Au', 'Pb', 'Fe'],
            correct: 1
        },
        {
            question: 'Quem pintou "A Última Ceia"?',
            options: ['Michelangelo', 'Leonardo da Vinci', 'Raphael', 'Van Gogh'],
            correct: 1
        },
        {
            question: 'Qual é o nome da nave espacial que levou os primeiros humanos à Lua?',
            options: ['Apollo 11', 'Apollo 12', 'Columbia', 'Endeavour'],
            correct: 0
        }
    ];

    startQuizButton.addEventListener('click', () => {
        const email = emailInput.value.trim();
        
        if (email === '') {
            alert('Por favor, insira um e-mail antes de iniciar o quiz.');
            return;
        }

        // Verificar se o e-mail já está registrado
        fetch('check-email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `email=${encodeURIComponent(email)}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.exists) {
                alert('Você já está registrado. Você não precisa refazer o quiz.');
                window.location.href = 'index-logged-in.html'; // Redirecionar para a página após login
            } else {
                // Iniciar o quiz
                window.location.href = 'quiz.html';
            }
        })
        .catch(error => console.error('Erro:', error));
    });

    function loadQuestion(index) {
        const question = questions[index];
        questionElement.textContent = question.question;
        optionsElement.innerHTML = '';

        question.options.forEach((option, i) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-button');
            button.dataset.index = i;
            button.addEventListener('click', () => checkAnswer(i));
            optionsElement.appendChild(button);
        });
    }

    function checkAnswer(selectedIndex) {
        const correctIndex = questions[currentQuestionIndex].correct;
        if (selectedIndex === correctIndex) {
            alert('Resposta correta!');
        } else {
            alert('Resposta incorreta.');
        }
        nextButton.style.display = 'block';
    }

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion(currentQuestionIndex);
            nextButton.style.display = 'none';
        } else {
            alert('Você completou o quiz!');
            // Redirecionar ou mostrar uma mensagem final
        }
    });

    if (window.location.pathname.includes('quiz.html')) {
        loadQuestion(currentQuestionIndex);
    }
});
