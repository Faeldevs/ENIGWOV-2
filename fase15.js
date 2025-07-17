document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica de Segurança: Verifica se a Fase 12 foi concluída ---
    const fase14Concluida = localStorage.getItem('fase14Concluida');
    if (!fase14Concluida) {
        alert('Acesso negado! Você deve completar a Fase 14 primeiro.');
        window.location.href = 'index.html'; // Redireciona para a Fase 1 se tentar pular
        return;
    }

    // --- O restante do código do jogo da forca da Fase 15 começa aqui ---
    const hangmanWord = 'UTONIO'; // A palavra a ser adivinhada
    const maxWrongGuesses = 3; // LIMITE DE ERROS AGORA É 3

    let guessedWord = Array(hangmanWord.length).fill('_'); 
    let wrongGuessesCount = 0;
    let guessedLetters = new Set(); 

    const wordDisplay = document.getElementById('word-display');
    const wrongGuessesDisplay = document.getElementById('wrong-guesses');
    const lettersContainer = document.getElementById('letters-container');
    const gameMessage = document.getElementById('game-message');

    // Inicializa o jogo da forca
    function initHangman() {
        guessedWord = Array(hangmanWord.length).fill('_');
        wrongGuessesCount = 0;
        guessedLetters = new Set();
        gameMessage.classList.remove('show', 'success', 'error');
        gameMessage.textContent = '';

        updateDisplay();
        createLetterButtons();
    }

    // Atualiza a exibição da palavra e do contador de erros
    function updateDisplay() {
        wordDisplay.textContent = guessedWord.join(' '); 
        wrongGuessesDisplay.textContent = `Erros: ${wrongGuessesCount} / ${maxWrongGuesses}`;
    }

    // Cria os botões de A a Z
    function createLetterButtons() {
        lettersContainer.innerHTML = ''; 
        for (let i = 0; i < 26; i++) {
            const letter = String.fromCharCode(65 + i); 
            const button = document.createElement('button');
            button.classList.add('letter-button');
            button.textContent = letter;
            button.addEventListener('click', () => handleGuess(letter, button));
            lettersContainer.appendChild(button);
        }
    }

    // Lida com o palpite de uma letra
    function handleGuess(letter, button) {
        if (guessedLetters.has(letter)) { 
            return;
        }

        guessedLetters.add(letter);
        button.disabled = true; 

        let correctGuess = false;
        for (let i = 0; i < hangmanWord.length; i++) {
            if (hangmanWord[i].toUpperCase() === letter) { 
                guessedWord[i] = letter;
                correctGuess = true;
            }
        }

        if (correctGuess) {
            updateDisplay();
            checkGameStatus();
        } else {
            wrongGuessesCount++;
            updateDisplay();
            checkGameStatus();
        }
    }

    // Verifica se o jogo terminou (ganhou ou perdeu)
    function checkGameStatus() {
        if (guessedWord.join('') === hangmanWord) { // Ganhou
            gameMessage.textContent = 'Parabéns! Você desvendou o nome do criador!';
            gameMessage.classList.add('show', 'success');
            disableAllLetterButtons();
            localStorage.setItem('fase15Concluida', 'true');

            setTimeout(() => {
                window.location.href = 'fase16.html'; // Redireciona para a próxima fase
            }, 2500);
        } else if (wrongGuessesCount >= maxWrongGuesses) { // Perdeu
            gameMessage.textContent = `Você errou demais! A forca será reiniciada!`; // Mensagem para reiniciar
            gameMessage.classList.add('show', 'error');
            disableAllLetterButtons();
            
            setTimeout(() => {
                initHangman(); // Reinicia o jogo da forca nesta mesma fase
            }, 3000);
        }
    }

    // Desabilita todos os botões de letras
    function disableAllLetterButtons() {
        const buttons = lettersContainer.querySelectorAll('.letter-button');
        buttons.forEach(button => {
            button.disabled = true;
        });
    }

    initHangman();
});
