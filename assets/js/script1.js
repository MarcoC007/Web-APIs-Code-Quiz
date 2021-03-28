// these are all the variables
var startBtn = document.getElementById("start-game-btn");
var highScoreBtn = document.getElementById("highscore-btn");
var startPageEl = document.getElementById("start-page");
var questionsEl = document.getElementById("questions");
var showQuestion = document.getElementById("choices");
var timeEl = document.getElementById("time");
var gameOverEl = document.getElementById('game-over');
var playerInit = document.getElementById("user-name-input");
var gameBody = document.getElementById("game");
var highScoreC = document.getElementById("highscore-container");
var highScoreMain = document.getElementById("highscore-main");
var endGameEl = document.getElementById('end-game');
var highScoreName = document.getElementById("highscore-name");
var highScorePoints = document.getElementById("highscore-points");
var submitBtn = document.getElementById("submit-btn");
var playAgainBtn = document.getElementById("play-again-btn");
var clearScoreBtn = document.getElementById("clear-score-btn");

// var buttonA = document.getElementById("buttonA");
// var buttonB = document.getElementById("buttonB");
// var buttonC = document.getElementById("buttonC");
// var buttonD = document.getElementById("buttonD");


// game choices
var gameQuestions = [{
    question: "What tag defines a division or the beginning/end of an individual section in an HTML document?",
    choiceA: "div",
    choiceB: "meta",
    choiceC: "img",
    choiceD: "table",
    correctAnswer: "A"
},
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
    choiceA: "The script",
    choiceB: "The /script",
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

// these are another variables 
var finalQuestionIndex = gameQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = gameQuestions.length * 15; 
var timer;
var score = 0;



function generateQuestions() {

gameOverEl.style.display = "none";
 

var currentQuestion = gameQuestions[currentQuestionIndex];
var choicesEl = document.getElementById('choices');

if(currentQuestion === finalQuestionIndex) {
    return showScore();
}

questionsEl.innerHTML = '<p>' + currentQuestion.question + '</p>';

buttonA.innerHTML = currentQuestion.choiceA;
buttonB.innerHTML = currentQuestion.choiceB;
buttonC.innerHTML = currentQuestion.choiceC;
buttonD.innerHTML = currentQuestion.choiceD;

choicesEl.innerHTML = " ";
}

// this function starts the game and display the game quiz content
function startGame() {

    startPageEl.style.display = 'none';

    gameOverEl.style.display = 'none';
    
    generateQuestions();

    timer = setInterval(function() {
        timeLeft--;
        timeEl.textContent = timeLeft + " seconds";

        if(timeLeft <= 1) {
            timeEl.textContent = timeLeft + " second";
        }

        else if(timeLeft === 0) {
        
            clearInterval(timer)
        
            showScore();

            
        
        }
        }, 1000);
       
        gameBody.style.display = "block";
    }
    



function showScore() {
    gameBody.style.display = "none";

    gameOverEl.style.display = "block";

    playerInit.value = "";

    clearInterval(timer);

    startPageEl.innerHTML = "You acert " + score + " of " + gameQuestions.length + " questions!!";

}

submitBtn.addEventListener('click', function highScore() {
   
    if (playerInit === "") {
        alert("You can't leave the highscore initials in blank");
        return false;
    }
     else {
        var saveHighscore = JSON.parse(window.localStorage.getItem('saveHighscore')) || [];
        var currentUser = playerInit.value.trim();
        var newScore = {
            name: currentUser,
            score: score
        }

        saveHighscore.push(newScore);
        window.localStorage.getItem('saveHighscore', JSON.stringify(saveHighscore));

        gameOverEl.style.display = "none";
        highScoreC.style.display = "block";
        highScoreMain.style.display = "inline-block";
        endGameEl.style.display = "none";


        
    }
  console.log('message');
});

// this function clear and generates a new highscore list

function generateHighScore() {
highScoreName.innerHTML = "";

highScorePoints.innerHTML = "";

var highscore = JSON.parse(window.localStorage.getItem('highscore')) || [];
for (var i = 0; i < highscore.length; i++) {
    var newName = document.createElement("li");
    var newHS = document.createElement("li");
    newName.textContent = highscore[i].name;
    newHs.textContent = highscore[i].score;
    highScoreName.appendChild(newName);
    highScorePoints.appendChild(newHS);
    
}
//console.log('it works');
}

// eventListener button that displays the showHighScore function

highScoreBtn.onclick = showHighScore;

// this function display the highscore

function showHighScore() {
    startPageEl.style.display = "none";
    gameOverEl.style.display = "none";
    endGameEl.style.display = "block";
    highScoreMain.style.diplay = "block";
    highScoreC.style.display = "none";
 
    generateHighScore();

}

// this function delete the highscore list 
function clearScore() {
    window.localStorage.clear();
    highScoreName = "";
    highScorePoints = "";
}

// this function sets back all the variables to the original function
function replayGame() {
    highScoreC.style.display = "none";
    gameOverEl.style.display = "none";
    startPageEl.style.display = "none";

    timeLeft = gameQuestions.length * 15;
    currentQuestionIndex = 0;
    score = 0;
    
}

// this function checks if a question is answered correct or wrong!
function checkAnswer(answer) {

    // var message = document.getElementById("display-message");

    var correct = gameQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
        score++;
        alert("Correct!");
        currentQuestionIndex++;
        generateQuestions();
    } 
    else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("Wrong!");
        currentQuestionIndex++;
        generateQuestions();
    } 
    else {
        showScore();
    }

}



    

// all are event listeners 
startBtn.onclick = startGame;

// buttonA.onclick = checkAnswer("A");

// buttonB.onclick = checkAnswer("B");

// buttonC.onclick = checkAnswer("C");

// buttonD.onclick = checkAnswer("D");

playAgainBtn.onclick = replayGame;

clearScoreBtn.onclick = clearScore;




