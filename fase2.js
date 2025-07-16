document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica de Segurança: Verifica se a Fase 1 foi concluída ---
    const fase1Concluida = localStorage.getItem('fase1Concluida');
    if (!fase1Concluida) {
        alert('Acesso negado! Você deve completar a Fase 1 primeiro.');
        window.location.href = 'index.html'; 
        return; 
    }

    const passwordInput = document.getElementById('passwordInput');
    const submitButton = document.getElementById('submitPasswordBtn');
    const messageBox = document.getElementById('messageBox'); 

    const correctPassword = 'DESCARTES'; // A resposta do enigma

    const checkPassword = () => {
        const userAnswer = passwordInput.value.trim();
        messageBox.classList.remove('show', 'error', 'success');
        messageBox.textContent = '';

        if (userAnswer.toUpperCase() === correctPassword.toUpperCase()) {
            messageBox.textContent = 'Conseguiu! Continue tentando...'; 
            messageBox.classList.add('show', 'success'); 
            localStorage.setItem('fase2Concluida', 'true');
            
            setTimeout(() => {
                window.location.href = 'fase3.html'; 
            }, 1500); 
        } else {
            alert('Errado! Ta fraco em???'); 
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