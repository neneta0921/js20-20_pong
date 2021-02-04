const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

class Render {
  // Render Everything on Canvas
  _renderCanvas() {
    const ballRadius = 5;

    // Canvas Background
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    // Paddle Color
    context.fillStyle = 'white';

    // Player Paddle (Bottom)
    context.fillRect(paddleBottomX, height - 20, paddleWidth, paddleHeight);

    // Computer Paddle (Top)
    context.fillRect(paddleTopX, 10, paddleWidth, paddleHeight);

    // Dashed Center Line
    context.beginPath();
    context.setLineDash([6]);
    context.moveTo(0, 350);
    context.lineTo(500, 350);
    context.strokeStyle = 'grey';
    context.stroke();

    // Ball
    context.beginPath();
    context.arc(ballX, ballY, ballRadius, 2 * Math.PI, false);
    context.fillStyle = 'white';
    context.fill();

    // Score
    context.font = '32px Courier New';
    context.fillText(playerScore, 20, canvas.height / 2 + 50);
    context.fillText(computerScore, 20, canvas.height / 2 - 30);
  }

  // Create Canvas Element
  createCanvas() {
    canvas.width = width;
    canvas.height = height;
    body.appendChild(canvas);
    this._renderCanvas();
  }

  // Called Every Frame
  animate() {
    this._renderCanvas();
    ballMove();
    ballBoundaries();
    computerAI();
    gameOver();
    !isGameOver && window.requestAnimationFrame(animate);
  }
}
