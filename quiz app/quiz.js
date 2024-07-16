const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = document.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector('.timer .time_sec');
const timeLine = quiz_box.querySelector('header .time_line');
const timeOff = quiz_box.querySelector('header .time_text');

const option_list = document.querySelector(".option_list");

// If start quiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeinfo"); //show the info box
}

//If Exit button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeinfo"); //hide the info box
}

//If Continue button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeinfo"); //hide the info box
    quiz_box.classList.add("activeQuiz"); //show the quiz box
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector('.result_box');
const restart_quiz = result_box.querySelector('.buttons .restart');
const quit_quiz = result_box.querySelector('.buttons .quit');

restart_quiz .onclick = ()=>{
    quiz_box.classList.remove('activeQuiz');
    result_box.classList.remove('activeResult');
    let que_count = 0;
    let que_numb = 1;
    let timeValue = 15;
    let widthValue = 0;
    let userScore = 0;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    startTimer(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = 'none';
    timeOff.textContent = 'time Left';
}

quit_quiz .onclick = ()=>{
    window.location.reload();
}

//If Next Button Clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        
        startTimerLine(widthValue);
        next_btn.style.display = 'none';
        timeOff.textContent = 'time Left';
    }else{
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Questions completed");
        showResultBox();
    }
}

//Previous button Clicked


//getting questions and options from array
function showQuestions(index){
    const que_text = document.querySelector(".que_test");
    let que_tag = '<span> '+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].option[0] +'</span></div>'
                    + '<div class="option"><span>'+ questions[index].option[1] +'</span></div>'
                    + '<div class="option"><span>'+ questions[index].option[2] +'</span></div>'
                    + '<div class="option"><span>'+ questions[index].option[3] +'</span></div>'
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

let tickicon = '<div class="icon tick"><i class="fa-solid fa-check"></i></div>';
let crosskicon = '<div class="icon cross"><i class="fa-solid fa-xmark"></i></div>';

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if(userAns == correctAns){
        userScore += 1;
        console.log( userScore);
        answer.classList.add("correct");
        console.log("Answer is Correct");
        answer.insertAdjacentHTML('beforeend', tickicon);
    }else{
        answer.classList.add("incorrect");
        console.log("Answer is wrong");
        answer.insertAdjacentHTML('beforeend', crosskicon);

        //if answer is incorrect then automtically selected the correct answer
        for (let i = 0; i < allOptions; i++) {
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute('class', 'option correct');
                option_list.children[i].insertAdjacentHTML('beforeend', tickicon);
            }
        }
    }
    
    //once user selected  disabled all options
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = 'block';
}

function showResultBox(){
    info_box.classList.remove("activeinfo"); //hide the info box
    quiz_box.classList.remove("activeQuiz"); //hide the quiz box
    result_box.classList.add("activeResult"); //show the Result box
    const scoreText = result_box.querySelector('.score_text');
    if(userScore > 3){
        let scoreTag = '<span>and Congrats \u{1F389}! You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>'
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){
        let scoreTag = '<span>and nice \u{1F60E}, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>'
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>and sorry, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>'
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent ='0' + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";
            timeOff.textContent = 'time Off';

            let correctAns = questions[que_count].answer;
            let allOptions = option_list.children.length;

            for (let i = 0; i < allOptions; i++) {
                if(option_list.children[i].textContent == correctAns){
                    option_list.children[i].setAttribute('class', 'option correct');
                    option_list.children[i].insertAdjacentHTML('beforeend', tickicon);
                }
            }
            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.style.display = 'block';
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;
        timeLine.style.width = time + 'px';
        if(time > 549){
            clearInterval(counterLine);
        }
    }
}













function queCounter(index){
    const button_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>'+ index +'</p> Of <p>'+ questions.length +'</p>Question</span>';
    button_ques_counter.innerHTML = totalQuesCountTag;
}















//creating an array and passing the number, question, options and answers
let questions = [
    {
        numb: 1,
        question: "What does Html stand for?",
        answer: "Hyper Text Markup Language",
        option: [
            "Hyper Text Preprocessor",
            "Hyper Text Markup Language",
            "Hyper Text Multiple Language",
            "Hyper Text Tool Multi Language"
        ]
    },
    {
        numb: 2,
        question: "What does CSS stand for?",
        answer: "Cascading Style Sheet",
        option: [
            "Common Style Sheet",
            "Colorful Style Sheet",
            "Computer Style Sheet",
            "Cascading Style Sheet"
        ]
    },
    {
        numb: 3,
        question: "What does PHP stand for?",
        answer: "Hypertext Preprocessor",
        option: [
            "Hypertext Preprocessor",
            "Hypertext Programming",
            "Hypertext Preprogramming",
            "Hometext Preprocesson"
        ]
    },
    {
        numb: 4,
        question: "What does SQL stand for?",
        answer: "Structured Query Language",
        option: [
            "Stylish Question Language",
            "Stylesheet Query Language",
            "Statement Query Language",
            "Structured Query Language"
        ]
    },
    {
        numb: 5,
        question: "What does DBMS stand for?",
        answer: "Database Management System",
        option: [
            "Data Backup and Management Service",
            "Database Management System",
            "Dynamic Bandwidth Management System",
            "Distributed Batch Management Software"
        ]
    },
];