const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionsContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions =[];
let availableOptions = [];
let correctAnswer = 0;
let attempt = 0;

function setAvailableQuestions(){    
    const totalQuestions = quiz.length;
    for(let i=0; i<totalQuestions; i++){
       availableQuestions.push(quiz[i])
    }
}

//set question number and question and options
function getNewQuestion(){
    //set question number
    questionNumber.innerHTML = " Question " + (questionCounter + 1) + " of " + quiz.length;

    //set question text
    //get random question
    const numQuestions = availableQuestions.length;
    // console.log(numQuestions);
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
  
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    //get the position of 'questonIndex' from the availableAuestion Array
    const index1 = availableQuestions.indexOf(questionIndex);
    //remove the 'questonIndex' from the availableQtion array, so that the question does not reapeat
    availableQuestions.splice(index1,1)

    //get option
    //get the length of options
    const optionLen = currentQuestion.option.length

    //push options into availableOptions Array
    for(let i=0; i<optionLen; i++){
        availableOptions.push(i)
    }
    //remove increment in the other questions in the same question
    optionsContainer.innerHTML = '';
    const animationDelay = 0.15;
    //create options in html
    for(let i=0; i<optionLen; i++){
        //random option
        const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        //get the position of 'optonIndex' from the availableOptions
        const index2 = availableOptions.indexOf(optonIndex);
        //remove the 'optonIndex' from the availableOption, so that the option does not repeat
        availableOptions.splice(index2,1);
        // console.log(optonIndex)
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.option[optonIndex];
        option.id = optonIndex;
        option.className = "option";
        optionsContainer.appendChild(option);
        option.style.animationDelay = animationDelay + 's';
        animationsDelay = animationDelay + 0.15;        
        option.setAttribute("onclick", "getResult(this)");
    }

    questionCounter ++;
    
}

function getResult(element){
    const id = parseInt(element.id);   
    //get the answer by comparing the id of clicked option
    if(id === currentQuestion.answer){
        //set the green color tothe correct option
        element.classList.add("correct");
        //add the indicator to correct mark
        updateAnswerIndicator("correct");
        correctAnswer ++;
        console.log("Correct" + correctAnswer);
    }else{
        //set the red color to the wrong option
        element.classList.add("wrong");
        //add indicator to wrong mark
        updateAnswerIndicator("wrong");

        const optionLen = optionsContainer.children.length;
        for(let i=0; i<optionLen; i++){
            if(parseInt(optionsContainer.children[i].id) === currentQuestion.answer){
                optionsContainer.children[i].classList.add("correct");
            }
        }

    }

    attempt ++;
    unclickableOptions();
}

//make all the options unclickable once the user select a option (RESTRICT THE USER TO CHANGE TH OPTION AGAIN)
function unclickableOptions(){
    const optionLen = optionsContainer.children.length;
    for(let i=0; i < optionLen; i++){
        optionsContainer.children[i].classList.add("already-answered");
    }
  
}

function answersIndicator(){
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType){
    //console.log(markType);
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType);
     
}

function next(){
    if(questionCounter === quiz.length){
        quizOver();
    }else{
        getNewQuestion();
    }
}

function quizOver(){
    //hide quizbox
    quizBox.classList.add("hide");
    //show result box
    resultBox.classList.remove("hide");
    quizResult();
}

function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswer;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswer;
    const percentage = (correctAnswer/quiz.length)*100;
    resultBox.querySelector(".total-percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswer + " / " + quiz.length;
    
}

function resetQuiz(){

     questionCounter = 0;   
     correctAnswer = 0;
     attempt = 0;
}

function tryAgainQuiz(){

    //hide the resultBox
    resultBox.classList.add("hide");
    //show the quizBox
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function goToHome(){
    //hide result box
    resultBox.classList.add("hide");
    //show home box
    homeBox.classList.remove("hide");
    resetQuiz();
}

// ###START POINT###
function startQuiz(){
    //hide home box
    homeBox.classList.add("hide");
    //show quiz box
    quizBox.classList.remove("hide");
    //first we will set all question in availableQuestions Array
    setAvailableQuestions();
    //second we will call getNewQuestion(); function
    getNewQuestion();
    //to create indicator of answers
    answersIndicator();
}


window.onload = function(){
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
}







