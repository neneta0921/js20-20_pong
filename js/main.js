// Canvas
const { body } = document;
const width = 400;
const height = 500;

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
const render = new Render();
const createCanvas = () => render.createCanvas();
const animate = () => render.animate();

const game = new Game();
const startGame = () => game.startGame();
const gameOver = () => game.gameOver();

const ball = new Ball();
const ballBoundaries = () => ball.ballBoundaries();
const ballMove = () => ball.ballMove();
const ballReset = () => ball.ballReset();
const computerAI = () => ball.computerAI();

// On Load
startGame();
