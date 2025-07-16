document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica de Segurança: Verifica se a Fase 7 foi concluída ---
    const fase7Concluida = localStorage.getItem('fase7Concluida');
    if (!fase7Concluida) {
        alert('Acesso negado! Você deve completar a Fase 7 primeiro.');
        window.location.href = 'fase1.html'; // Redireciona para a Fase 1 se tentar pular
        return;
    }

    const passwordInput = document.getElementById('passwordInput');
    const submitButton = document.getElementById('submitPasswordBtn');
    const messageBox = document.getElementById('messageBox'); 

    const correctPassword = 'TURQUIA'; // A senha para a Fase 8!

    const checkPassword = () => {
        const userAnswer = passwordInput.value.trim();
        messageBox.classList.remove('show', 'error', 'success');
        messageBox.textContent = '';

        if (userAnswer.toUpperCase() === correctPassword.toUpperCase()) {
            messageBox.textContent = 'Acerto! O passado ressurge, e o caminho se abre para o próximo segredo...'; 
            messageBox.classList.add('show', 'success'); 
            localStorage.setItem('fase8Concluida', 'true'); 

            setTimeout(() => {
                window.location.href = 'fase9.html'; // Redireciona para a Fase 9!
            }, 2000); 
        } else {
            alert('Errado!. Tente novamente!'); 
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