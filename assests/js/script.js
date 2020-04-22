var timerStart = false;
var gameOn = false;
var timer = null;
var qIndex = 0;
var qaSection = document.querySelector('#qaSection');
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
var darkBol = true;

var darkBtn = document.getElementById("darkBtn");
var darkCss = document.getElementById("dark_css");

function resetQuiz(){
    timerStart = false;
    gameOn = false;
    totalSeconds = 0;
    renderEnd();
    clearInterval(timer);
}

function setTime() {
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    if (totalSeconds === 60) {
        timerStart = false;
        gameOn = false;
        totalSeconds = 0;
        renderEnd();
        clearInterval(timer);
    }
    ++totalSeconds;
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

var questions = [];

for (var q = 0; q < 11; q++) {
    var temp_answers = [];
    for (var ta = 0; ta < 4; ta++) {
        temp_answers.push(q + ':Answer: ' + ta);
    }
    var tempObj = {
        "id": q,
        "question": "Question #" + (q + 1) + ": What number am I thinking of now?",
        "answer": temp_answers,
        "correct_answer": q
    }
    questions.push(tempObj);
}

init();

function init() {
    // Get stored Score from localStorage
    // Parsing the JSON string to an object
    var storedScore = JSON.parse(localStorage.getItem("Score"));

    // If Score were retrieved from localStorage, update the Score array to it
    if (storedScore !== null) {
        Score = storedScore;
    }

    // Render Score to the DOM
    renderStart();
}

function renderStart() {
    setTime();
    timerStart = false;
    qaSection.innerHTML = "";
    var qheader = document.createElement("h1");
    qheader.textContent = "Coding Quiz Challenge";

    qaSection.appendChild(qheader);
    var button = document.createElement("button");

    button.setAttribute("class", "btn btn-primary");
    button.setAttribute("id", "begin_button");
    button.textContent = "Start";

    qaSection.appendChild(button);
}


function renderEnd() {
    setTime();
    timerStart = false;
    qaSection.innerHTML = "";
    var qheader = document.createElement("h1");
    qheader.textContent = "ENDING";

    qaSection.appendChild(qheader);
    var button = document.createElement("button");

    button.setAttribute("class", "btn btn-primary");
    button.setAttribute("id", "begin_button");
    button.textContent = "Start";

    qaSection.appendChild(button);
}

function renderQuestion(i) {

    qaSection.innerHTML = "";
    var qheader = document.createElement("h5");
    qheader.setAttribute("class", "card-title");
    qheader.textContent = questions[i]['question'];

    qaSection.appendChild(qheader);

    var q_arry = questions[i]['answer'];
    var ul = document.createElement("ul");

    // Render a new li for each todo
    for (var j = 0; j < q_arry.length; j++) {
        var answer_choice = q_arry[j];

        console.log(answer_choice);
        var li = document.createElement("li");
        //li.textContent = answer_choice;
        li.setAttribute("data-index", j);

        var button = document.createElement("button");

        button.setAttribute("class", "btn btn-primary");
        button.setAttribute("data-index", j);
        button.textContent = answer_choice;

        li.appendChild(button);
        ul.appendChild(li);
    }
    qaSection.appendChild(ul);

}

function storeScore() {
    // Stringify and set "Score" key in localStorage to Score array
    localStorage.setItem("Score", JSON.stringify(Score));
}

darkBtn.addEventListener("click", function (event) {
    darkBol = !darkBol;
    //alert(darkBol);

    if(darkBol){
        darkCss.removeAttribute("disabled");
        darkBtn.textContent = "Light"
    }else{
        var att = document.createAttribute("disabled");       // Create a "class" attribute
        att.value = "disabled";                           // Set the value of the class attribute
        darkCss.setAttributeNode(att);
        darkBtn.textContent = "Dark"
    }
    console.log(darkBol)


});


// When a element inside of the todoList is clicked...
qaSection.addEventListener("click", function (event) {
    var element = event.target;


    // If that element is a button...
    if (element.matches("button") === true) {
        //alert('hello');

        if (gameOn) {
            var index = element.parentElement.getAttribute("data-index");

            console.log('You Pressed ' + index);
            if (questions[qIndex].correct_answer === parseInt(index)) {
                console.log(index + 'CORRECT!!!');
                alert("Correct!!! qIndex:" + qIndex + 'questions[qIndex].correct_answer: ' + questions[qIndex].correct_answer)
                //console.log(questions[qIndex].correct_answer + 'IS CORRECT!!!');
            }
            else {
                console.log(index + '? YOU SUCK!!!');
                console.log(questions[qIndex].correct_answer + 'IS CORRECT!!!');
            }

            qIndex++;
            renderQuestion(qIndex);
        };

        if (timerStart === false) {
            gameOn = true
            timer = setInterval(setTime, 1000);
            timerStart = true;
            renderQuestion(qIndex);
        }

        if (qIndex === questions.length - 1) {
            qIndex = 0;
            renderEnd();
            timerStart = false;
            gameOn = false;
            totalSeconds = 0;
            clearInterval(timer);
        }

    }
});
