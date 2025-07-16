document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica de Segurança: Verifica se a Fase 5 foi concluída ---
    const fase5Concluida = localStorage.getItem('fase5Concluida');
    if (!fase5Concluida) {
        alert('Acesso negado! Você deve completar a Fase 5 primeiro.');
        window.location.href = 'fase1.html'; // Redireciona para a Fase 1 se tentar pular
        return;
    }

    const passwordInput = document.getElementById('passwordInput');
    const submitButton = document.getElementById('submitPasswordBtn');
    const messageBox = document.getElementById('messageBox'); 

    const correctPassword = 'ESFINGE'; // A senha para a Fase 6!

    const checkPassword = () => {
        const userAnswer = passwordInput.value.trim();
        messageBox.classList.remove('show', 'error', 'success');
        messageBox.textContent = '';

        if (userAnswer.toUpperCase() === correctPassword.toUpperCase()) {
            messageBox.textContent = 'Decifrado! O deserto revela seus próximos segredos...'; 
            messageBox.classList.add('show', 'success'); 
            localStorage.setItem('fase6Concluida', 'true'); 

            setTimeout(() => {
                window.location.href = 'fase7.html'; // Redireciona para a Fase 7!
            }, 2000); 
        } else {
            alert('Errado! Os segredos do deserto ainda estão selados. Tente novamente!'); 
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