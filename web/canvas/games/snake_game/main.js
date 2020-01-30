var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

class Part {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
}

partWidth = 10;
partHeight = 10;

let body = [new Part(canvas.width / 2 + 1 * partWidth, canvas.height / 2)];
body.push(new Part(canvas.width / 2, canvas.height / 2));
body.push(new Part(canvas.width / 2 - 1 * partWidth, canvas.height / 2));

let fruit = randLocation();

function randLocation() {
    let randX = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    let randY = Math.floor(Math.random() * (canvas.height / 10)) * 10;
    let position = new Part(randX, randY);
    return position;
}

let dir = 0;
let dirCanChange = true;

function keyDownHandler(e) {
    // if(e.key == "Right" || e.key == "ArrowRight" || e.key == "d") {
    //     if(dir != 1 && dirCanChange) {
    //         dirCanChange = false;
    //         dir = 0;
    //     }
    // }else if(e.key == "Left" || e.key == "ArrowLeft" || e.key == "a") {
    //     if(dir != 0 && dirCanChange){ 
    //         dirCanChange = false;
    //         dir = 1;
    //     }    
    // }else if(e.key == "Down" || e.key == "ArrowDown" || e.key == "s") {
    //     if(dir != 3 && dirCanChange) {
    //         dirCanChange = false;
    //         dir = 2;
    //     }    
    // }else if(e.key == "Up" || e.key == "ArrowUp" || e.key == "w") {
    //     if(dir != 2 && dirCanChange) {
    //         dirCanChange = false;
    //         dir = 3;
    //     }    
    // }    
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight" || e.key == "d") {
        if(dir != 1 && dirCanChange) {
            dirCanChange = false;
            dir = 0;
        }
    }else if(e.key == "Left" || e.key == "ArrowLeft" || e.key == "a") {
        if(dir != 0 && dirCanChange){ 
            dirCanChange = false;
            dir = 1;
        }    
    }else if(e.key == "Down" || e.key == "ArrowDown" || e.key == "s") {
        if(dir != 3 && dirCanChange) {
            dirCanChange = false;
            dir = 2;
        }    
    }else if(e.key == "Up" || e.key == "ArrowUp" || e.key == "w") {
        if(dir != 2 && dirCanChange) {
            dirCanChange = false;
            dir = 3;
        }    
    }  
}

// function mouseMoveHandler(e) {
  
// }

// function drawBall() {
//   ctx.beginPath();
//   ctx.arc(x, y, ballRadius, 0, Math.PI*2);
//   ctx.fillStyle = "#0095DD";
//   ctx.fill();
//   ctx.closePath();
// }
// function drawPaddle() {
//   ctx.beginPath();
//   ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
//   ctx.fillStyle = "#0095DD";
//   ctx.fill();
//   ctx.closePath();
// }
// function drawBricks() {
//   for(var c=0; c<brickColumnCount; c++) {
//     for(var r=0; r<brickRowCount; r++) {
//       if(bricks[c][r].status == 1) {
//         var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
//         var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
//         bricks[c][r].x = brickX;
//         bricks[c][r].y = brickY;
//         ctx.beginPath();
//         ctx.rect(brickX, brickY, brickWidth, brickHeight);
//         ctx.fillStyle = "#0095DD";
//         ctx.fill();
//         ctx.closePath();
//       }
//     }
//   }
// }
// function drawScore() {
//   ctx.font = "16px Arial";
//   ctx.fillStyle = "#0095DD";
//   ctx.fillText("Score: "+score, 8, 20);
// }
// function drawLives() {
//   ctx.font = "16px Arial";
//   ctx.fillStyle = "#0095DD";
//   ctx.fillText("Lives: "+lives, canvas.width-65, 20);
// }

function drawBody() {
    for(let i = 0; i < body.length; i++) {
        ctx.beginPath();
        ctx.rect(body[i].x, body[i].y, partWidth - 1, partHeight - 1);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}

function drawFruit() {
        ctx.beginPath();
        ctx.rect(fruit.x, fruit.y, partWidth - 1, partHeight - 1);
        ctx.fillStyle = "#ff0000";
        ctx.fill();
        ctx.closePath();
}


function move() {
    for(let i = body.length - 1; i > 0; i--) {
        body[i].x = body[i - 1].x;
        body[i].y = body[i - 1].y;
    }

    if(dir == 0) {
        body[0].x += partWidth;
    }else if(dir == 1) {
        body[0].x -= partWidth;
    }else if(dir == 2) {
        body[0].y += partHeight;
    }else if(dir == 3) {
        body[0].y -= partHeight;
    }
    dirCanChange = true;
}

function checkIfGrow() {
    if(body[0].x == fruit.x && body[0].y == fruit.y) {
        body.push(new Part(body[body.length - 1].x , body[body.length - 1].y));
        fruit = randLocation();
    }
}

function checkForCollisions() {
    if(body[0].x < 0 || body[0].x + partWidth > canvas.width || body[0].y < 0 || body[0].y + partHeight > canvas.height) {
        return true;
    }

    for(let i = 1; i < body.length; i++) {
        if(body[0].x == body[i].x && body[0].y == body[i].y) {
            return true;
        }
    }
} 


let counter = 0;
let gameOver = false;


function update() {
    if(counter % 10 == 0) {
        move();
        checkIfGrow();
        gameOver = checkForCollisions();
        if(gameOver) {
            alert("GAME OVER");
            document.location.reload();
        }
    }
    
    counter++;
}

function draw() {
    update();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBody();
    drawFruit();

    requestAnimationFrame(draw);
}

draw();