const words = [
  "apple", "banana", "grape", "orange", "peach", "kiwi", "mango", "watermelon",
  "strawberry", "blueberry", "jackfruit", "pineapple", "papaya", "pomegranate",
  "lemon", "cherry", "papaya", "avocado"
];

let secretWord = words[Math.floor(Math.random() * words.length)];
let attempts = 5;

console.log("Secret word (for testing):", secretWord);

function checkGuess() {
  const inputElement = document.getElementById("guessInput");
  const messageElement = document.getElementById("message");
  const restartBtn = document.getElementById("restartBtn");

  let userGuess = inputElement.value.trim().toLowerCase();

  if (!userGuess) {
    attempts--;
    updateMessage(`Incorrect guess. You have ${attempts} attempts left. Try again!`, "neutral");
  } else if (userGuess === secretWord) {
    updateMessage("🎉 Congratulations! You guessed the secret word!", "win");
    document.body.style.backgroundColor = "#90ee90";
    endGame(true);
  } else {
    attempts--;
    if (attempts > 0) {
      updateMessage(`❌ Incorrect guess. You have ${attempts} attempts left. Try again!`, "neutral");
    } else {
      updateMessage(`💀 Game over! The secret word was '${secretWord}'.`, "lose");
      endGame(false);
      document.body.style.backgroundColor = "#ff4c4c";
    }
  }

  inputElement.value = "";
}

function updateMessage(msg, status) {
  const messageElement = document.getElementById("message");
  messageElement.textContent = msg;

  document.body.classList.remove("win", "lose");

  if (status === "win") {
    document.body.classList.add("win");
  } else if (status === "lose") {
    document.body.classList.add("lose");
  }
}

function endGame(won) {
  document.getElementById("guessInput").disabled = true;
  document.querySelector("button").disabled = true;
  document.getElementById("restartBtn").style.display = "inline-block";
}

function restartGame() {
  secretWord = words[Math.floor(Math.random() * words.length)];
  attempts = 5;

  console.log("Secret word (for testing):", secretWord);

  document.getElementById("guessInput").disabled = false;
  document.querySelector("button").disabled = false;
  document.getElementById("restartBtn").style.display = "none";
  document.getElementById("message").textContent = "";
  document.getElementById("guessInput").value = "";
  document.body.classList.remove("win", "lose");
  document.body.style.backgroundColor = "#add8e6";
}

// ✅ Make pressing Enter trigger checkGuess()
document.getElementById("guessInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    checkGuess();
  }
});

// ✅ Make clicking the Submit button trigger checkGuess()
document.getElementById("submitBtn").addEventListener("click", checkGuess);
