let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * 3)];
}

function play(playerChoice) {
  const computerChoice = getComputerChoice();
  const result = document.getElementById("result");

  if (playerChoice === computerChoice) {
    result.textContent = "It's a tie!";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    result.textContent = "You Win!";
    playerScore++;
    document.getElementById("player-score").textContent = playerScore;
  } else {
    result.textContent = "You Lose!";
    computerScore++;
    document.getElementById("computer-score").textContent = computerScore;
  }
}