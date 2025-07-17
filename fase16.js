document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica de Segurança: Verifica se a Fase 12 foi concluída ---
    const fase14Concluida = localStorage.getItem('fase14Concluida');
    if (!fase14Concluida) {
        alert('Acesso negado! Você deve completar a Fase 15 primeiro.');
        window.location.href = 'index.html'; // Redireciona para a Fase 1 se tentar pular
        return;
    }


    // --- Lógica do Jogo da Fase 16 ---
    const riddles = [
        { question: "Quantos átomos de hidrogênio há em uma molécula de água?", answer: 2 },
        { question: "Quantos tentáculos possui um polvo?", answer: 8 },
        { question: "Qual jogo do Resident Evil se passa no continente Africano?", answer: 5 },
        { question: "Quantos anos tinha mozart quando compôs sua primeira musica", answer: 5 } // 16 - 4 = 12, mas a resposta é o dígito final. A pista é "conectar". O dígito é 2.
    ];
    

    const finalPassword = "2855";
    let currentRiddleIndex = 0;
    let discoveredDigits = [];

    const riddleDisplay = document.getElementById('riddle-display');
    const answerInput = document.getElementById('answer-input');
    const submitButton = document.getElementById('submit-button');
    const digitsContainer = document.getElementById('digits-container');
    const gameMessage = document.getElementById('game-message');
    const finalKeypad = document.getElementById('final-keypad');
    const finalInput = document.getElementById('final-input');
    const riddleContainer = document.getElementById('riddle-container');

    function loadRiddle() {
        if (currentRiddleIndex < riddles.length) {
            riddleDisplay.textContent = riddles[currentRiddleIndex].question;
            answerInput.value = '';
            answerInput.focus();
        } else {
            // Todos os enigmas resolvidos, hora de adivinhar a senha final
            riddleContainer.style.display = 'none';
            finalKeypad.style.display = 'block';
            showMessage('Todos os dígitos foram encontrados. Qual a senha?', 'success');
            finalInput.focus();
        }
    }

    function showMessage(msg, type = '', duration = 3000) {
        gameMessage.textContent = msg;
        gameMessage.className = `message show ${type}`;
        
        if (duration > 0) {
            setTimeout(() => {
                gameMessage.className = 'message';
            }, duration);
        }
    }

    function updateDiscoveredDigits() {
        let display = discoveredDigits.join(' ') + ' ' + Array(4 - discoveredDigits.length).fill('_').join(' ');
        digitsContainer.textContent = display.trim();
    }

    function checkAnswer() {
        const userAnswer = parseInt(answerInput.value, 10);
        let correctAnswer = riddles[currentRiddleIndex].answer;

        // Lógica especial para o último enigma
        if (currentRiddleIndex === 3 && userAnswer === 5) {
             // O jogador entendeu a metalinguagem (usar o último dígito de '12')
             correctAnswer = 5;
        }

        if (userAnswer === correctAnswer) {
            showMessage('Correto! Próximo cálculo...', 'success', 2000);
            
            // Adiciona o dígito correto à lista (para o último, adicionamos o '2')
            const digitToAdd = (currentRiddleIndex === 3) ? 5 : correctAnswer;
            discoveredDigits.push(digitToAdd);

            updateDiscoveredDigits();
            currentRiddleIndex++;
            
            setTimeout(loadRiddle, 1500);

        } else {
            showMessage('Resultado incorreto. Tente novamente.', 'error');
            answerInput.value = '';
        }
    }

    function checkFinalPassword() {
        if (finalInput.value === finalPassword) {
            showMessage('SENHA CORRETA! ACESSO LIBERADO!', 'success', 0);
            finalInput.disabled = true;
            localStorage.setItem('fase16Concluida', 'true'); // Salva o progresso

            setTimeout(() => {
                 // Substitua 'fase17.html' pela sua próxima fase quando estiver pronta
                window.location.href = 'final.html'; // Ou 'fase17.html'
            }, 3000);

        } else {
            showMessage('SENHA INCORRETA. A SEQUÊNCIA ESTÁ ERRADA.', 'error');
            finalInput.value = '';
            finalInput.focus();

            // Penalidade por erro na senha final: redireciona para o início do jogo.
            setTimeout(() => {
                alert("Falha de segurança crítica detectada. Sistema reiniciando.");
                window.location.href = 'index.html';
            }, 2500);
        }
    }

    // Event Listeners
    submitButton.addEventListener('click', checkAnswer);
    answerInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });

    finalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            checkFinalPassword();
        }
    });

    // Inicia o jogo
    loadRiddle();
    updateDiscoveredDigits();
});
