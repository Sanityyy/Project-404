let playerY ;

let jump = false;

let jumpStrenght = -20;
let gravity = 2;
let velocity = 0;

function preload(){

}

function setup() {
		
	createCanvas(windowWidth - 5, windowHeight - 5)
	playerY = height - 100;
}

function draw() {
	background(100)
	ellipse(width/2, playerY, 20, 20)
	if(keyIsDown(32) && jump == false){
		jump = true;
		velocity = jumpStrenght;
		console.log("is pressing space")
	}
	if(jump){
		if(playerY <= height - 100){
			velocity = velocity + gravity;
			playerY = playerY + velocity;
			console.log("is jumping")
		}else{
			jump = false
			playerY = height -100;
		}
	}	
}

function mousePressed(){

}