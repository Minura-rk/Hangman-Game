var animal = [
        "mouse",
        "cat",
        "zebra",
        "cheetah",
        "lion",
];
      
let answer = "";
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
      
let btn = document.querySelector(".start");
let container = document.querySelector('.container');
let body = document.body.children[1];
let keyboard = document.getElementById("keyboard");
let hangPic = document.getElementById("hangmanPic");
let guessWord = document.getElementById("guessedWord");
let fnd = document.querySelector(".find");
let mistake = document.getElementById("mistakes");
let wrong = document.getElementById("maxWrong");
      
container.style.display = "none";
      
function randomWord() {
        btn.style.display = "none";
        answer = animal[Math.floor(Math.random() * animal.length)];
        body.classList.add("find");
}
      
function generateButtons() {
        let buttonsHTML = "abcdefghijklmnopqrstuvwxyz"
          .toUpperCase()
          .split("")
          .map(
            (letter) =>
              `
            <button
              class="btn b  tn-lg btn-secondary m-2"
              id='` +
              letter +
              `'
              onClick="handleGuess('` +
              letter +
              `')"
            >
              ` +
              letter +
              `
            </button>
          `
          )
          .join("");
      
        keyboard.innerHTML = buttonsHTML;
}
      
function handleGuess(chosenLetter) {
        let smallCase = chosenLetter.toLowerCase();
        guessed.push(smallCase);
        document.getElementById(chosenLetter).setAttribute("disabled", true);
      
        if (answer.indexOf(smallCase) >= 0) {
          guessedWordFunction();
          checkIfGameWon();
        } else if (answer.indexOf(smallCase) === -1) {
          mistakes++;
          updateMistakes();
          checkIfGameLost();
          updateHangmanPicture();
        }
}
      
function updateHangmanPicture() {
        hangPic.src = "./assest/images/" + mistakes + ".jpg";
}
      
function checkIfGameWon() {
        if (wordStatus === answer) {
          keyboard.innerHTML = "You Won!!!";
          if (guessWord.innerHTML === "cat") {
            fnd.classList.add("cat");
          } else if (guessWord.innerHTML === "mouse") {
            fnd.classList.add("mouse");
          } else if (guessWord.innerHTML === "zebra") {
            fnd.classList.add("zebra");
          } else if (guessWord.innerHTML === "cheetah") {
            fnd.classList.add("cheetah");
          } else if (guessWord.innerHTML === "lion") {
            fnd.classList.add("lion");
          }
        }
}
      
function checkIfGameLost() {
        if (mistakes === maxWrong) {
          guessWord.innerHTML =
            "The answer was: " + answer;
          keyboard.innerHTML = "You Lost!!!";
        }
}
      
function guessedWordFunction() {
        wordStatus = answer
          .split("")
          .map((letter) => (guessed.indexOf(letter) >= 0 ? letter : " _ "))
          .join("");
      
        guessWord.innerHTML = wordStatus;
}
      
function updateMistakes() {
        mistake.innerHTML = mistakes;
}
      
function reset() {
        mistakes = 0;
        guessed = [];
        hangPic.src = "./assest/images/0.jpg";
        let body = document.body.children[1];
        body.removeAttribute("class");
        btn.style.display = "none"
        randomWord();
        guessedWordFunction();
        updateMistakes();
        generateButtons();
}
      
wrong.innerHTML = maxWrong;
      
function startGame() {
        container.style.display = "block";
        randomWord();
        generateButtons();
        guessedWordFunction();
}
      
      
btn.addEventListener("click", function (e) {
        startGame();
      });
      