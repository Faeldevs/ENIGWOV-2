document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica de Segurança: Verifica se a Fase 12 foi concluída ---
    const fase12Concluida = localStorage.getItem('fase12Concluida');
    if (!fase12Concluida) {
        alert('Acesso negado! Você deve completar a Fase 12 primeiro.');
        window.location.href = 'fase1.html'; // Redireciona para a Fase 1 se tentar pular
        return;
    }

    const passwordInput = document.getElementById('passwordInput');
    const submitButton = document.getElementById('submitPasswordBtn');
    const messageBox = document.getElementById('messageBox'); 

    const correctPassword = 'DEUTERAGONISTA'; // A senha para a Fase 13!

    const checkPassword = () => {
        const userAnswer = passwordInput.value.trim();
        messageBox.classList.remove('show', 'error', 'success');
        messageBox.textContent = '';

        if (userAnswer.toUpperCase() === correctPassword.toUpperCase()) {
            messageBox.textContent = 'Perfeito! Você desvendou o papel essencial! A história continua...'; 
            messageBox.classList.add('show', 'success'); 
            localStorage.setItem('fase13Concluida', 'true'); 

            setTimeout(() => {
                window.location.href = 'fase14.html'; // Redireciona para a Fase 14!
            }, 2000); 
        } else {
            alert('Errado! O palco ainda guarda seu segredo. Tente novamente!'); 
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
