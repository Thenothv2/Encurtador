document.addEventListener('DOMContentLoaded', function() {
    const questions = [
        {
            question: 'Qual é a capital do Brasil?',
            options: ['Brasília', 'São Paulo', 'Rio de Janeiro', 'Salvador'],
            answer: 'Brasília'
        },
        {
            question: 'Quanto é 50 vezes 10?',
            options: ['500', '50', '1000', '5'],
            answer: '500'
        },
        {
            question: 'Qual é a cor do céu em um dia claro?',
            options: ['Azul', 'Vermelho', 'Verde', 'Amarelo'],
            answer: 'Azul'
        },
        {
            question: 'Qual é o maior planeta do sistema solar?',
            options: ['Júpiter', 'Saturno', 'Terra', 'Marte'],
            answer: 'Júpiter'
        },
        {
            question: 'Qual é a fórmula química da água?',
            options: ['H₂O', 'O₂', 'CO₂', 'H₂'],
            answer: 'H₂O'
        },
        {
            question: 'Qual é o maior oceano do mundo?',
            options: ['Oceano Pacífico', 'Oceano Atlântico', 'Oceano Índico', 'Oceano Ártico'],
            answer: 'Oceano Pacífico'
        },
        {
            question: 'Qual é a raiz quadrada de 144?',
            options: ['12', '14', '10', '16'],
            answer: '12'
        },
        {
            question: 'Qual é o símbolo químico do ouro?',
            options: ['Au', 'Ag', 'Fe', 'O'],
            answer: 'Au'
        },
        {
            question: 'Quem pintou "A Última Ceia"?',
            options: ['Leonardo da Vinci', 'Michelangelo', 'Raphael', 'Donatello'],
            answer: 'Leonardo da Vinci'
        },
        {
            question: 'Qual é o nome da nave espacial que levou os primeiros humanos à Lua?',
            options: ['Apollo 11', 'Challenger', 'Columbia', 'Discovery'],
            answer: 'Apollo 11'
        }
    ];

    const quizForm = document.getElementById('quiz-form');
    const quizResult = document.getElementById('quiz-result');

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    questions.forEach((q, index) => {
        const fieldset = document.createElement('fieldset');
        const legend = document.createElement('legend');
        legend.textContent = q.question;
        fieldset.appendChild(legend);

        const options = [...q.options];
        shuffle(options);

        options.forEach(option => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question${index}`;
            input.value = option;
            label.appendChild(input);
            label.innerHTML += option; // Permite adicionar HTML para ícones
            fieldset.appendChild(label);
            fieldset.appendChild(document.createElement('br')); // Adiciona quebra de linha para ordenação vertical
        });

        quizForm.insertBefore(fieldset, quizForm.querySelector('button'));
    });

    quizForm.addEventListener('submit', function(event) {
        event.preventDefault();
        let score = 0;
        questions.forEach((q, index) => {
            const userAnswer = quizForm[`question${index}`].value;
            if (userAnswer === q.answer) {
                score++;
            }
        });
        if (score === questions.length) {
            window.location.href = 'index-logged-in.html';
        } else {
            quizResult.textContent = 'Você precisa acertar todas as perguntas para acessar o site.';
        }
    });
});
