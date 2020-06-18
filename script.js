let forGuess = document.getElementById("forGuess");
let buttons = document.getElementsByTagName("button");
let resultBox = document.getElementById("result");

let min = 32;
let max = 127;

let mode = 0;
let value = 0;

function rand(minNum, maxNum) {
    return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
}

function generateNewTest() {
    mode = rand(0, 1);
    value = rand(min, max);

    if (mode == 0)
        forGuess.textContent = value.toString(16);
    else
        forGuess.textContent = String.fromCharCode(value);
    
    let start = rand(value - 7, value);
    let end = start + 7;
    if (start < min) {    
        start = min;
        end = min + 7;
    }
    if (end > max) {
        start = max - 7;
        end = max;
    }

    let index = 0;
    for (let i = start; i <= end; i++) {
        buttons[index].value = i;
        if (mode == 0)
        {
            buttons[index++].textContent = String.fromCharCode(i);
        }
        else
        {
           buttons[index++].textContent = i.toString(16);
        }
    }
    resultBox.textContent = "Choose an answer";
    resultBox.style.backgroundColor = "blue";
}

forGuess.addEventListener("click", generateNewTest);

function checkAns(e) {
    if (e.target.value === value.toString()) {
        resultBox.textContent = "Correct";
        resultBox.style.backgroundColor = "green";
    }
    else {
        const ans = mode === 0?String.fromCharCode(value):value.toString(16);
        resultBox.textContent = `Incorrect. It must be '${ans}'`;
        resultBox.style.backgroundColor = "red";
    }
}

for (let btn of buttons) {
    btn.addEventListener("click", checkAns);
}

generateNewTest();