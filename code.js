
function printkeys() {
    for (let i = 0; i < 26; i++) {
        var abc = document.createElement("button")
        abc.innerHTML = String.fromCharCode(97 + i)
        abc.id = String.fromCharCode(97 + i)
        abc.addEventListener("click", handleClick)
        document.getElementById("keyboard").appendChild(abc)
    }
}
printkeys();


document.addEventListener('keydown', handleKeyboard);

function handleKeyboard(event) {
    if (/^[a-zA-Z]$/.test(event.key)) {
        check(event.key.toLowerCase());
    }
}
function handleClick(event) {
    check(event.target.innerText)
}
function guess(showguess, word, letter) {
    for (var i = 0; i < word.length; i++) {
        if (word[i] == letter && showguess[i] == "_") {
            showguess = showguess.substring(0, i) + letter + showguess.substring(i + 1)
        }
    }
    return showguess;
}

function check(letter) {
    let isCorrect = false;
    // check if char in word
    old = displayText
    displayText = guess(displayText, selectedWord.word, letter);
    if (displayText != old) isCorrect = true
    document.getElementById("userinput").innerHTML = displayText;
    disableButton(findButtonByLetter(letter));

    if (!isCorrect) {
        lives--;
        document.getElementById("lives").innerHTML = "number of lives=" + lives;
    }

    if (lives === 0) {
        document.getElementById("lives").innerHTML = "number of lives=" + lives;
        alert("Game Over! Try again.");
        resetGame();
    } else if (displayText === selectedWord.word) {
        document.getElementById("userinput").innerHTML = displayText;
        alert("Congratulations! You guessed the word.");
        resetGame();
    }
}

function disableButton(button) {
    if (button)
        button.disabled = true;
}

function findButtonByLetter(letter) {
    var buttons = document.getElementById("keyboard").getElementsByTagName("button");
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].innerHTML === letter) {
            return buttons[i];
        }
    }
    return null;
}

function resetGame() {
    lives = 5;
    document.getElementById("lives").innerHTML = "number of lives=" + lives;
    document.getElementById("userinput").innerHTML = "";
    displayText = "";
    var buttons = document.getElementById("keyboard").getElementsByTagName("button");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
    }
    document.getElementById("keyboard").style.display = "none";
    document.getElementById("resetButton").style.display = "none";
    document.getElementById("startButton").style.display = "flex";
}

var selectedWord;
lives = 5;
var displayText = "";

function game() {
    document.getElementById("lives").innerHTML = "number of lives=" + lives;
    words = [
        {
            word: "book",
            description: "name a word that we read"
        },
        {
            word: "man",
            description: "name a word that is human"
        },
        {
            word: "bread",
            description: "name a word that we eat"
        }
    ];
    selectedWord = words[Math.floor(Math.random() * words.length)];

    document.getElementById("description").innerHTML = selectedWord.description;

    var spaces = selectedWord.word.length;
    for (let i = 0; i < spaces; i++) {
        displayText += "_"
    }
    document.getElementById("userinput").innerHTML = displayText
    document.getElementById("keyboard").style.display = "flex";
    document.getElementById("resetButton").style.display = "flex";
    document.getElementById("startButton").style.display = "none";
}

