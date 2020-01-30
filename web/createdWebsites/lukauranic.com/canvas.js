var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
	x:-100,
	y:-100
}

var colors = [
	'#107050',
	'#c7f6ec',
	'#55d9c0',
	'#4dd8ad'
];

window.addEventListener('mousemove', function(event){
	mouse.x = event.x;
	mouse.y = event.y;	
});

// window.addEventListener('touchstart', function(event){
// 	mouse.x = event.x;
// 	mouse.y = event.y;	
// });

// window.addEventListener('touchmove', function(event){
// 	mouse.x = event.x;
// 	mouse.y = event.y;	
// });


window.addEventListener('resize', function(){
    if(canvas.width != window.innerWidth) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    }else {        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;	
    }
});

// window.addEventListener('click', function(){
    // for different effects
	// init();
// });

function randomIntFromRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor() {
	return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
	let xDistance = x2 - x1;
	let yDistance = y2 - y1;
	
	return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function rotate(velocity, angle) {
	const rotatedVelocities = {
		x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),	
		y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
	};
	return rotatedVelocities;
}

function resolveCollision(particle, otherParticle) {
	const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
	const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;
	
	const xDist = otherParticle.x - particle.x;
	const yDist = otherParticle.y - particle.y;
	
	if(xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
		const angle = -Math.atan2(yDist, xDist);
		const m1 = particle.mass;
		const m2 = otherParticle.mass;
		
		const u1 = rotate(particle.velocity, angle);
		const u2 = rotate(otherParticle.velocity, angle);
		
		const v1 = {x:(u1.x * (m1 - m2) + 2 * u2.x * m2 )/ (m1 + m2), y:u1.y};
		const v2 = {x:(u2.x * (m2 - m1) + 2 * u1.x * m1 )/ (m1 + m2), y:u2.y};
		
		const vFinal1 = rotate(v1, -angle);
		const vFinal2 = rotate(v2, -angle);
		
		particle.velocity.x = vFinal1.x;
		particle.velocity.y = vFinal1.y;
		otherParticle.velocity.x = vFinal2.x;
		otherParticle.velocity.y = vFinal2.y;
        
        particle.colored = !particle.colored;
        otherParticle.colored = !otherParticle.colored;
        
	}
}

function Particle(x, y, radius, mass) {
    this.colored = false;
	this.x = x;
	this.y = y;
	this.velocity = {
		x: (Math.random() - 0.5) * 1.5,
		y: (Math.random() - 0.5) * 1.5
	};
	this.radius = radius;
	this.color = randomColor();
	this.mass = mass;
	this.opacity = 0;
	
	this.update = function(particles) {
		this.draw();
		
		for(let i = 0; i <  particles.length; i++) {
			if(this == particles[i]) continue;
			if(distance(this.x, this.y, particles[i].x, particles[i].y) - this.radius - particles[i].radius <= 0) {
				resolveCollision(this, particles[i]);
			}
		}
		
		if(this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) {
			this.velocity.x = -this.velocity.x;
		}
		if(this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) {
			this.velocity.y = -this.velocity.y;
        }
        
        
		
		if((distance(mouse.x, mouse.y, this.x, this.y) < canvas.width / 6 || this.colored) && this.opacity < 0.8) {
			this.opacity += 0.02;
		}else if(this.opacity > 0 && !this.colored) {
			this.opacity -= 0.02;
			this.opacity = Math.max(0, this.opacity);
		}
		
		// if(this.mass != 1 && this.opacity <= 0.7) {
		// 	this.opacity = 0.7;
		// }
		
		this.x += this.velocity.x;
		this.y += this.velocity.y;
	}
		
	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);	
		c.save();
		c.globalAlpha = this.opacity;
		c.fillStyle = this.color;
		c.fill();
		c.restore();
		c.globalAlpha = 1;
		c.strokeStyle = this.color;
		c.stroke();
	}
	
}

let particles;
let counterForCrash;

function init() {
    particles = [];
    counterForCrash = 0;
    numOfBalls = 25;
	for(let i = 0; i < numOfBalls; i++) {
        const radius = Math.floor(canvas.height / 35);
		let x = randomIntFromRange(radius, canvas.width - radius);
		let y = randomIntFromRange(radius, canvas.height - radius);
		let mass = 1;
		
		if(i % 5 == 0) {
			mass = 5;
		}
		
		if(i !== 0) {
			for(let j = 0; j < particles.length; j++) {
				if(distance(x, y, particles[j].x, particles[j].y ) - radius - particles[j].radius <= 0) {
					x = randomIntFromRange(radius, innerWidth - radius);
					y = randomIntFromRange(radius, innerHeight - radius);
                    j = -1;
                    counterForCrash++;
                }
                if(counterForCrash > 100) {
                    break;
                }
			}
		}
		
        if(counterForCrash > 100) {
            break;
        }else {
            counterForCrash = 0;
        }

		particles.push(new Particle(x, y, radius, mass));
    }
    
    mouse.x = canvas.width / 2;
    mouse.y = canvas.height / 2;
}

function animate() {
    c.fillStyle = "#02231c";
	c.fillRect(0, 0, innerWidth, innerHeight);
	
	for(let i = 0; i < particles.length; i++) {
        particles[i].update(particles);
	}
	
    requestAnimationFrame(animate);
}

init();
animate();