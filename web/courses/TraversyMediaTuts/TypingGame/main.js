window.addEventListener('load', init);

let time = 5;
let score = 0;
let isPlaying;

const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');

const words = [
    'hat',
    'river',
    'luckey',
    'statue',
    'generate',
    'stubborn',
    'cocktail',
    'runaway'
];

function init() {
    showWord(words);

    wordInput.addEventListener('input', startMatch)

    setInterval(countDown, 1000);
    setInterval(checkStatus, 50);
}

function startMatch() {
    if(matchWords()) {
        isPlaying = true;
        time = 6;
        showWord(words);
        wordInput.value = '';
        score++;
    }
    if(score === -1) {
        scoreDisplay.innerHTML = 'Score: ' + 0;
    }else {
        scoreDisplay.innerHTML = 'Score: ' + score;
    }
}

function matchWords() {
    if(wordInput.value === currentWord.innerHTML) {
        message.innerHTML = 'Correct!!!';
        return true
    }else {
        message.innerHTML = '';
        return false;
    }
}

function showWord(words) {
    const randIndex = Math.floor(Math.random() * words.length);
    currentWord.innerHTML = words[randIndex];
}

function countDown() {
    if(time > 0) {
        time--;
    }else if(time === 0) {
        isPlaying = false;
    }

    timeDisplay.innerHTML = 'Time left: ' + time;
}

function checkStatus() {
    if(!isPlaying && time === 0) {
        message.innerHTML = 'Game Over!!!';
        score = -1;
    }
}