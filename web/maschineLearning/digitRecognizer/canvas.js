let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');

document.addEventListener('mousedown', mouseDown, false);
document.addEventListener('mouseup', mouseUp, false);
document.addEventListener('mousemove', move, false);
document.querySelector('.save').addEventListener('click', savePixelsArray);

// document.addEventListener('keydown', inputHandler, false);
// document.addEventListener('keyup', inputHandler, false);

let width = 0;
let height = 0;
let mousePressed = false;
let uiShowed = false;

let ui = document.querySelector('.ui');
let numWrote = document.querySelector('.wrote');

let json = JSON.parse(localStorage.getItem('data'));

let net = new brain.NeuralNetwork();
// console.log('before training... ' + JSON.stringify(json));
if(json != null) {
    net.train(json);
    console.log('trained');
    console.log(JSON.stringify(json));
}

window.addEventListener('resize', resizeWindow);
resizeWindow();
function resizeWindow() {
    if(window.innerWidth < window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerWidth;
    }else {
        canvas.width = window.innerHeight;
        canvas.height = window.innerHeight;
    }
    width = canvas.width;
    height = canvas.height;
}

function mouseDown(input) {
    if(uiShowed) return;
    mousePressed = true;
    hideUI();
}
function mouseUp(input) {
    mousePressed = false;
    showUI();
    getPrediction();
}

function getPrediction() {
    if(json == null) return;
    let span = document.querySelector('.prediction');
    let value = brain.likely(pixels, net);
    if(value == "zero") value = 0;
    if(value == "one") value = 1;
    if(value == "two") value = 2;
    if(value == "three") value = 3;
    if(value == "four") value = 4;
    if(value == "five") value = 5;
    if(value == "six") value = 6;
    if(value == "seven") value = 7;
    if(value == "eight") value = 8;
    if(value == "nine") value = 9;
    let probebly = 0;

    console.log(net.run(pixels));
    span.innerHTML = JSON.stringify(value);
    
}

function savePixelsArray() {
    json = JSON.parse(localStorage.getItem('data'));
    let item = {};
    if(numWrote.value == 1) {
        item = {
            input:pixels, 
            output: {one: 1}
        };
    }else if(numWrote.value == 2) {
        item = {
            input:pixels, 
            output: {two: 1}
        };
    }else if(numWrote.value == 3) {
        item = {
            input:pixels, 
            output: {three: 1}
        };
    }else if(numWrote.value == 4) {
        item = {
            input:pixels, 
            output: {four: 1}
        };
    }else if(numWrote.value == 5) {
        item = {
            input:pixels, 
            output: {five: 1}
        };
    }else if(numWrote.value == 6) {
        item = {
            input:pixels, 
            output: {six: 1}
        };
    }else if(numWrote.value == 7) {
        item = {
            input:pixels, 
            output: {seven: 1}
        };
    }else if(numWrote.value == 8) {
        item = {
            input:pixels, 
            output: {eight: 1}
        };
    }else if(numWrote.value == 9) {
        item = {
            input:pixels, 
            output: {nine: 1}
        };
    }else if(numWrote.value == 0) {
        item = {
            input:pixels, 
            output: {zero: 1}
        };
    }else {
        item = {
            input:pixels, 
            output: {nothing: 1}
        };
    }

    let data = json;
    if(data == null) {
        data = [];
    }
    data.push(item);
    localStorage.setItem('data', JSON.stringify(data));

    hideUI();

    resetPixels();
}

function hideUI() {
    ui.style.display = "none";
    uiShowed = false;
}

function showUI() {
    ui.style.display = "block";
    uiShowed = true;
}

function move(input) {
    if(mousePressed) {
        let xPadding = (window.innerWidth - width) / 2;
        let yPadding = (window.innerHeight - height) / 2;
        
        let x = Math.floor((input.clientX - xPadding) / (width / 16));
        let y = Math.floor((input.clientY - yPadding) / (height / 16));

        if(x >= 0 && x < 16 && y >= 0 && y < 16) {
            pixels[x + y * 16] = 1;
        }
    }
}

function drawLines() {
    context.fillStyle = '#000';
    for(let i = 0; i < 17; i++) {
        context.beginPath();
        context.moveTo(width / 16 * i, 0);
        context.lineTo(width / 16 * i, height);
        context.closePath();
        context.stroke();    
        
        context.beginPath();
        context.moveTo(0, height / 16 * i);
        context.lineTo(width, height / 16 * i);
        context.closePath();
        context.stroke();    
    }
}

function drawPixels() {
    context.fillStyle = '#000';
    for(let y = 0; y < 16; y++) {
        for(let x = 0; x < 16; x++) {
            if(pixels[x + y * 16] == 1) {
                context.fillRect(x * width / 16, y * height / 16, width / 16, height / 16);
            }
        }
    }
}


let pixels = [16 * 16];


function resetPixels() {
    for(let i = 0; i < 16 * 16; i++) {
        pixels[i] = 0;    
    }
}

resetPixels();

// pixels[0 + 3 * 16] = 1;
// pixels[11 + 5 * 16] = 1;


function update() {
    
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawLines();
    drawPixels();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);