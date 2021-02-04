// Ball
let ballX = 250;
let ballY = 350;

// Speed trajectory=軌道
let speedX;
let speedY;
let trajectoryX;
let computerSpeed;

let paddleContact = false;

class Ball {
  // Change Mobile Settings
  constructor() {
    this._init();
  }

  _init() {
    this._isMobile();
  }

  _isMobile() {
    const isMobile = window.matchMedia('(max-width: 600px)');
    if (isMobile.matches) {
      speedY = -2;
      speedX = speedY;
      computerSpeed = 4;
    } else {
      speedY = -1;
      speedX = speedY;
      computerSpeed = 3;
    }
  }

  // Reset Ball to Center
  ballReset() {
    ballX = width / 2;
    ballY = height / 2;
    speedY = -3;
    paddleContact = false;
  }

  // Adjust Ball Movement
  ballMove() {
    // Vertical Speed
    ballY += -speedY;
    // Horizontal Speed
    if (playerMoved && paddleContact) {
      ballX += speedX;
    }
  }

  _bounceRightOrLeft() {
    // Bounce off Left Wall
    if (ballX < 0 && speedX < 0) {
      speedX = -speedX;
    }
    // Bounce off Right Wall
    if (ballX > width && speedX > 0) {
      speedX = -speedX;
    }
  }

  _bounceOffPlayerPaddle() {
    // Bounce off player paddle (bottom)
    if (ballY > height - paddleDiff) {
      if (ballX > paddleBottomX && ballX < paddleBottomX + paddleWidth) {
        paddleContact = true;
        // Add Speed on Hit
        if (playerMoved) {
          // Max SpeedY = -5
          speedY < -5 ? (speedY = -5) : (speedY -= 1);
          speedY < -5 ? (computerSpeed = 6) : false;
        }
        speedY = -speedY;
        trajectoryX = ballX - (paddleBottomX + paddleDiff);
        speedX = trajectoryX * 0.3;
      } else if (ballY > height) {
        // Reset Ball, add to Computer Score
        this.ballReset();
        computerScore++;
      }
    }
  }

  _bounceOffComputerPaddle() {
    // Bounce off computer paddle (top)
    if (ballY < paddleDiff) {
      if (ballX > paddleTopX && ballX < paddleTopX + paddleWidth) {
        // Add Speed on Hit
        if (playerMoved) {
          // Max SpeedY = 5
          speedY > 5 ? (speedY = 5) : (speedY += 1);
        }
        speedY = -speedY;
      } else if (ballY < 0) {
        // Reset Ball, add to playerScore
        this.ballReset();
        playerScore++;
      }
    }
  }

  // Determine What Ball Bounces Off, Score Points, Reset Ball
  ballBoundaries() {
    // Bounce off Left Wall or Right Wall
    this._bounceRightOrLeft();

    // Bounce off player paddle (bottom)
    this._bounceOffPlayerPaddle();

    // Bounce off computer paddle (top)
    this._bounceOffComputerPaddle();
  }

  // Computer Movement
  computerAI() {
    if (playerMoved) {
      if (paddleTopX + paddleDiff < ballX) {
        paddleTopX += computerSpeed;
      } else {
        paddleTopX -= computerSpeed;
      }
    }
  }
}
