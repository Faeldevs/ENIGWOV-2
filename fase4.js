document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica de Segurança: Verifica se a Fase 3 foi concluída ---
    const fase3Concluida = localStorage.getItem('fase3Concluida');
    if (!fase3Concluida) {
        alert('Acesso negado! Você deve completar a Fase 3 primeiro.');
        window.location.href = 'fase1.html'; // Redireciona para a Fase 1 se tentar pular
        return;
    }


    const passwordInput = document.getElementById('passwordInput');
    const submitButton = document.getElementById('submitPasswordBtn');
    const messageBox = document.getElementById('messageBox');


    // A resposta do enigma da Fase 4: FERNANDO DE NORONHA
    const correctPassword = 'FERNANDO DE NORONHA';


    const checkPassword = () => {
        const userAnswer = passwordInput.value.trim();
        messageBox.classList.remove('show', 'error', 'success');
        messageBox.textContent = '';


        if (userAnswer.toUpperCase() === correctPassword.toUpperCase()) {
            messageBox.textContent = 'Incrível! Você encontrou o local! Preparando para o próximo desafio gelado...';
            messageBox.classList.add('show', 'success');
            localStorage.setItem('fase4Concluida', 'true');


            setTimeout(() => {
                window.location.href = 'fase5.html'; // Agora continua para a Fase 5
            }, 2000);
        } else {
            alert('Errado! O nome não corresponde. Revise sua pesquisa e as dicas.');
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