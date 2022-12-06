// create quiz class
class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }

    guess(answer) {
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score++; // increase score by 1
        }
        this.questionIndex++; // increase question index by 1/go to next question
    }

    isEnded() {
        return this.questionIndex === this.questions.length;
    }

};

// create question class
class Question {
    // for every question, have question itself (text), options (choices), correct answer
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrectAnswer(choice) {
        // check if answer chosen is correct
        return this.answer === choice;
    }
};

// display question
function displayQuestion() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        // show question
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text; 

        // show options
        let choices = quiz.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            // get choice id and use i to represent which choice
            let choiceElement = document.getElementById("choice" + i); 
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        // show progress
        showProgress();
    }
};

// create guess function
function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    }
};

// create show progress function
function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let progressElement = document.getElementById("progress");
    progressElement.innerHTML = 
    `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
};

// show score 
function showScores() {
    let quizEndHTML = 
    `
        <h1>Quiz Completed</h1>
        <h2 id="score">You Scored: ${quiz.score} of ${quiz.questions.length}</h2>
        <div class="quiz-repeat">
            <a href="https://ctrlaltree.github.io/big-bang-quiz-game/">Take Quiz Again</a>       
        </div>
    `;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizEndHTML;
};


// create quiz questions
let questions = [
    // refer to Question class, parameters: text, choices, answer
    new Question(
        "All of these guys make up the main cast of geeky friends in the show, except for:", ["Sheldon Cooper", "Leonard Hofstadter", "Howard Wolowitz", "Wil Wheaton"], "Wil Wheaton"
    ),
    new Question(
        "The four friends all work at this real-life university.", ["Stanford", "Caltech", "Harvard", "MIT"], "Caltech"
    ),
    new Question(
        "Both Sheldon and Leonard are physicists, but of differing branches. Which kind of physicist is Sheldon?", ["Experimental physicist", "Theoretical physicist", "Biophysicist", "Astrophysicist"], "Theoretical physicist"
    ),
    new Question(
        "In the beginning seasons, Penny worked as a waitress. Where did she work?", ["IHOP", "Denny\'s", "The Cheesecake Factory", "TGI Fridays"], "The Cheesecake Factory"
    ),
    new Question(
        "What is the name of Sheldon's love interest in the show?", ["Dr. Amy Fisher", "Dr. Amy Fowler", "Dr. Amy Sanchez", "Dr. Amy Smith"], "Dr. Amy Fowler"
    ),
    new Question(
        "What is Sheldon's favorite expression?", ["Eureka!", "Geronimo!", "Bazinga!", "Cowabunga!"], "Bazinga!"
    ),
    new Question(
        "Can you finish the lyrics? \"Soft kitty, warm kitty…\"", ["Little ball of fur", "Love to pet your fur", "Love to hear you roar", "Lovely kitty, cuddly kitty"], "Little ball of fur"
    ),
    new Question(
        "What is the name of Stuart's comic book store?", ["Galactic Quest", "Comic Book Central", "Kapow! Comics & Games", "The Comic Center of Pasadena"], "The Comic Center of Pasadena"
    ),
    new Question(
        "Among the cast members, who actually majored in science and earned a doctorate degree?", ["Jim Parsons", "Johnny Galecki", "Mayim Bialik", "Kaley Cuoco"], "Mayim Bialik"
    ),
    new Question(
        "And finally, what major event happened in the series finale?", ["The elevator was finally fixed", "Amy revealed her pregnancy", "Howard and Bernadette announced their divorce", "Cinnamon ran away"], "The elevator was finally fixed"
    )
];

let quiz = new Quiz(questions);

// display question, call function created above
displayQuestion();


// create countdown 
let time = 12;
// convert to minutes
let quizTimeInMinutes = time * 60 * 60;
let quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("count-down");

function startCountdown() {
    let quizTimer = setInterval(function (){
        // if countdown hits 0, stop timer and show scores
        if (quizTime <= 0) {
            clearInterval(quizTimer);
            showScores();
        } else {
            // reduce timer by 1
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `Time: ${min} : ${sec}`;
        }
    }, 1000) 
};

startCountdown();