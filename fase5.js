document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica de Segurança: Verifica se a Fase 4 foi concluída ---
    const fase4Concluida = localStorage.getItem('fase4Concluida');
    if (!fase4Concluida) {
        alert('Acesso negado! Você deve completar a Fase 4 primeiro.');
        window.location.href = 'fase1.html'; // Redireciona para a Fase 1 se tentar pular
        return;
    }

    const passwordInput = document.getElementById('passwordInput');
    const submitButton = document.getElementById('submitPasswordBtn');
    const messageBox = document.getElementById('messageBox'); 

    const correctPassword = 'IGLU'; // A senha para a Fase 5!

    const checkPassword = () => {
        const userAnswer = passwordInput.value.trim();
        messageBox.classList.remove('show', 'error', 'success');
        messageBox.textContent = '';

        if (userAnswer.toUpperCase() === correctPassword.toUpperCase()) {
            messageBox.textContent = 'Fantástico! Você desvendou o mistério da geada! Próximo portal te espera...'; 
            messageBox.classList.add('show', 'success'); 
            localStorage.setItem('fase5Concluida', 'true'); 

            setTimeout(() => {
                window.location.href = 'fase6.html'; // Redireciona para a Fase 6!
            }, 2000); 
        } else {
            alert('Errado! O frio ainda esconde a verdade. Tente novamente!'); 
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