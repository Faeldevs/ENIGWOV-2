document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica de Segurança: Verifica se a Fase 8 foi concluída ---
    const fase8Concluida = localStorage.getItem('fase8Concluida');
    if (!fase8Concluida) {
        alert('Acesso negado! Você deve completar a Fase 8 primeiro.');
        window.location.href = 'fase1.html'; // Redireciona para a Fase 1 se tentar pular
        return;
    }

    const passwordInput = document.getElementById('passwordInput');
    const submitButton = document.getElementById('submitPasswordBtn');
    const messageBox = document.getElementById('messageBox'); 

    const correctPassword = 'URANO'; // A senha para a Fase 9!

    const checkPassword = () => {
        const userAnswer = passwordInput.value.trim();
        messageBox.classList.remove('show', 'error', 'success');
        messageBox.textContent = '';

        if (userAnswer.toUpperCase() === correctPassword.toUpperCase()) {
            messageBox.textContent = 'Gênio! Você desvendou a frase e encontrou o gigante gelado! Rumo ao próximo desafio...'; 
            messageBox.classList.add('show', 'success'); 
            localStorage.setItem('fase9Concluida', 'true'); 

            setTimeout(() => {
                window.location.href = 'fase10.html'; // Redireciona para a Fase 10!
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