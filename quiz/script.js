const questions = [
    {
        question: 'What is the best sport?',
        answers: [
            { text: 'Soccer', correct: false },
            { text: 'Basketball', correct: false },
            { text: 'Baseball', correct: false },
            { text: 'Volleyball', correct: true },
        ]
    },
    {
        question: 'Who is the president?',
        answers: [
            { text: 'Hilary Clinton', correct: false },
            { text: 'Donald Trump', correct: false },
            { text: 'Mike Pence', correct: false },
            { text: 'Joe Biden', correct: true },
        ]
    },
    {
        question: 'What is the largest continent in the world?',
        answers: [
            { text: 'Russia', correct: false },
            { text: 'Europe', correct: false },
            { text: 'Asia', correct: true },
            { text: 'North America', correct: false },
        ]
    },
    {
        question: 'What is the most expensive company in the world?',
        answers: [
            { text: 'Apple', correct: true },
            { text: 'NVIDA', correct: false },
            { text: 'Microsoft', correct: false },
            { text: 'McDonalds', correct: false },
        ]
    },
    {
        question: 'When did WWII end?',
        answers: [
            { text: '1900', correct: false },
            { text: '1894', correct: false },
            { text: '1945', correct: true },
            { text: '1936', correct: false },
        ]
    },
    {
        question: 'What was the highest grossing movie of 2023?',
        answers: [
            { text: 'Oppenheimer', correct: false },
            { text: 'Barbie', correct: true },
            { text: 'Super Mario Bros', correct: false },
            { text: 'Guardians of the Galaxy vol. 3', correct: false },
        ]
    }

];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('nextButton');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}
function resetState(){
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if(isCorrect){
        selectedButton.classList.add("correct");
        score++;
    }else{
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
nextButton.addEventListener("click", ()=> {
    if ( currentQuestionIndex < questions.length ) {
        handleNextButton();
    }else{
        startQuiz();
    }
});


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else {
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}

startQuiz();