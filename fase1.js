document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('passwordInput');
    const submitButton = document.getElementById('submitPasswordBtn');
    const messageBox = document.getElementById('messageBox'); 

    const correctPassword = 'VENTO'; // A resposta do enigma

    const checkPassword = () => {
        const userAnswer = passwordInput.value.trim();
        messageBox.classList.remove('show', 'error', 'success');
        messageBox.textContent = ''; 

        if (userAnswer.toUpperCase() === correctPassword.toUpperCase()) {
            messageBox.textContent = 'Conseguiu! Continue tentando...'; 
            messageBox.classList.add('show', 'success'); 
            localStorage.setItem('fase1Concluida', 'true');
            
            setTimeout(() => {
                window.location.href = 'fase2.html'; 
            }, 1500); 
        } else {
            alert('Errado! Ta facil'); 
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