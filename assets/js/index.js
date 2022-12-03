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
        showsScores();
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