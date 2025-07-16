document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica de Segurança: Verifica se a Fase 9 foi concluída ---
    const fase9Concluida = localStorage.getItem('fase9Concluida');
    if (!fase9Concluida) {
        alert('Acesso negado! Você deve completar a Fase 9 primeiro.');
        window.location.href = 'fase1.html'; // Redireciona para a Fase 1 se tentar pular
        return;
    }

    const passwordInput = document.getElementById('passwordInput');
    const submitButton = document.getElementById('submitPasswordBtn');
    const messageBox = document.getElementById('messageBox'); 

    // As senhas corretas. Usamos um array para aceitar múltiplas variações.
    const correctPasswords = ['ASLAN', 'ASLAM']; 

    const checkPassword = () => {
        const userAnswer = passwordInput.value.trim().toUpperCase(); // Converte para maiúsculas uma vez

        messageBox.classList.remove('show', 'error', 'success');
        messageBox.textContent = '';

        // Verifica se a resposta do usuário está em qualquer uma das senhas corretas
        if (correctPasswords.includes(userAnswer)) {
            messageBox.textContent = 'Pelo Grande Leão! Você encontrou o Rei! O caminho para o próximo desafio está aberto...'; 
            messageBox.classList.add('show', 'success'); 
            localStorage.setItem('fase10Concluida', 'true'); 

            setTimeout(() => {
                window.location.href = 'fase11.html'; // Redireciona para a Fase 11!
            }, 2000); 
        } else {
            alert('Errado! Nárnia ainda guarda seus segredos. Tente novamente!'); 
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