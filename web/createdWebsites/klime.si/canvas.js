var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var colors = [
	// '#e4ebf2',
	'#66CEFF',
	'#178fd6',
	'#84E2FF',
	'#66AAFF'
];

window.addEventListener('resize', function(){
	if(canvas.width != window.innerWidth) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
		restart();
    }else {        
		canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;	
	}
});

function randomIntFromRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}


function Particle(x, y, endX, endY, radius, color) {
    this.colored = false;
	this.x = x;
	this.y = y;
	this.startX = x;
	this.startY = y;
	this.endX = endX;
	this.endY = endY;
	this.angle = Math.atan2(this.endY - this.startY, this.endX - this.startX);
	this.radius = radius;
	this.color = color;
	this.opacity = 1;
	this.speed = 1;
	this.velocity = {
		x: Math.cos(this.angle) * this.speed,
		y: Math.sin(this.angle) * this.speed
	};

	this.update = function(particles) {
		this.draw();
		
		if(this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) {
			this.velocity.x = -this.velocity.x;
		}
		if(this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) {
			this.velocity.y = -this.velocity.y;
        }
        
		
		// if(this.mass != 1 && this.opacity <= 0.7) {
			// 	this.opacity = 0.7;
			// }
			
		this.x += this.velocity.x;
		this.y += this.velocity.y;
		
		if(Math.round(this.x) == this.endX && Math.round(this.y) == this.endY || Math.round(this.x) == this.startX && Math.round(this.y) == this.startY) {
			this.velocity.x *= -1;
			this.velocity.y *= -1;
		}
	}
		
	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);	
		c.save();
		c.globalAlpha = this.opacity;
		c.fillStyle = this.color;
		c.fill();
		c.restore();
	}
	
}

let particles;

function restart() {
	particles = [];
	
    let x;
    let y;
    let endX;
	let endY;
	let color = '#74C6EE';
	let radius;
	
    let numOfBalls = 8;
	let minRad = 4;
	let maxRad = 10;

	if(canvas.width > 500 || canvas.height > 500) {
		numOfBalls = 10;
		minRad = 5;
		maxRad = 15;
	}
	if(canvas.width > 700 || canvas.height > 700) {
		numOfBalls = 15;
	}
	if(canvas.width > 900 || canvas.height > 900) {
		minRad = 5;
		maxRad = 20;
	}

	for(let i = 0; i < numOfBalls; i++) {
		color = colors[randomIntFromRange(0, colors.length - 1)];
		radius = randomIntFromRange(minRad, maxRad);
		x = randomIntFromRange(radius, canvas.width - radius);
		y = randomIntFromRange(radius, canvas.height - radius);
		endX = randomIntFromRange(radius, canvas.width - radius);
		endY = randomIntFromRange(radius, canvas.height - radius);
		particles.push(new Particle(x, y, endX, endY, radius, color));
	}

}

function animate() {
	c.fillStyle = "#fff";
	
	c.fillRect(0, 0, innerWidth, innerHeight);
	
	for(let i = 0; i < particles.length; i++) {
        particles[i].update(particles);
	}
	
    requestAnimationFrame(animate);
}

restart();
animate();