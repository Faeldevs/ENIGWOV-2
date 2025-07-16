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

    const correctPassword = 'GAMBITO'; // A senha da Fase 7

    const checkPassword = () => {
        const userAnswer = passwordInput.value.trim();
        messageBox.classList.remove('show', 'error', 'success');
        messageBox.textContent = '';

        if (userAnswer.toUpperCase() === correctPassword.toUpperCase()) {
            messageBox.textContent = 'Parabéns! Você dominou a estratégia! Preparando para o próximo desafio...'; 
            messageBox.classList.add('show', 'success'); 
            localStorage.setItem('fase7Concluida', 'true'); // Marca a fase 7 como concluída

            setTimeout(() => {
                window.location.href = 'fase8.html'; // Redireciona para a próxima fase!
            }, 2000); 
        } else {
            alert('Errado! Tente novamente!'); 
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