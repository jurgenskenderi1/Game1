alert("*** INFO *****\n\nComputer:\nPer te levizur perdor shigjetat e tastjeres.\n\nTelefon:\nRreshqit kudo ne ekran per te levizur.\n\nFalminderit! JS")

var b;
var scl = 30;
var score = 0;
var bestScore = 0;
var endScore;
var speedBus = 4.5;
var food, balls;
var rad = 10; 
var xpos = 0;
var ypos = 0; 
var xspeedBall = 0; 
var yspeedBall = 0; 
var xdirection = 1; 
var ydirection = 1;

function setup(){
    var W = window.innerWidth - 150;
    var H = window.innerHeight / 1.6;
    createCanvas(W, H);
    b = new bus();
    bananaLocation();
    ellipseMode(RADIUS);
    xpos = width / 2;
    ypos = height / 2;
    outputs.innerHTML = "Piket: " + score;
    endGame.style.display= "none";
}

function reset(){
    setup();
    score = 0;
    speedBus = 4.5;
    xspeedBall = 0; 
    yspeedBall = 0;
    outputs.innerHTML = "Piket: " + score;
}

function direction(value){
      if(value=="left"){
      b.dir(-speedBus, 0);
      }
      else if(value=="right"){
          b.dir(speedBus, 0);
      }
      else if(value=="down"){
          b.dir(0, speedBus);
      }
      else if(value=="up"){
          b.dir(0, -speedBus);
      }
}

function bananaLocation(){
    var cols = floor(width/scl);
    var rows = floor(height/scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    fill(getRandomColor());
    food.mult(scl);
}

function draw(){
    background(51);
    b.update();
    b.show();
    ball();
    
    if(b.eat(food)){
        bananaLocation();
        speedBus +=0.1;
        xspeedBall ++; 
        yspeedBall ++;
        score++;
        outputs.innerHTML = "Piket: " + score;
    }
    else if( b.dead(balls)){ 
        endGame.style.display = "block";
        gameOverScore.innerHTML = "Piket: " + score + " ♥" ;
        if(bestScore < score){
            bestScore = score;
        }
        bestScores.innerHTML = "Rezultati me i mir: " + bestScore + " ♥" ;
    }
    text("♥", food.x,food.y,scl ,scl);
}

function ball(){
    xpos = xpos + xspeedBall * xdirection;
    ypos = ypos + yspeedBall * ydirection;

    if (xpos > width - rad || xpos < rad) {
        xdirection *= -1;
    }
    if (ypos > height - rad || ypos < rad) {
        ydirection *= -1;
    }
    
  ellipse(xpos, ypos, rad, rad);
  balls = new p5.Vector(xpos, ypos); 
}

function bus(){
    this.x = 10;
    this.y = 10;
    this.xspeed = 0;
    this.yspeed = 0;
    
    this.dead = function(pos){
        var dBall = dist(this.x, this.y, pos.x-rad, pos.y-rad);
        if(dBall < 20 ){
            return true;
        }
        else{
            return false;
        }
    }
    this.eat = function(pos){
        var dFood = dist(this.x, this.y, pos.x, pos.y);
        if(dFood < 20){
            return true;
        }
        else{
            return false;
        }
    }
    this.dir = function(x, y){
        this.xspeed = x;
        this.yspeed = y;
    }
    this.update = function(){
        this.x = this.x + this.xspeed;
        this.y = this.y + this.yspeed;
        this.x = constrain(this.x, 0 , width - 20);
        this.y = constrain(this.y, 0 , height - 20);
    }
    this.show = function(){
        textSize(20);
        text("☠", this.x,this.y,scl,scl);
    }
}

function getRandomColor() {
  var letters = 'A';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}