document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica de Segurança ---
    const fase13Concluida = localStorage.getItem('fase13Concluida');
    // NOVO: Verifica se o redirecionamento veio de um erro na Fase 15
    const redirectedFromFailedFase15 = localStorage.getItem('redirectedFromFailedFase15');

    // Remove a flag de redirecionamento imediatamente após verificar
    if (redirectedFromFailedFase15) {
        localStorage.removeItem('redirectedFromFailedFase15');
    }

    // Só mostra "Acesso negado" se não veio de um erro na Fase 15 E se a fase 13 não foi concluída
    if (!fase13Concluida) { 
        alert('Acesso negado! Você deve completar a Fase 13 primeiro.');
        window.location.href = 'index.html'; 
        return;
    }

    const puzzleContainer = document.getElementById('puzzle-container');
    const solvedMessage = document.getElementById('solved-message');
    const resetButton = document.getElementById('reset-button'); 

    const IMAGE_PATH = 'imagens/puzzle14.png'; 
    const NUM_COLS = 4; 
    const NUM_ROWS = 4; 
    
    let currentPuzzleSize; 
    let PIECE_WIDTH, PIECE_HEIGHT;

    let pieces = []; 
    let isDragging = false;
    let currentPiece = null;
    
    let initialMouseX, initialMouseY; 
    let initialPieceLeft, initialPieceTop;

    const img = new Image();
    img.src = IMAGE_PATH;
    img.onload = () => {
        currentPuzzleSize = puzzleContainer.offsetWidth; 
        puzzleContainer.style.height = `${currentPuzzleSize}px`; 
        
        PIECE_WIDTH = currentPuzzleSize / NUM_COLS;
        PIECE_HEIGHT = currentPuzzleSize / NUM_ROWS;

        initPuzzle();

        // NOVO: Se veio de um erro da Fase 15, mostra uma mensagem específica
        if (redirectedFromFailedFase15) {
            solvedMessage.textContent = 'Parece que a Forca não foi sua aliada. Tente o quebra-cabeça novamente para seguir em frente!';
            solvedMessage.classList.add('show', 'error'); // Usar 'error' para a cor
            // Oculta a mensagem após alguns segundos se desejar
            setTimeout(() => {
                solvedMessage.classList.remove('show');
                solvedMessage.textContent = '';
            }, 5000); 
        }
    };
    img.onerror = () => {
        alert('Erro ao carregar a imagem do quebra-cabeça. Verifique o caminho e o arquivo (imagens/puzzle14.png).');
        console.error('Falha ao carregar imagem:', IMAGE_PATH);
    };

    function initPuzzle() {
        puzzleContainer.innerHTML = ''; 
        solvedMessage.classList.remove('show'); 
        solvedMessage.textContent = ''; 
        pieces = []; 

        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', endDrag);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('touchend', endDrag);

        resetButton.removeEventListener('click', resetMisplacedPieces);

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

                piece.dataset.isCorrect = 'false'; 

                pieces.push(piece);
            }
        }

        shuffleAndPlaceAllPieces(); 

        pieces.forEach(piece => {
            piece.addEventListener('mousedown', startDrag);
            piece.addEventListener('touchstart', startDrag); 
        });

        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchmove', drag);
        document.addEventListener('touchend', endDrag);

        resetButton.addEventListener('click', resetMisplacedPieces);
    }

    function shuffleAndPlaceAllPieces() {
        const containerWidth = puzzleContainer.offsetWidth;
        const containerHeight = puzzleContainer.offsetHeight;

        const availablePositions = []; 
        for (let i = 0; i < NUM_COLS * NUM_ROWS; i++) {
            availablePositions.push(i);
        }
        for (let i = availablePositions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availablePositions[i], availablePositions[j]] = [availablePositions[j], availablePositions[i]];
        }

        pieces.forEach((piece, index) => {
            const posIndex = availablePositions[index];
            const col = posIndex % NUM_COLS;
            const row = Math.floor(posIndex / NUM_COLS);

            piece.style.left = `${col * PIECE_WIDTH + (Math.random() * PIECE_WIDTH * 0.5 - PIECE_WIDTH * 0.25)}px`; 
            piece.style.top = `${row * PIECE_HEIGHT + (Math.random() * PIECE_HEIGHT * 0.5 - PIECE_HEIGHT * 0.25)}px`; 
            
            piece.style.position = 'absolute'; 
            puzzleContainer.appendChild(piece);
        });
    }

    function resetMisplacedPieces() {
        const containerWidth = puzzleContainer.offsetWidth;
        const containerHeight = puzzleContainer.offsetHeight;

        const misplaced = pieces.filter(piece => piece.dataset.isCorrect === 'false');
        
        misplaced.forEach(piece => {
            const randomX = Math.random() * (containerWidth - PIECE_WIDTH * 0.8); 
            const randomY = Math.random() * (containerHeight - PIECE_HEIGHT * 0.8);
            
            piece.style.left = `${randomX}px`;
            piece.style.top = `${randomY}px`;
            
            piece.removeEventListener('mousedown', startDrag);
            piece.removeEventListener('touchstart', startDrag);
            piece.addEventListener('mousedown', startDrag);
            piece.addEventListener('touchstart', startDrag);
            piece.classList.remove('correct'); 
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
                    
                }
                piece.style.backgroundPosition = `-${parseFloat(piece.dataset.originalCol) * PIECE_WIDTH}px -${parseFloat(piece.dataset.originalRow) * PIECE_HEIGHT}px`;
            });
        }
    });

});