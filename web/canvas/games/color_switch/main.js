let colorSwitcherImage = document.getElementById('colors-switcher');

let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');

document.addEventListener('click', inputHandler, false);
document.addEventListener('keydown', inputHandler, false);
// document.addEventListener('keyup', inputHandler, false);

function inputHandler(input) {
    // if(input instanceof MouseEvent) {
    //     ball.vel.y = -8;
    // }else if(input instanceof KeyboardEvent) {
    //     ball.vel.y = -8;
    // }
    
    ball.vel.y = -8;
    if(!started) started = true;
}

const ColorSwitcher = function(y) {
    this.radius = 6;
    this.pos = {x:canvas.width / 2 - this.radius, y:y - this.radius};
    this.vel = {x:0, y:0.8};

    this.update = function() {
        this.pos.y += this.vel.y;
        this.pos.x += this.vel.x;
    }

    this.render = function() {
        context.drawImage(colorSwitcherImage, this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
    }
}

const Ball = function() {
    this.radius = 6;
    this.pos = {x:canvas.width / 2 - this.radius, y:canvas.height / 3 * 2};
    this.vel = {x:0, y:-8};
    this.maxVel = 50;
    this.posibleColors = ['#f3de00', '#8919ff', '#f40080', '#5ce2f3'];
    this.color = this.posibleColors[Math.floor(Math.random() * 4)];
    this.gravity = 0.6;
    
    this.newRandColor = function() {
        this.color =  this.posibleColors[Math.floor(Math.random() * 4)];
    }

    this.update = function() {
        if(this.vel.y <= this.maxVel) {
            this.vel.y += this.gravity;
        }
        this.pos.y += this.vel.y;
        this.pos.x += this.vel.x;

    }

    this.render = function() {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.pos.x + this.radius, this.pos.y + this.radius, this.radius, 0, 2 * Math.PI, false);
        context.fill();
    }
}

const Obstacle = function(y) {
    this.radius = Math.floor(Math.random() * 25) + 55;
    this.pos = {x:canvas.width / 2 - this.radius, y:y - this.radius};
    this.vel = {x:0, y:0.8};
    this.rot = Math.random() * Math.PI * 2;
    this.fix = Math.atan(6 / this.radius);

    this.canGo = 0;
    this.canGo2 = 2;

    this.newRandRadius = function() {
        this.radius = Math.floor(Math.random() * 25) + 55;
        this.pos.x = canvas.width / 2 - this.radius;
        this.rot = Math.random() * Math.PI * 2;
        this.fix = Math.atan(6 / this.radius);
    }

    this.update = function() {
        this.pos.y += this.vel.y;
        this.pos.x += this.vel.x;
        this.rot += 0.02;
        if(this.rot >= Math.PI * 2) this.rot -= Math.PI * 2;
        
        if(this.rot > this.fix && this.rot < Math.PI / 2 - this.fix) {
            this.canGo = 0;
            this.canGo2 = 2;
        }else if(this.rot > Math.PI / 2 + this.fix && this.rot < Math.PI - this.fix) {
            this.canGo = 1;
            this.canGo2 = 3;
        }else if(this.rot > Math.PI + this.fix && this.rot < Math.PI / 2 * 3 - this.fix) {
            this.canGo = 2;
            this.canGo2 = 0;
        }else if(this.rot > Math.PI / 2 * 3 + this.fix && this.rot < Math.PI * 2 - this.fix) {
            this.canGo = 3;
            this.canGo2 = 1;
        }
    }

    this.render = function() {
        context.fillStyle = '#f3de00';
        context.beginPath();
        context.moveTo(this.pos.x + this.radius,this.pos.y + this.radius);
        context.arc(this.pos.x + this.radius, this.pos.y + this.radius, this.radius, this.rot, Math.PI / 2 + this.rot, false);        
        context.closePath();
        context.fill();        
        context.fillStyle = '#5ce2f3';
        context.beginPath();
        context.moveTo(this.pos.x + this.radius,this.pos.y + this.radius);
        context.arc(this.pos.x + this.radius, this.pos.y + this.radius, this.radius, Math.PI / 2 + this.rot, Math.PI + this.rot, false);        
        context.closePath();
        context.fill();        
        context.fillStyle = '#f40080';
        context.beginPath();
        context.moveTo(this.pos.x + this.radius,this.pos.y + this.radius);
        context.arc(this.pos.x + this.radius, this.pos.y + this.radius, this.radius, Math.PI + this.rot, Math.PI / 2 * 3 + this.rot, false);        
        context.closePath();
        context.fill();        
        context.fillStyle = '#8919ff';
        context.beginPath();
        context.moveTo(this.pos.x + this.radius,this.pos.y + this.radius);
        context.arc(this.pos.x + this.radius, this.pos.y + this.radius, this.radius, Math.PI / 2 * 3 + this.rot, this.rot, false);        
        context.closePath();
        context.fill();
        context.fillStyle = '#000';
        context.beginPath();       
        context.arc(this.pos.x + this.radius, this.pos.y + this.radius, this.radius - 6, 0, Math.PI * 2, false);   
        context.closePath();
        context.fill();
    }
}

let ball;
let colorSwitchers;
let obstacles;
let started = false;
let score = 0;

function start() {
    ball = new Ball;
    colorSwitchers = [new ColorSwitcher(-50), new ColorSwitcher(-350)];
    obstacles = [new Obstacle(-200), new Obstacle(-500), new Obstacle(-800)];
    started = false;
    score = 0;
}

function checkCollision(o1, o2) {
    let co1 = {x:o1.pos.x + o1.radius, y:o1.pos.y + o1.radius};
    let co2 = {x:o2.pos.x + o2.radius, y:o2.pos.y + o2.radius};

    if(Math.sqrt((co2.x - co1.x) * (co2.x - co1.x) + (co2.y - co1.y) * (co2.y - co1.y)) < o1.radius + o2.radius) {
        return true;
    }

    return false;
}

function checkCollision2IsSmaller(o1, o2) {
    let co1 = {x:o1.pos.x + o1.radius, y:o1.pos.y + o1.radius};
    let co2 = {x:o2.pos.x + o2.radius, y:o2.pos.y + o2.radius};

    if(Math.sqrt((co2.x - co1.x) * (co2.x - co1.x) + (co2.y - co1.y) * (co2.y - co1.y)) < o2.radius - 6 - o1.radius) {
        return true;
    }
    return false;
}

function update() {    
    ball.update();
    if(ball.pos.y + ball.radius * 2 > canvas.height) {
        // game over
        start();
    }

    for(let i = 0; i < obstacles.length; i++) {
        obstacles[i].update();
        
        if(obstacles[i].pos.y > canvas.height) {
            obstacles[i].pos.y -= 900;
            obstacles[i].newRandRadius();
            score++;
        }

        if(checkCollision(ball, obstacles[i]) && ! checkCollision2IsSmaller(ball, obstacles[i])) {
            if(ball.pos.y + ball.radius > obstacles[i].pos.y + obstacles[i].radius) {
                if(ball.posibleColors[obstacles[i].canGo] != ball.color) {
                    // game over
                    start();
                }
            }else {
                if(ball.posibleColors[obstacles[i].canGo2] != ball.color) {
                    // game over
                    start();              
                }
            }
        }
    }
    for(let i = 0; i < colorSwitchers.length; i++) {
        colorSwitchers[i].update();
        if(checkCollision(ball, colorSwitchers[i])) {        
            ball.newRandColor();
            colorSwitchers.push(new ColorSwitcher(colorSwitchers[i].pos.y - 600));
            colorSwitchers.splice(i, 1);
        }  
    }
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    for(let i = 0; i < obstacles.length; i++) {
        obstacles[i].render();
    }
    for(let i = 0; i < colorSwitchers.length; i++) {
        colorSwitchers[i].render();
    }

    context.textAlign = "center";
    context.font = "30px sans-serif";
    context.fillStyle = "#fff";
    // let textWidth = context.measureText(score).width;
    context.fillText(score, canvas.width / 2, 40, canvas.width);

    ball.render();
}

function gameLoop() {
    if(started) {
        update();
    }
    draw();
    requestAnimationFrame(gameLoop);
}

start();
requestAnimationFrame(gameLoop);