var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

class Vector2d {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
}

class Box {
    constructor(position, num) {
        this.position = position;
        this.x = position.x;
        this.y = position.y;
        this.num = num;
    }
}

let width = 100;
let height = 100;

let boxes = [new Box(randVectorPositionWithCheck(false), 2)];

let dir = -1;

function randVectorPositionWithCheck(check) {
    let xx;
    let yy;
    if(!check) {
        xx = Math.floor(Math.random() * 4) * 100;
        yy = Math.floor(Math.random() * 4) * 100;
    }else {
        let can = false;
        while(!can) {
            can = true;
            xx = Math.floor(Math.random() * 4) * 100;
            yy = Math.floor(Math.random() * 4) * 100;
            for(let i = 0; i < boxes.length; i++) {
                if(boxes[i].x == xx && boxes[i].y == yy) {
                    can = false;
                }
            }
        }
    }

    return new Vector2d(xx, yy);
}


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
    if(dir == -1) {
        if(e.key == "Right" || e.key == "ArrowRight" || e.key == "d") {
            dir = 3;
        }else if(e.key == "Left" || e.key == "ArrowLeft" || e.key == "a") {
            dir = 2;
        }else if(e.key == "Down" || e.key == "ArrowDown" || e.key == "s") {
            dir = 1;
        }else if(e.key == "Up" || e.key == "ArrowUp" || e.key == "w") {
            dir = 0;            
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

function drawBoxes() {
    for(let i = 0; i < boxes.length; i++) {
        ctx.beginPath();
        ctx.rect(boxes[i].x, boxes[i].y, width, height);
        if(boxes[i].num == 2) {
            ctx.fillStyle = "#00ff00";
        }else if(boxes[i].num == 4) {
            ctx.fillStyle = "#00dd00";
        }else if(boxes[i].num == 8) {
            ctx.fillStyle = "#22cc22";
        }else if(boxes[i].num == 16) {
            ctx.fillStyle = "#33bb33";
        }else if(boxes[i].num == 32) {
            ctx.fillStyle = "#44aa44";
        }else if(boxes[i].num == 64) {
            ctx.fillStyle = "#559955";
        }else if(boxes[i].num == 128) {
            ctx.fillStyle = "#558855";
        }else if(boxes[i].num == 256) {
            ctx.fillStyle = "#447744";
        }else if(boxes[i].num == 512) {
            ctx.fillStyle = "#336633";
        }else if(boxes[i].num == 1024) {
            ctx.fillStyle = "#226622";
        }else if(boxes[i].num == 2048) {
            ctx.fillStyle = "#115511";
        }else if(boxes[i].num == 4096) {
            ctx.fillStyle = "#004400";
        }
        ctx.fill();
        ctx.closePath();
          ctx.font = "30px Arial";
          ctx.fillStyle = "#000";
          ctx.textAlign = "center"; 
          ctx.fillText("" + boxes[i].num, boxes[i].x + width / 2, boxes[i].y + height / 2 + 10);
    }
}

let somethingMoved = false;

function move() {
    let moving = false;
    // sort array
    if(dir == 0) {
        boxes.sort(function(a, b) {return a.y - b.y});
    }else if(dir == 1) {
        boxes.sort(function(a, b) {return b.y - a.y});
    }else if(dir == 2) {
        boxes.sort(function(a, b) {return a.x - b.x});
    }else if(dir == 3) {
        boxes.sort(function(a, b) {return b.x - a.x});
    }

    for(let i = 0; i < boxes.length; i++) {
        if(dir == 0) {
            if(boxes[i].y > 0) {    
                let canGo = true;            
                for(let j = 0; j < boxes.length; j++) {
                    if(j == i) continue;
                    if(boxes[j].x == boxes[i].x && boxes[i].y > boxes[j].y && boxes[i].num != boxes[j].num) {
                        if(boxes[i].y - 1 < boxes[j].y + 100) {
                            canGo = false;
                        }
                    }
                }
                if(canGo) {
                    boxes[i].y -= 10;
                    moving = true;
                }
            }
        }else if(dir == 1) {
            if(boxes[i].y < canvas.height - height) {
                let canGo = true;            
                for(let j = 0; j < boxes.length; j++) {
                    if(j == i) continue;
                    if(boxes[j].x == boxes[i].x && boxes[i].y < boxes[j].y && boxes[i].num != boxes[j].num) {
                        if(boxes[i].y + 1 + 100 > boxes[j].y) {
                            canGo = false;
                        }
                    }
                }
                if(canGo) {
                    boxes[i].y += 10;
                    moving = true;
                }
            }
        }else if(dir == 2) {
            if(boxes[i].x > 0) {
                let canGo = true;            
                for(let j = 0; j < boxes.length; j++) {
                    if(j == i) continue;
                    if(boxes[j].y == boxes[i].y && boxes[i].x > boxes[j].x && boxes[i].num != boxes[j].num) {
                        if(boxes[i].x - 10 < boxes[j].x + 100) {
                            canGo = false;
                        }
                    }
                }
                if(canGo) {
                    boxes[i].x -= 10;
                    moving = true;
                }
            }
        }else if(dir == 3) {
            if(boxes[i].x < canvas.width - width) {
                let canGo = true;            
                for(let j = 0; j < boxes.length; j++) {
                    if(j == i) continue;
                    if(boxes[j].y == boxes[i].y && boxes[i].x < boxes[j].x && boxes[i].num != boxes[j].num) {
                        if(boxes[i].x + 10 + 100 > boxes[j].x) {
                            canGo = false;
                        }
                    }
                }
                if(canGo) {
                    boxes[i].x += 10;
                    moving = true;
                }
            }
        }
    }

    if(!moving) {
        dir = -1;
        let randValue = Math.floor(Math.random() * 2);
        let num = 2;
        if(randValue != 0) {
            num = 4
        }
        if(somethingMoved) {
            boxes.push(new Box(randVectorPositionWithCheck(true), num));
        }
        somethingMoved = false;
    }else {
        somethingMoved = true;
        checkAndDOuble();
    }
}

function checkAndDOuble() {
    for(let i = 0; i < boxes.length; i++) {
        for(let j = 0; j < boxes.length; j++) {
            if(i == j) continue;
            if(boxes[i].x == boxes[j].x && boxes[i].y == boxes[j].y) {
                boxes[i].num *= 2;
                boxes.splice(j, 1);
            }
        }
    }
}


function update() {
    if(dir != -1) {
        move();
    }

}

function draw() {
    update();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBoxes();

    requestAnimationFrame(draw);
}

draw();