document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica de Segurança: Verifica se a Fase 13 foi concluída ---
    const fase13Concluida = localStorage.getItem('fase13Concluida');
    if (!fase13Concluida) {
        alert('Acesso negado! Você deve completar a Fase 13 primeiro.');
        window.location.href = 'fase1.html'; // Redireciona para a Fase 1 se tentar pular
        return;
    }

    const puzzleContainer = document.getElementById('puzzle-container');
    const solvedMessage = document.getElementById('solved-message');
    const resetButton = document.getElementById('reset-button'); // Novo ID para o botão

    // --- Configurações do Quebra-Cabeça ---
    const IMAGE_PATH = 'imagens/puzzle14.png'; // Caminho para a sua imagem
    const NUM_COLS = 4; // Número de peças na horizontal
    const NUM_ROWS = 4; // Número de peças na vertical
    
    let currentPuzzleSize; 
    let PIECE_WIDTH, PIECE_HEIGHT;

    let pieces = []; // Array que guarda todas as peças
    let isDragging = false;
    let currentPiece = null;
    
    let initialMouseX, initialMouseY; 
    let initialPieceLeft, initialPieceTop;

    // Carrega a imagem para obter suas dimensões originais e então iniciar o puzzle
    const img = new Image();
    img.src = IMAGE_PATH;
    img.onload = () => {
        currentPuzzleSize = puzzleContainer.offsetWidth; 
        puzzleContainer.style.height = `${currentPuzzleSize}px`; 
        
        PIECE_WIDTH = currentPuzzleSize / NUM_COLS;
        PIECE_HEIGHT = currentPuzzleSize / NUM_ROWS;

        initPuzzle();
    };
    img.onerror = () => {
        alert('Erro ao carregar a imagem do quebra-cabeça. Verifique o caminho e o arquivo (imagens/puzzle14.png).');
        console.error('Falha ao carregar imagem:', IMAGE_PATH);
    };

    // Função que inicializa/reinicia o puzzle completamente (usado no carregamento da página)
    function initPuzzle() {
        // console.log('initPuzzle() chamado - O quebra-cabeça está sendo reiniciado completamente.'); // Para depuração
        puzzleContainer.innerHTML = ''; 
        solvedMessage.classList.remove('show'); 
        solvedMessage.textContent = ''; 
        pieces = []; // Reseta o array de peças

        // Remove os listeners de mouse/toque do documento para evitar duplicação
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', endDrag);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('touchend', endDrag);

        // Remove o listener do botão de reset para evitar múltiplos
        resetButton.removeEventListener('click', resetMisplacedPieces);


        // Cria e popula as peças
        for (let r = 0; r < NUM_ROWS; r++) {
            for (let c = 0; c < NUM_COLS; c++) {
                const piece = document.createElement('div');
                piece.classList.add('puzzle-piece');
                
                piece.dataset.correctX = c * PIECE_WIDTH;
                piece.dataset.correctY = r * PIECE_HEIGHT;
                
                piece.style.width = `${PIECE_WIDTH}px`;
                piece.style.height = `${PIECE_HEIGHT}px`;
                
                piece.style.backgroundImage = `url(${IMAGE_PATH})`;
                piece.style.backgroundSize = `${currentPuzzleSize}px ${currentPuzzleSize}px`; 
                piece.style.backgroundPosition = `-${c * PIECE_WIDTH}px -${r * PIECE_HEIGHT}px`;

                piece.dataset.isCorrect = 'false'; // Começa como incorreta

                pieces.push(piece);
            }
        }

        shuffleAndPlaceAllPieces(); // Embaralha TODAS as peças no início

        // Adiciona event listeners para arrastar e soltar
        pieces.forEach(piece => {
            piece.addEventListener('mousedown', startDrag);
            piece.addEventListener('touchstart', startDrag); 
        });

        // Adiciona listeners globais para arrasto e soltura
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchmove', drag);
        document.addEventListener('touchend', endDrag);

        // Adiciona listener para o botão de reset inteligente
        resetButton.addEventListener('click', resetMisplacedPieces);
    }

    // Função que embaralha e posiciona TODAS as peças (usado na inicialização)
    function shuffleAndPlaceAllPieces() {
        const containerWidth = puzzleContainer.offsetWidth;
        const containerHeight = puzzleContainer.offsetHeight;

        const availablePositions = []; // Lista de todas as posições possíveis
        for (let i = 0; i < NUM_COLS * NUM_ROWS; i++) {
            availablePositions.push(i);
        }
        // Embaralha os índices das posições para garantir que as peças não se sobreponham no início
        for (let i = availablePositions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availablePositions[i], availablePositions[j]] = [availablePositions[j], availablePositions[i]];
        }

        pieces.forEach((piece, index) => {
            const posIndex = availablePositions[index];
            const col = posIndex % NUM_COLS;
            const row = Math.floor(posIndex / NUM_COLS);

            // Calcula posições iniciais aleatórias, mas dentro do grid para evitar que saiam da tela
            // e ocupem um slot "disponível" na área do puzzle.
            piece.style.left = `${col * PIECE_WIDTH + (Math.random() * PIECE_WIDTH * 0.5 - PIECE_WIDTH * 0.25)}px`; // Pequena randomização
            piece.style.top = `${row * PIECE_HEIGHT + (Math.random() * PIECE_HEIGHT * 0.5 - PIECE_HEIGHT * 0.25)}px`; // Pequena randomização
            
            piece.style.position = 'absolute'; 
            puzzleContainer.appendChild(piece);
        });
    }

    // NOVO: Função para reiniciar APENAS as peças que não estão corretas
    function resetMisplacedPieces() {
        const containerWidth = puzzleContainer.offsetWidth;
        const containerHeight = puzzleContainer.offsetHeight;

        const misplaced = pieces.filter(piece => piece.dataset.isCorrect === 'false');
        
        // Re-randomiza a posição das peças erradas
        misplaced.forEach(piece => {
            const randomX = Math.random() * (containerWidth - PIECE_WIDTH * 0.8); 
            const randomY = Math.random() * (containerHeight - PIECE_HEIGHT * 0.8);
            
            piece.style.left = `${randomX}px`;
            piece.style.top = `${randomY}px`;
            
            // Re-adiciona listeners caso tenham sido removidos por algum motivo (embora não deveriam ser para peças erradas)
            piece.removeEventListener('mousedown', startDrag);
            piece.removeEventListener('touchstart', startDrag);
            piece.addEventListener('mousedown', startDrag);
            piece.addEventListener('touchstart', startDrag);
            piece.classList.remove('correct'); // Apenas para garantir
        });

        solvedMessage.classList.remove('show'); 
        solvedMessage.textContent = ''; 
    }

    function getEventClientCoords(e) {
        if (e.touches && e.touches.length > 0) {
            return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
        }
        return { clientX: e.clientX, clientY: e.clientY };
    }

    function startDrag(e) {
        if ((e.type === 'mousedown' && e.button !== 0) || this.dataset.isCorrect === 'true') return; 
        
        e.preventDefault(); 
        e.stopPropagation(); 

        isDragging = true;
        currentPiece = this;
        currentPiece.classList.add('dragging');
        
        const coords = getEventClientCoords(e);

        initialMouseX = coords.clientX;
        initialMouseY = coords.clientY;
        initialPieceLeft = currentPiece.offsetLeft;
        initialPieceTop = currentPiece.offsetTop;
    }

    function drag(e) {
        if (!isDragging || !currentPiece) return;

        const coords = getEventClientCoords(e);
        
        const deltaX = coords.clientX - initialMouseX;
        const deltaY = coords.clientY - initialMouseY;

        currentPiece.style.left = `${initialPieceLeft + deltaX}px`;
        currentPiece.style.top = `${initialPieceTop + deltaY}px`;
    }

    function endDrag(e) {
        if (!isDragging || !currentPiece) return;

        isDragging = false;
        currentPiece.classList.remove('dragging');

        const currentPieceLeft = currentPiece.offsetLeft;
        const currentPieceTop = currentPiece.offsetTop;

        const correctX = parseFloat(currentPiece.dataset.correctX);
        const correctY = parseFloat(currentPiece.dataset.correctY);

        const tolerance = 25; 

        if (
            currentPieceLeft > (correctX - tolerance) && currentPieceLeft < (correctX + tolerance) &&
            currentPieceTop > (correctY - tolerance) && currentPieceTop < (correctY + tolerance)
        ) {
            currentPiece.style.left = `${correctX}px`;
            currentPiece.style.top = `${correctY}px`;
            currentPiece.dataset.isCorrect = 'true'; 
            currentPiece.classList.add('correct');
            // Remove listeners de arrasto para a peça que já está correta
            currentPiece.removeEventListener('mousedown', startDrag);
            currentPiece.removeEventListener('touchstart', startDrag);

        } else {
            currentPiece.classList.remove('correct'); 
            currentPiece.dataset.isCorrect = 'false';
        }
        
        checkCompletion();
        currentPiece = null;
    }

    function checkCompletion() {
        const allCorrect = pieces.every(piece => piece.dataset.isCorrect === 'true');
        if (allCorrect) {
            solvedMessage.textContent = 'Parabéns! Você montou o quebra-cabeça! Próxima fase...';
            solvedMessage.classList.add('show');
            localStorage.setItem('fase14Concluida', 'true');

            pieces.forEach(piece => {
                piece.removeEventListener('mousedown', startDrag);
                piece.removeEventListener('touchstart', startDrag);
            });

            setTimeout(() => {
                window.location.href = 'fase15.html'; 
            }, 2500);
        }
    }

    window.addEventListener('resize', () => {
        const oldPuzzleSize = currentPuzzleSize;
        currentPuzzleSize = puzzleContainer.offsetWidth;
        puzzleContainer.style.height = `${currentPuzzleSize}px`;

        if (oldPuzzleSize !== currentPuzzleSize) { 
            PIECE_WIDTH = currentPuzzleSize / NUM_COLS;
            PIECE_HEIGHT = currentPuzzleSize / NUM_ROWS;

            pieces.forEach(piece => {
                piece.style.width = `${PIECE_WIDTH}px`;
                piece.style.height = `${PIECE_HEIGHT}px`;
                piece.style.backgroundSize = `${currentPuzzleSize}px ${currentPuzzleSize}px`;
                
                if (piece.dataset.isCorrect === 'true') {
                     piece.style.left = `${parseFloat(piece.dataset.originalCol) * PIECE_WIDTH}px`;
                     piece.style.top = `${parseFloat(piece.dataset.originalRow) * PIECE_HEIGHT}px`;
                } else {
                    // Para peças que não estão corretas, apenas reajusta o background e tamanho
                    // A posição aleatória não é recalculada no resize, apenas no initPuzzle ou reset
                }
                piece.style.backgroundPosition = `-${parseFloat(piece.dataset.originalCol) * PIECE_WIDTH}px -${parseFloat(piece.dataset.originalRow) * PIECE_HEIGHT}px`;
            });
        }
    });

    // A inicialização do quebra-cabeça é feita quando a imagem carrega (img.onload)
});