document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica de Segurança: Verifica se a Fase 6 foi concluída ---
    const fase6Concluida = localStorage.getItem('fase6Concluida');
    if (!fase6Concluida) {
        alert('Acesso negado! Você deve completar a Fase 6 primeiro.');
        window.location.href = 'fase1.html'; // Redireciona para a Fase 1 se tentar pular
        return;
    }

    const passwordInput = document.getElementById('passwordInput');
    const submitButton = document.getElementById('submitPasswordBtn');
    const messageBox = document.getElementById('messageBox'); 

    const correctPassword = 'GAMBITO'; // A senha final do jogo!

    const checkPassword = () => {
        const userAnswer = passwordInput.value.trim();
        messageBox.classList.remove('show', 'error', 'success');
        messageBox.textContent = '';

        if (userAnswer.toUpperCase() === correctPassword.toUpperCase()) {
            messageBox.textContent = 'Parabéns! Você desvendou o último enigma e concluiu o desafio!'; 
            messageBox.classList.add('show', 'success'); 
            localStorage.setItem('fase7Concluida', 'true'); // Marca a fase final como concluída

            setTimeout(() => {
                alert('MUITO BEM! Você é um verdadeiro Mestre dos Enigmas! Todas as fases foram concluídas!');
                localStorage.clear(); // Limpa todo o progresso para reiniciar o jogo
                window.location.href = 'index.html'; // Volta para a página inicial
            }, 2000); 
        } else {
            alert('Errado! O último sacrifício ainda não foi compreendido. Tente novamente!'); 
            passwordInput.value = ''; 
        }
    };

    submitButton.addEventListener('click', checkPassword);

    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });
});