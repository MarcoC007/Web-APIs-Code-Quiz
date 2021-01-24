var gameBody = document.getElementById("game");
var resultsEl = document.getElementsByClassName("results");
var startPageEl = document.getElementById("start-page");
var gameOver = document.getElementById("game-over");
var timerEl = document.getElementsByClassName("time-remaining");
var choices = document.getElementsByClassName("choices");
var scoreName = document.getElementById("score-name");
var userName = document.getElementById("User-name");
var scoreBtn = document.getElementById("score-btn");
var hSContainer = document.getElementById("high-score-container");
var highScoreMain = document.getElementById("high-score-main");
var highScore = document.getElementById("high-score");
var highScoreName = document.getElementById("highscore-name");
var highScorePoints = document.getElementById("highscore-points");
var endGameBtn = document.getElementById("end-game-btn");
var startBtn = document.getElementById("start-game-btn");
var playAgainBtn = document.getElementById("play-again-btn");
var clearScoreBtn = document.getElementById("clear-score-btn");
var hSbutton = document.getElementById("high-score-btn");
var buttonA = document.getElementById("A");
var buttonB = document.getElementById("B");
var buttonC = document.getElementById("C");
var buttonD = document.getElementById("D");

// Game choices... 
var gameQuestions = [{
    question: "What tag defines a division or the beginning/end of an individual section in an HTML document?",
    choiceA: "<div>",
    choiceB: "<meta>",
    choiceC: "<img>",
    choiceD: "<table>",
    correctAnswer: "A"
} ,
{
    question: "One of the bad program style is?",
    choiceA: "Consistent use of Names in functions",
    choiceB: "Cohesive functions",
    choiceC: "Using constant macros",
    choiceD: "Using to many decision structures",
    correctAnswer: "D"
},
{
    question: "What are variables used for in JavaScript Programs?",
    choiceA: "Storing numbers, dates, or other values",
    choiceB: "Varying randomly",
    choiceC: "Causing high-school algebra flashbacks",
    choiceD: "None of the above",
    correctAnswer: "A"
},
{
    question: "What should appear at the very end of your JavaScript?",
    choiceA: "The <script>",
    choiceB: "The </script>",
    choiceC: "The END statement",
    choiceD: " None of the above",
    correctAnswer: "B"
}, 
{
    question: "What is the correct JavaScript syntax to write 'Hello World'?",
    choiceA: "System.out.println(/'Hello World/')",
    choiceB: "println ('Hello World')",
    choiceC: "document.write('Hello World')",
    choiceD: "response.write('Hello World')",
    correctAnswer: "C"
},
{
    question: "If we want define style for an unique element, then which css selector will we use ?",
    choiceA: "class",
    choiceB: "id", 
    choiceC: "name",
    choiceD: "text",
    correctAnswer: "B"
},
{
    question: "How can we write comment along with CSS code ?",
    choiceA: "/a comment/",
    choiceB: "//a comment//",
    choiceC: "<'ac comment'>", 
    choiceD: "/*a comment */",
    correctAnswer: "D"
}]

 //Other variables 
var finalQuestionIndex = gameQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 105;
var timeInterval = 0;
var score = 0;
var correct;



// This function helps to generate questions and answers.
function generateGameQuestions() {
    gameOver.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex) {
    return showScore();
    }
  var currentQuestion = gameQuestions[currentQuestionIndex];
  choices.innerHtml = "<p>" + currentQuestion.question + "</p>";
  buttonA = currentQuestion.choiceA;
  buttonB = currentQuestion.choiceB;
  buttonC = currentQuestion.choiceC;
  buttonD = currentQuesiton.choiceD;
};

// this function starts the timer 
function startGame() {
    gameOver.style.display = "none";
    startPageEl.style.display = "none";
    generateGameQuestions();


// Time remaining 
timeInterval = setInterval( function (){
    if (timeLeft > 1) {
        timerEl.textContent = timeLeft + " seconds remaining";
        timeLeft--;
    } else if (timeLeft === 1) {
        timerEl.textContent = timeLeft + " second remaining";
        timeLeft--;
    } else {
        timerEl.textContent = "";
        clearInterval(timeInterval);
        showScore()
    }
 }, 1000);
gameBody.style.display = "block";
}

function showScore() {
    gameBody.style.display = "none";
    gameOver.style.display = "flex";
    clearInterval(timeInterval);
    highScoreName.value = "";
    startPageEl.innerHtml = "You acert " + score + " out of" + gameQuestions.length + " correct!";

}

// When the user click the submit button, the function saves the new score and then saves the user name and score into the saving local storage. 

scoreBtn.addEventListener("click", function highScore(){

    if (highScoreName.value === "") {
    alert("Name is required");
    return false;
} else {
    var savedHighScore = JSON.parse(localStorage.getItem("savedHIghScore")) || [];
    var currentUser = highScoreName.value.trim();
    var currentHighScore = {
        name: currentUser,
        score: score
    }


gameOver.style.display = "none";
highScoreMain.style.display = "flex";
endGameBtn.style.display = "block";
hSContainer.style.display = "none";

savedHighScore.push(currentHighScore);
localStorage.setItem("savedHighScore", JSON.stringify(savedHighScore));
generateHighScore();
}
});


//this function clear and generate a new high score list
function generateHighScore() {
    highScorePoints.innerHtml = "";
    highScoreName.innerHtml = "";
    var hScore = JSON.parse(localStorage.getItem("savedHighScore")) || [];
    for (var i = 0; i < hScore.length; i++); {
    var newName = document.createElement("li");
    var newScore = document.createElement("li");
    newName.textContent = hScore[i].name;
    newScore.textContent = hScore[i].score;
    highScoreName.appendChild(newName);
    highScorePoints.appendChild(newScore);
}

hSbutton.addEventListener("click", showHighScore() );

// this function display high score
function showHighScore() {
    startPageEl.style.display = "none";
    gameOver.style.display = "none";
    hSContainer.style.display = "flex";
    highScoreMain.style.display = "block";
    endGameBtn.style.display = "flex";

    generateHighscore();
}

}
function clearScore() {
    window.localStorage.clear();
    highScoreName.textContent = "";
    highScorePoints.textContent = "";
}

function replayGame() {
    hSContainer.style.display = "none";
    gameOver.style.display = "none";
    startPageEl.style.display = "block";
    timeLeft = 105;
    score = 0;
    currentQuestionIndex = 0;
}

// this function see each question answered 
function checkAnswer(answer) {
    correct = gameQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
        score++;
        alert("Correct Answer!");
        currentQuestionIndex++;
        generateGameQuestions();
    } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
        alert("Wrong Answer!");
        currentQuestionIndex++;
        generateGameQuestions();
    }
    else {
        showScore();
    }
}

startBtn.addEventListener("click", startPageEl);

// when this element is click I want to call this function 
playAgainBtn.addEventListener("click", replayGame());

// this button clear the board score
clearScoreBtn.addEventListener("click", clearScore() );



