document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica de Segurança: Verifica se a Fase 11 foi concluída ---
    const fase11Concluida = localStorage.getItem('fase11Concluida');
    if (!fase11Concluida) {
        alert('Acesso negado! Você deve completar a Fase 11 primeiro.');
        window.location.href = 'fase1.html'; // Redireciona para a Fase 1 se tentar pular
        return;
    }

    const passwordInput = document.getElementById('passwordInput');
    const submitButton = document.getElementById('submitPasswordBtn');
    const messageBox = document.getElementById('messageBox'); 

    const correctPassword = 'UTERO'; // A senha para a Fase 12!

    const checkPassword = () => {
        const userAnswer = passwordInput.value.trim();
        messageBox.classList.remove('show', 'error', 'success');
        messageBox.textContent = '';

        if (userAnswer.toUpperCase() === correctPassword.toUpperCase()) {
            messageBox.textContent = 'Decifrado! O segredo da criação foi revelado! Avante para o próximo mistério...'; 
            messageBox.classList.add('show', 'success'); 
            localStorage.setItem('fase12Concluida', 'true'); 

            setTimeout(() => {
                window.location.href = 'fase13.html'; // Redireciona para a Fase 13!
            }, 2000); 
        } else {
            alert('Errado! A arte guiará. Evite acentuações. Tente novamente!'); 
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