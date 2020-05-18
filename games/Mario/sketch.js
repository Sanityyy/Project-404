let playerX; //= windowWidth/2; needs to be defined later in code
let playerY; // = height - 300; needs to be defined later in code
const playerW = 50;
const playerH = 110;
const playerSpeed = 17;
const fallSpeed = 3;

let globalX;
let globalY;
const globalW = 75;
const globalH = 75;

let silverX;
let silverY;
const silverW = 75;
const silverH = 75;

let score = 0;
let health = 3;

let jump = false;

let jumpStrenght = -30;
let gravity = 1;
let velocity = 0;

let bombX = [];
let bombY = [];
let bombAmount = 3;




//let globalY = 50
//let silverX

function preload() {
	backgroundmirage = loadImage("./Pictures/pixel-background.PNG");
	player = loadImage("./Pictures/mario.PNG");
	//playergif = createImg("./Pictures/marioGIF.GIF");
	global = loadImage("./Pictures/coin.PNG");
	silver = loadImage("./Pictures/bomb.PNG");
	fullhealth = loadImage("./Pictures/3 hearts.PNG")
	mediumhealth = loadImage("./Pictures/2 hearts.PNG")
	lowhealth = loadImage("./Pictures/1 hearts.PNG")
	nohealth = loadImage("./Pictures/0 hearts.PNG")

	music = loadSound("./Sound/song.mp3")
}

function setup() {
	createCanvas(windowWidth - 5, windowHeight - 5);
	playerX = windowWidth / 2;
	playerY = windowHeight - 290
	globalX = globalX = random(0, windowWidth - globalW)
	globalY = 1;
	silverX = silverX = random(0, windowWidth - silverW);
	silverY = 1;
	//music.play()

	for (let i = 0; i < bombAmount; i++) {
		bombX[i] = random(width - silverW);
		bombY[i] = -random(height - silverH);
	}

}

function draw() {

	if (health == 0) {
		image(nohealth, 160, -12, 120, 120)
		textAlign(CENTER, CENTER)
		textSize(80)
		fill(255, 0, 0)
		stroke(0)
		strokeWeight(5)
		//rect((width/2) - 100, (height/2) - 50, (width/2) + 100, (height/2) + 50)
		text("YOU DIED!", width / 2, height / 2)
		if (keyIsDown(32)) {
			health = 3
			score = 0
			globalY = 4
			globalX = random(0, windowWidth - globalW)
			silverY = 4
			silverX = random(0, windowWidth - silverW)
			text("Score: " + score, 40, 50)

		}
	} else {
		strokeWeight(0)
		fill(0)
		textAlign(LEFT, BASELINE)
		if ((keyIsDown(65) || keyIsDown(LEFT_ARROW)) && playerX > 0) {
			playerX = playerX - playerSpeed
		}
		if ((keyIsDown(68) || keyIsDown(RIGHT_ARROW)) && playerX < width - playerW) {
			playerX = playerX + playerSpeed
		}

		background(255);
		//image(backgroundmirage, 0, 0, width, height);
		background(100)
		image(player, playerX, playerY, playerW, playerH);
		fill(255)
		//rect(playerX, playerY, playerW, playerH);
		image(global, globalX, globalY, globalW, globalH);
		//rect(globalX, globalY, globalW, globalH);
		image(silver, silverX, silverY, silverW, silverH);
		fill(0)
		//rect(silverX, silverY, silverW, silverH);
		textSize(25)
		fill(0)
		line(0, 59, 59, 300)
		for (var i = 0; i <= bombAmount; i++) {
			image(silver, bombX[i], bombY[i], silverW, silverH);
			bombY[i] = bombY[i] + fallSpeed;

			if (bombY[i] > height) {
				bombX[i] = random(width - silverW);
				bombY[i] = -random(height - silverH);
			}

			if (playerX + playerW > bombX[i] && playerX < bombX[i] + silverW && playerY + playerH > bombY[i] && playerY < bombY[i] + silverH) {
				bombX[i] = random(width - silverW);
				bombY[i] = -random(height - silverH);
				//if (score >= 10) {
				//	score = score - 10

			//	} else {
					health = health - 1
					score = score - 10
			//	}


				console.log("-score! :(")
			}
		}


		if (keyIsDown(32) && jump == false) {
			jump = true;
			velocity = jumpStrenght;
		}
		if (jump) {
			if (playerY <= height - 290) {
				velocity = velocity + gravity;
				playerY = playerY + velocity;
			} else {
				jump = false
				playerY = height - 290;
			}
		}

		if (health == 3) {
			image(fullhealth, 160, -12, 120, 120)
		}
		if (health == 2) {
			image(mediumhealth, 160, -12, 120, 120)
		}
		if (health == 2) {
			image(mediumhealth, 160, -12, 120, 120)
		}
		if (health == 1) {
			image(lowhealth, 160, -12, 120, 120)
		}

		globalY = globalY + fallSpeed

		if (globalY > windowHeight + 4) {
			globalX = random(0, windowWidth - globalW)
		}
		if (globalY > windowHeight + 5) {
			globalY = 4
		}

		if (playerX + playerW > globalX && playerX < globalX + globalW && playerY + playerH > globalY && playerY < globalY + globalH) {
			globalY = 4
			globalX = random(0, windowWidth - globalW)
			score = score + 3
			console.log("score!")
		}
		if (silverY > windowHeight + 4) {
			silverX = random(0, windowWidth - silverW)
		}
		if (silverY > windowHeight + 5) {
			silverY = 4
		}



		silverY = silverY + fallSpeed
		if (playerX + playerW > silverX && playerX < silverX + silverW && playerY + playerH > silverY && playerY < silverY + silverH) {
			silverY = 4
			silverX = random(0, windowWidth - silverW)
			if (score >= 10) {
				score = score - 10

			} else {
				health = health - 1
				score = score - score
			}


			console.log("-score! :(")
		}
		if (score < 0) {
			score = 0
		}
		text("Score: " + score, 40, 50)
	}
}