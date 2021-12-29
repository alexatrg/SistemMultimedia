let system;
let minParticleTime = 0;
let maxParticleTime = 200;
let balls = [];
let totalBalls;
let x = 500;
let y = 350;
let xspeed = 4;
let yspeed = -3;

function keyPressed() {
  totalBalls = key;
  setup();
}

function setup() {
  createCanvas(x, y);

  for (let i = 0; i < totalBalls; i++) {
  	let b = new Ball(random(0,width), random(0,height), random(-5,5), random(-5,5), random(10,50)); 
    balls.push(b);
  }
}

function draw() {
  background(100);

  for (let i = 0; i < balls.length; i++) {
    
    for (let j = i; j < balls.length; j++) {
    
      if (balls[i] != balls[j] && dist(balls[i].x, balls[i].y, balls[j].x, balls[j].y) < (balls[i].r + balls[j].r)/2) {
        balls[i].bounceX(); 
        balls[i].bounceY();
        balls[j].bounceX();
        balls[j].bounceY();
        balls[j].color = color(random(255), random(255), random(255));
        minParticleTime = 1;
        system = new ParticleSystem(createVector(balls[j].x, balls[j].y));
      }
      
      if (balls[j].x > x || balls[j].y > y || balls[j].x < 0 || balls[j].y < 0) {
        balls[j].color = color(random(255), random(255), random(255));
      }
      
    }

    if (minParticleTime > 0) {
      minParticleTime++;

      if (minParticleTime < maxParticleTime)
      {
        system.addParticle();
        system.run();
      }
    }
    
  	if (mouseIsPressed && balls[i].hover()) 
    {
      balls[i].stop(); 
    } 
    else 
    {
       balls[i].start(); 
    }
    
    balls[i].move();
    balls[i].display();
  } 
}

let Particle = function(position) {
  this.acceleration = createVector(0, 0.05);
  this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.position = position.copy();
  this.lifespan = 255;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 1;
};

Particle.prototype.display = function() {
  stroke(200, this.lifespan);
  strokeWeight(2);
  let a = color(random(255),random(255),random(255));
  let b = color(random(255),random(255),random(255));
  var t = map(mouseX, 0, width, 0, 1.0);
  var c = lerpColor(a, b, t);
  fill(c, this.lifespan);
  ellipse(this.position.x, this.position.y, 12, 12);
};

Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};