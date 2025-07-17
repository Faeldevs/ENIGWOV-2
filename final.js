document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica de Segurança: Verifica se a Fase 12 foi concluída ---
    const fase14Concluida = localStorage.getItem('fase14Concluida');
    if (!fase14Concluida) {
        alert('Acesso negado! Você deve completar o jogo.');
        window.location.href = 'index.html'; // Redireciona para a Fase 1 se tentar pular
        return;
    }


    // --- Lógica da Tela Final ---
    const messageElement = document.getElementById('final-message');
    const signatureElement = document.getElementById('creator-signature');
    const restartButton = document.getElementById('restart-button');

    const finalMessage = "Você conseguiu!\nDecifrou os códigos, superou os desafios e provou que uma mente curiosa é a ferramenta mais poderosa que existe.\nO verdadeiro conhecimento não estava trancado em um cofre, mas na jornada que você percorreu para chegar até aqui. Na sua capacidade de pensar, de errar e, acima de tudo, de persistir.";
    const signature = "-- Fael / Rezando, criador do enigma";

    function typeWriter(text, element, index, callback) {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            setTimeout(() => typeWriter(text, element, index + 1, callback), 50); // Velocidade da digitação
        } else {
            if (callback) {
                callback();
            }
        }
    }

    // Inicia a digitação da mensagem principal
    typeWriter(finalMessage, messageElement, 0, () => {
        // Quando a primeira mensagem terminar, para de piscar o cursor nela
        messageElement.style.borderRight = 'none';
        messageElement.style.animation = 'none';

        // Mostra a assinatura com um efeito de fade-in
        signatureElement.textContent = signature;
        signatureElement.style.opacity = '1';

        // Mostra o botão de reiniciar
        restartButton.style.display = 'block';
    });
    
    // Adiciona funcionalidade ao botão de reiniciar
    restartButton.addEventListener('click', () => {
        const confirmRestart = confirm('Você tem certeza que deseja apagar todo o seu progresso e reiniciar o enigma do zero?');
        if (confirmRestart) {
            localStorage.clear(); // LIMPA TODO O PROGRESSO
            window.location.href = 'index.html'; // Volta para a página inicial
        }
    });
});