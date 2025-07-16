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
            messageBox.textContent = 'Parabéns! Você decifrou a terceira fase! Preparando para o próximo enigma...'; 
            messageBox.classList.add('show', 'success'); 
            localStorage.setItem('fase3Concluida', 'true'); 

            setTimeout(() => {
                window.location.href = 'fase4.html'; // Redireciona para a Fase 4!
            }, 2000); 
        } else {
            alert('Errado! Ta muito easy'); 
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