const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let curretQuestion = {}
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = []

let questions = [
    {
        question: "What is the Hottest Planet in the Sollar System?",
        choices1: 'Venus',
        choices2: 'Earth',
        choices3: 'Satturn',
        choices4: 'Pluto',
        answer: 'Venus',
    },
    {
        question: "How many Islands are there in the Philippines?",
        choices1: '7,356',
        choices2: '7,771',
        choices3: '5,535',
        choices4: '7,641',
        answer: '7,641',
    },
    {
        question: "What is the Smallest Country?",
        choices1: 'China',
        choices2: 'Vatican City',
        choices3: 'Philippines',
        choices4: 'Japan',
        answer: 'Vatican City',
    },
    {
        question: "What is 2 + 2?",
        choices1: '4',
        choices2: '22',
        choices3: '5',
        choices4: '10',
        answer: '4',
    },
    
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4;

startGame = () =>{
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('end.html');
    }

    questionCounter++;
    progressText.textContent = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.textContent = currentQuestion.question;

    choices.forEach((choice, index) => {
        const choiceNumber = index + 1;
        choice.textContent = currentQuestion['choices' + choiceNumber];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.textContent; 

        const classToApply = (selectedAnswer === currentQuestion.answer) ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.textContent = score;
}

startGame();
