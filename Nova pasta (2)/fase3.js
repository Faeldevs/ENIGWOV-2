document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica de Segurança: Verifica se a Fase 2 foi concluída ---
    const fase2Concluida = localStorage.getItem('fase2Concluida');
    if (!fase2Concluida) {
        alert('Acesso negado! Você deve completar a Fase 2 primeiro.');
        window.location.href = 'fase1.html'; 
        return;
    }

    const passwordInput = document.getElementById('passwordInput');
    const submitButton = document.getElementById('submitPasswordBtn');
    const messageBox = document.getElementById('messageBox'); 

    const correctPassword = 'H'; // A resposta do enigma (letra H)

    const checkPassword = () => {
        const userAnswer = passwordInput.value.trim();
        messageBox.classList.remove('show', 'error', 'success');
        messageBox.textContent = '';

        if (userAnswer.toUpperCase() === correctPassword.toUpperCase()) {
            messageBox.textContent = 'Parabéns! Você decifrou o enigma final! Desafio Concluído!'; 
            messageBox.classList.add('show', 'success'); 
            localStorage.setItem('fase3Concluida', 'true'); 

            setTimeout(() => {
                alert('Você completou todas as fases! Excelente trabalho, Mestre dos Enigmas!');
                localStorage.clear(); 
                window.location.href = 'index.html'; 
            }, 2000); 
        } else {
            alert('Errado!'); 
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