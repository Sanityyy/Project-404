let r = 0
let g = 190
let b = 190
let click = 0
let cookieX
let cookieY
let cookieX2
let cookieY2
let amountperclick = 1
let amountpersec = 1
let frame60 = 0
let costupgradeclick = 10
let costupgradepersec = 50
let framepowerup = 0
let costpowerup = 200
let trueorfalse = 0
let powerup = 1
let multiplier = 1
let menuactive = 0
let rShop, gShop, bShop;


//let clicktext = (""You have clicked", click, "times"")
function preload(){
	cookie = loadImage("./Pictures/cookie.PNG")
	bakery = loadImage("./Pictures/bakery.PNG")
	shop = loadImage("./Pictures/shop.PNG")
	frameRate(60)
	


	
}

function setup() {
	createCanvas(windowWidth - 4, windowHeight - 4);
	cookieX = (width/2)-45;
	cookieY = (height/2)-45;
	cookieX2 = (width/2)+45;
	cookieY2 = (height/2)+45;
	rShop = createSlider(0, 255, 0)
	gShop = createSlider(0, 255, 190)
	bShop = createSlider(0, 255, 190)
	rShop.position(100, 110)
	gShop.position(100, 135)
	bShop.position(100, 160)

}

function draw() {
        
    var r = rShop.value();
    var g = gShop.value();
    var b = bShop.value();

	frameRate(60)

	background(bakery)
	image(cookie, cookieX, cookieY, 90, 90)	
	fill(255, 0, 0)
	
	textSize(40)
	//textAlign(LEFT)
	text("You have " + click + " cookies", 50, 50)
	cookieX2 = cookieX + 90
	cookieY2 = cookieY + 90
	//Shop
	fill(r, g, b)
	rect(width - 300, 0, 300, height)
	image(shop, width - 300, 0, 300, height)
	fill(0, 255, 255)
	if( mouseX > width - 270 && mouseX < width - 270 + 250 && mouseY > 50 && mouseY < 50 + 80){
		fill(0, 200, 200)
	}
	rect(width - 270, 50, 250, 80)
	fill(0, 255, 255)
	if( mouseX > width - 270 && mouseX < width - 270 + 250 && mouseY > 200 && mouseY < 200 + 80){
		fill(0, 200, 200)
	}
	rect(width - 270, 200, 250, 80)
	fill(0, 255, 255)
	if( mouseX > width - 270 && mouseX < width - 270 + 250 && mouseY > 350 && mouseY < 350 + 80){
		fill(0, 200, 200)
	}
	rect(width - 270, 350, 250, 75)
	//amount per buy
	fill(0, 255, 255)
	if(multiplier === 1){
		fill(0, 100, 100)
	}
	rect(width - 270, height - 50, 30, 30)
	fill(0, 255, 255)
	if(multiplier === 2){
		fill(0, 100, 100)
	}
	rect(width - 220, height - 50, 30, 30)
	fill(0, 255, 255)
	if(multiplier === 5){
		fill(0, 100, 100)
	}
	rect(width - 170, height - 50, 30, 30)
	fill(0, 255, 255)
	if(multiplier === 50){
		fill(0, 100, 100)
	}
	rect(width - 120, height - 50, 30, 30)
	//textAlign(CENTER, CENTER)
	textSize(25)
	fill(0, 0, 255)
	text("Buy +1 click", width - 260, 77)
	text("Buy " + multiplier + ", Cost: " + costupgradeclick * multiplier, width - 260, 115)
	text("Buy " + multiplier + ", Cost: " + costupgradepersec * multiplier, width - 260 , 265)
	text("Cost: " + costpowerup, width - 260 , 410)
	textSize(20)
	text("Upgrade amount per sec", width - 260, 227)
	text("Powerup: 60 sec with 20x", width - 260, 377)
	fill(0, 0, 255)
	textSize(40)
	text("Shop", width - 260, 35)
	textSize(18)
	text("1x", width - 266, height - 29)
	text("2x", width - 215, height - 29)
	text("5x", width - 165, height - 29)
	text("50x", width - 119, height - 29)
	//Amount per sec
	frame60 = frame60 + 1
	if(frame60 >= 60){
		frame60 = 0
		click = click + amountpersec
	}
	//powerup

	if(trueorfalse >= 1){
		trueorfalse = trueorfalse - 1
	}
fill(0)
//Settings Menu
if(keyIsDown(27)) {
	console.log("escape")
	menuactive = 1	

	rShop.show();
	gShop.show();
	bShop.show();
}else{
	menuactive = 0

	rShop.hide();
	gShop.hide();
	bShop.hide();
}
fill(0)
if(menuactive){
	rect(50, 50, width - 350 - 50, height - 50 - 50)
	fill(255)
	text("Shop background color:", 100, 100)
	
	text("red", 260, 123);
	text("green", 260, 150);
	text("blue", 260, 178);
}



}
function mousePressed() {
	if(trueorfalse > 1 && powerup == 1){
		trueorfalse = trueorfalse - 1
		powerup = powerup * 20
		

	}else{
		powerup = 1
	}
	//Cookie
	if(menuactive){

	}else{
	if( mouseX > cookieX && mouseX < cookieX2 && mouseY > cookieY && mouseY < cookieY2) {
		click = click + (amountperclick * powerup)
		cookieX = random(0, width - 390)
		cookieY = random(0, height - 390)
}}
	//Button1
	if( mouseX > width - 270 && mouseX < width - 270 + 250 && mouseY > 50 && mouseY < 50 + 80 && click >= costupgradeclick * multiplier){
		click = click - costupgradeclick * multiplier
		costupgradeclick = costupgradeclick + 5
		amountperclick = amountperclick + 1 * multiplier
}
	//Button2
	if( mouseX > width - 270 && mouseX < width - 270 + 250 && mouseY > 200 && mouseY < 150 + 100 && click >= costupgradepersec * multiplier){
		click = click - costupgradepersec * multiplier
		costupgradepersec = costupgradepersec + 25
		amountpersec = amountpersec + 1 * multiplier
}
	//Button3
	if( mouseX > width - 270 && mouseX < width - 270 + 250 && mouseY > 350 && mouseY < 350 + 80 && click >= costpowerup){
		click = click - costpowerup * multiplier
		trueorfalse = trueorfalse + 1200 
	}
	
	//multiplier
	if(mouseX > width - 270 && mouseX < width - 270 + 30 && mouseY > height - 50 && mouseY < height - 50 + 30){
		multiplier = 1
	}
	if(mouseX > width - 220 && mouseX < width - 220 + 30 && mouseY > height - 50 && mouseY < height - 50 + 30){
		multiplier = 2
	}
	if(mouseX > width - 170 && mouseX < width - 170 + 30 && mouseY > height - 50 && mouseY < height - 50 + 30){
		multiplier = 5
	}
	if(mouseX > width - 120 && mouseX < width - 120 + 30 && mouseY > height - 50 && mouseY < height - 50 + 30){
		multiplier = 50
	}

	//Settings menu
}