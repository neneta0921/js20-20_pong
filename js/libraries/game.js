class Game {
  _hideGameOverEl() {
    container.removeChild(gameOverEl);
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

    // Compensate for canvas being centered
    paddleBottomX = e.clientX - canvasPosition - paddleDiff;
    console.log('paddleBottomX1:', paddleBottomX, e.clientX, canvasPosition, paddleDiff);

    // If Paddle is Left side, don't move to left
    if (paddleBottomX < paddleDiff) {
      paddleBottomX = 0;
    }
    console.log('paddleBottomX2:', paddleBottomX);

    // If Paddle is right side, don't move to right
    if (paddleBottomX > width - paddleWidth) {
      paddleBottomX = width - paddleWidth;
    }
    console.log('paddleBottomX3:', paddleBottomX);

    // Hide Cursor
    canvas.style.cursor = 'none';
  }

  startGame() {
    isGameOver && !isNewGame ? this._hideGameOverEl() : false;

    this._initGame();

    canvas.addEventListener('mousemove', (e) => {
      this._checkPlayerMovement(e);
    });

    // container.addEventListener('mousemove', (e) => {
    //   this._checkPlayerMovement(e);
    // });
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
    container.appendChild(gameOverEl);
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
