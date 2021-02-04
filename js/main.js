// Canvas
const { body } = document;
const width = 500;
const height = 700;

const gameOverEl = document.createElement('div');

// Paddle
const paddleHeight = 10;
const paddleWidth = 50;
const paddleDiff = 25;
let paddleBottomX = 225;
let paddleTopX = 225;
let playerMoved = false;

// Score
let playerScore = 0;
let computerScore = 0;
const winningScore = 7;
let isGameOver = true;
let isNewGame = true;

// Instance
const ball = new Ball();
const ballBoundaries = () => ball.ballBoundaries();
const ballMove = () => ball.ballMove();
const ballReset = () => ball.ballReset();
const computerAI = () => ball.computerAI();

// On Load
startGame();
