function startGame() {
  if (isGameOver && !isNewGame) {
    body.removeChild(gameOverEl);
    canvas.hidden = false;
  }
  isNewGame = false;
  isGameOver = false;
  playerScore = 0;
  computerScore = 0;
  ballReset();
  createCanvas();
  animate();

  canvas.addEventListener('mousemove', (e) => {
    const screenWidth = window.screen.width;
    const canvasPosition = screenWidth / 2 - width / 2;

    playerMoved = true;
    // Compensate for canvas begins centered
    paddleBottomX = e.clientX - canvasPosition - paddleDiff;
    if (paddleBottomX < paddleDiff) {
      paddleBottomX = 0;
    }
    if (paddleBottomX > width - paddleWidth) {
      paddleBottomX = width - paddleWidth;
    }
    // Hide Cursor
    canvas.style.cursor = 'none';
  });
}
