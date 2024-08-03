document.addEventListener('DOMContentLoaded', function() {
    const questions = [
        // Adicione suas perguntas aqui
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
            label.appendChild(document.createTextNode(option));
            fieldset.appendChild(label);
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
