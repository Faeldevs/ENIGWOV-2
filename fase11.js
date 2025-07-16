document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica de Segurança: Verifica se a Fase 10 foi concluída ---
    const fase10Concluida = localStorage.getItem('fase10Concluida');
    if (!fase10Concluida) {
        alert('Acesso negado! Você deve completar a Fase 10 primeiro.');
        window.location.href = 'fase1.html'; // Redireciona para a Fase 1 se tentar pular
        return;
    }

    const passwordInput = document.getElementById('passwordInput');
    const submitButton = document.getElementById('submitPasswordBtn');
    const messageBox = document.getElementById('messageBox'); 

    const correctPassword = 'PANGEIA'; // A senha para a Fase 11!

    const checkPassword = () => {
        const userAnswer = passwordInput.value.trim();
        messageBox.classList.remove('show', 'error', 'success');
        messageBox.textContent = '';

        if (userAnswer.toUpperCase() === correctPassword.toUpperCase()) {
            messageBox.textContent = 'Incrível! Você desvendou o segredo do supercontinente! O caminho se abre para a próxima era...'; 
            messageBox.classList.add('show', 'success'); 
            localStorage.setItem('fase11Concluida', 'true'); 

            setTimeout(() => {
                window.location.href = 'fase12.html'; // Redireciona para a Fase 12!
            }, 2000); 
        } else {
            alert('Errado! Melhor desistir. Tente novamente!'); 
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