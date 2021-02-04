class Game {
  _hideGameOverEl() {
    body.removeChild(gameOverEl);
    canvas.hidden = false;
  }

  _initGame() {
    isNewGame = false;
    isGameOver = false;
    playerScore = 0;
    computerScore = 0;
    ballReset();
    createCanvas();
    animate();
  }

  _checkPlayerMovement(e) {
    const screenWidth = window.screen.width;
    const canvasPosition = screenWidth / 2 - width / 2;

    playerMoved = true;
    // Compensate for canvas begins centered
    paddleBottomX = e.clientX - canvasPosition - paddleDiff;
    paddleBottomX < paddleDiff ? (paddleBottomX = 0) : false;
    paddleBottomX > width - paddleWidth ? (paddleBottomX = width - paddleWidth) : false;
    // Hide Cursor
    canvas.style.cursor = 'none';
  }

  startGame() {
    isGameOver && !isNewGame ? this._hideGameOverEl() : false;

    this._initGame();

    canvas.addEventListener('mousemove', (e) => {
      this._checkPlayerMovement(e);
    });
  }

  _showGameOverEl(winner) {
    // Hide Canvas
    canvas.hidden = true;

    // Container
    gameOverEl.textContent = '';
    gameOverEl.classList.add('game-over-container');

    // Title
    const title = document.createElement('h1');
    title.textContent = `${winner} Wins!`;

    // Button
    const playAgainBtn = document.createElement('button');
    playAgainBtn.textContent = 'Play Again';
    playAgainBtn.addEventListener('click', () => startGame());

    // If New Game Change Text
    if (isNewGame) {
      title.textContent = 'PONG GAME';
      playAgainBtn.textContent = 'Play Start';
    }

    // Append
    gameOverEl.append(title, playAgainBtn);
    body.appendChild(gameOverEl);
  }

  // Check If One Player Has Winning Score, If They Do, End Game
  gameOver() {
    if (playerScore === winningScore || computerScore === winningScore) {
      isGameOver = true;
      // Set Winner
      let winner = playerScore === winningScore ? 'Player' : 'Computer';
      this._showGameOverEl(winner);
    }
  }
}
