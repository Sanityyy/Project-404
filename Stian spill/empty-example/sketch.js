var R = 0
var G = 0
var B = 0
var X = 51


function setup() {
	createCanvas(720, 720);}

function draw() {
fill(0, 0, 255)
    if(mouseX > 200 && mouseX < 350 && mouseY > 200 && mouseY < 265){
        fill(221,160,221)

    }
background(R, G, B)
rect(200, 200, 150, 65, 10)
fill(0, 0, 255)

if(mouseX > 200 && mouseX < 350 && mouseY > 400 && mouseY < 465){
	fill(221,160,221)}
rect(200, 400, 150, 65, 10)
fill(0, 0, 255)

if(mouseX > 200 && mouseX < 350 && mouseY > 600 && mouseY < 665){
	fill(221,160,221)}
rect(200, 600, 150, 65, 10)


//Text
fill(255)
textSize(20)
text("Red", 215, 240,)
text("Green", 215, 440,)
text("Blue", 215, 640,)
}

function mousePressed() {
if(mouseX > 200 && mouseX < 350 && mouseY > 200 && mouseY < 265){
	R = R + X}
if(mouseX > 200 && mouseX < 350 && mouseY > 400 && mouseY < 465){
	G = G + X	}
if(mouseX > 200 && mouseX < 350 && mouseY > 600 && mouseY < 665){
	B = B + X}
    }
