const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const human = "X";
const computer = "O";

const winPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

cells.forEach(cell => {
  cell.addEventListener("click", playerMove);
});

restartBtn.addEventListener("click", restartGame);

function playerMove() {
  const index = this.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  board[index] = human;
  this.textContent = human;
  this.classList.add("x");

  if (checkWinner(human)) {
    statusText.textContent = "You Win! 🎉";
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusText.textContent = "Draw!";
    gameActive = false;
    return;
  }

  statusText.textContent = "Computer Thinking...";

  setTimeout(computerMove, 500);
}

function computerMove() {
  let emptyCells = [];

  board.forEach((cell, index) => {
    if (cell === "") emptyCells.push(index);
  });

  const randomIndex =
    emptyCells[Math.floor(Math.random() * emptyCells.length)];

  board[randomIndex] = computer;

  cells[randomIndex].textContent = computer;
  cells[randomIndex].classList.add("o");

  if (checkWinner(computer)) {
    statusText.textContent = "Computer Wins! 🤖";
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusText.textContent = "Draw!";
    gameActive = false;
    return;
  }

  statusText.textContent = "Your Turn";
}

function checkWinner(player) {
  return winPatterns.some(pattern => {
    return pattern.every(index => board[index] === player);
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;

  statusText.textContent = "Your Turn";

  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
  });
}