let userScore = 0;
let compScore = 0;
let userScore_span = document.getElementById('user-score');
let compScore_span = document.getElementById('computer-score');
let scoreBoard_div = document.querySelector('.score-board');
let result = document.querySelector('.result p');
let rock_div = document.getElementById('r')
let paper_div = document.getElementById('p')
let scissors_div = document.getElementById('s')

function getComputerChoice() {
    let choices = ['r', 'p', 's'];
    return choices[Math.floor(Math.random() * 3)];
}

function win() {
    userScore++;
    userScore_span.innerHTML = userScore;
    result.innerHTML = "WIN!!!";
}

function lose() {
    compScore++;
    compScore_span.innerHTML = compScore;
    result.innerHTML = "LOSE!!!";
}

function draw() {
    result.innerHTML = "DRAW!!!";
}

function game(userChoice) {
    let computerChoice = getComputerChoice();
    switch(userChoice + computerChoice) {
        case "rs":
        case "pr":
        case "sp":
            win();
            break;
        case "rp":
        case "ps":
        case "sr":
            lose();
            break;
        case "rr":
        case "pp":
        case "ss":
            draw();
            break;
    }
}

function main() {    
    rock_div.addEventListener('click', function() {
        game('r');
    });
    paper_div.addEventListener('click', function() {
        game('p');
    });
    scissors_div.addEventListener('click', function() {
        game('s');
    });
}

main();