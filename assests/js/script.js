$(document).ready(function () {
    var timerStart = false;
    var gameOn = false;
    var timer = null;
    var qIndex = 0;
    var qaCard = document.querySelector('#qa_card');
    var qaSection = document.querySelector('#qaSection');
    var scoreSection = document.querySelector('#scoreSection');
    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    var totalSeconds = 0;
    var darkBol = true;
    var highscores = [];
    var lastAnswerStatus = "";
    var userScore = 0;

    var darkBtn = document.getElementById("darkBtn");
    var darkCss = document.getElementById("dark_css");

    var saveFormElem = document.querySelector("#save_form");
    var showSaveFormBol = false;

    function resetQuiz() {
        lastAnswerStatus = "";
        timerStart = false;
        gameOn = false;
        totalSeconds = 0;
        var userScore = 0;
        renderEnd();
        clearInterval(timer);
    }

    function setTime() {
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
        if (totalSeconds === 10) {
            resetQuiz();
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
        var storedScore = JSON.parse(localStorage.getItem("scores"));

        // If Score were retrieved from localStorage, update the Score array to it
        if (storedScore !== null) {
            highscores = storedScore;
            // Render Score to the DOM
            renderScore();
        }
        renderStart();
    }

    function renderScore() {

        // Render a new li for each todo
        highscores.sort((a, b) => (a.score > b.score) ? -1 : 1)

        var highscores_length = highscores.length;
        if (highscores.length > 3) {
            highscores_length = 3;
        }

        // Find a <table> element with id="myTable":
        var tableScoreDiv = document.getElementById("table_score_div");
        tableScoreDiv.innerHTML = "";
        var table = document.createElement("table");
        table.classList.add("table");
        var header = table.createTHead();

        var row = table.insertRow(header);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = "#";
        cell2.innerHTML = "Player";
        cell3.innerHTML = "Score";

        for (var s = 0; s < highscores_length; s++) {
            var userScore = highscores[s];

            console.log(userScore);

            // Create an empty <tr> element and add it to the 1st position of the table:
            var row = table.insertRow(-1);

            // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);

            // Add some text to the new cells:
            cell1.innerHTML = (s + 1);

            cell2.innerHTML = userScore["name"];
            cell3.innerHTML = userScore["score"];

            //li.appendChild(pElem);
            //ul.appendChild(li);
        }
        tableScoreDiv.appendChild(table);

    }

    function renderStart() {
        setTime();
        timerStart = false;
        qaSection.innerHTML = "";

        var hrElem = document.createElement("hr");
        qaSection.appendChild(hrElem);

        var qheader = document.createElement("h1");
        qheader.textContent = "Coding Quiz Challenge";

        qaSection.appendChild(qheader);

        var button = document.createElement("button");

        button.setAttribute("class", "btn btn-primary");
        button.setAttribute("id", "begin_button");
        button.textContent = "Start";

        qaSection.appendChild(button);

        var hrElem = document.createElement("hr");
        qaSection.appendChild(hrElem);
    }


    function renderEnd() {
        
        //setTime();
        timerStart = false;
        qaSection.innerHTML = "";

        var hrElem = document.createElement("hr");
        qaSection.appendChild(hrElem);

        var qheader = document.createElement("h1");
        qheader.textContent = "All Done!";
        qaSection.appendChild(qheader);

        var qheader = document.createElement("h5");
        qheader.textContent = "Your final score is..." + userScore + ' points!';
        qaSection.appendChild(qheader);

        var button = document.createElement("button");

        button.setAttribute("class", "btn btn-primary");
        button.setAttribute("id", "save_button");
        button.textContent = "Would you like to Save?";

        button.addEventListener("click", function (event) {
            showSaveFormBol = !showSaveFormBol;
            if (showSaveFormBol) {
                qaCard.classList.add("hide");
                saveFormElem.classList.remove("hide");
            }
            else {
                qaCard.classList.remove("hide");
                saveFormElem.classList.add("hide");
            }
        });

        qaSection.appendChild(button);

        var hrElem = document.createElement("hr");
        qaSection.appendChild(hrElem);

        var button = document.createElement("button");

        button.setAttribute("class", "btn btn-primary");
        button.setAttribute("id", "begin_button");
        button.textContent = "Try Again?";

        qaSection.appendChild(button);

        var hrElem = document.createElement("hr");
        qaSection.appendChild(hrElem);
    }

    function renderQuestion(i) {

        qaSection.innerHTML = "";

        var hrElem = document.createElement("hr");
        qaSection.appendChild(hrElem);

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

        var hrElem = document.createElement("hr");
        qaSection.appendChild(hrElem);

        var divElem = document.createElement("h1");
        divElem.setAttribute("id", "answer_status");
        divElem.textContent = lastAnswerStatus;
        qaSection.appendChild(divElem);
    }

    //If it isn't "undefined" and it isn't "null", then it exists.
    if (typeof (darkBtn) != 'undefined' && darkBtn != null) {
        darkBtn.addEventListener("click", function (event) {
            darkBol = !darkBol;
            //alert(darkBol);

            if (darkBol) {
                darkCss.removeAttribute("disabled");
                darkBtn.textContent = "Light"
            } else {
                var att = document.createAttribute("disabled");       // Create a "class" attribute
                att.value = "disabled";                           // Set the value of the class attribute
                darkCss.setAttributeNode(att);
                darkBtn.textContent = "Dark"
            }
        });
    }

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
                    //alert("Correct!!! qIndex:" + qIndex + 'questions[qIndex].correct_answer: ' + questions[qIndex].correct_answer)
                    //console.log(questions[qIndex].correct_answer + 'IS CORRECT!!!');
                    lastAnswerStatus = "Correct!"
                    userScore += 1;
                }
                else {
                    console.log(index + '? YOU SUCK!!!');
                    console.log(questions[qIndex].correct_answer + 'IS CORRECT!!!');
                    lastAnswerStatus = "Wrong!"
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
                resetQuiz();
            }

        }
    });


    var savePlayerScorInputElem = document.querySelector("#save_player_score_input");
    var savePlayerScorBtnElem = document.querySelector("#save_player_score_button");
    savePlayerScorBtnElem.addEventListener("click", function (event) {
        event.preventDefault();
        console.log(savePlayerScorInputElem.value)
        var new_tScore = { "name": savePlayerScorInputElem.value, "score": userScore };
        highscores.push(new_tScore);
        console.log(highscores);

        localStorage.setItem("scores", JSON.stringify(highscores));
        renderScore();

        showSaveFormBol = !showSaveFormBol;
        if (showSaveFormBol) {
            qaCard.classList.add("hide");
            saveFormElem.classList.remove("hide");
        }
        else {
            qaCard.classList.remove("hide");
            saveFormElem.classList.add("hide");
        }
        renderStart();
    });

});