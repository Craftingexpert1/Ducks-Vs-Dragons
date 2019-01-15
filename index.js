document.querySelector("#play").addEventListener("click", function() {
  document.querySelector("#home").style.display = "none";
  document.querySelector("#game").style.display = "block";
  setInterval(draw, 2);
});
var cnvs = document.querySelector("#game-canvas")
var foo = cnvs.getContext("2d");
var player_x = 70;
var player_y = 0;
var ai_x = 400;
var ai_y = 0;
var grav = 0;
var stop = false;
var player;
var flip = false;
var platforms = [];
var rckbtm = cnvs.height - 49;var map=[];var ai_grav=0;var player_health=10;var ai_health=10;
function sprite(img, x, y, width, height, deg, flip, flop, center) {
	this.img = img;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.deg = deg;
	this.flip = flip;
	this.flop = flop;
	this.center = center;
	foo.save();
	if(typeof width === "undefined") width = img.width;
	if(typeof height === "undefined") height = img.height;
	if(typeof center === "undefined") center = false;
	if(center) {
		x -= width/2;
		y -= height/2;
	}
	foo.translate(x + width/2, y + height/2);
	var rad = 2 * Math.PI - deg * Math.PI / 180;    
	foo.rotate(rad);
	if(flip) flipScale = -1; else flipScale = 1;
	if(flop) flopScale = -1; else flopScale = 1;
	foo.scale(flipScale, flopScale);    
	foo.drawImage(img, -width/2, -height/2, width, height);
	foo.restore();
}; function rect(width, height, color, x, y) {
	this.color=color;this.width=width;this.height=height;this.x=x;this.y=y;
    foo.fillStyle = color;
    foo.fillRect(x,y,width,height);
} function platcrash(rect1, rect2) {
	var crash;		
	if (rect1.x< rect2.x+rect2.width &&
   rect1.x> rect2.x &&
   rect1.y+rect1.width/2 < rect2.y + rect2.height &&
   rect1.y + rect1.height/2 > rect2.y) {
    crash=true;
} else {crash=false;};
	return crash;
}  function playcrash(rect1, rect2) {
	var crash;
	if(rect1.x<rect2.x+rect1.width/2&&
   rect1.x>rect2.x &&
   rect1.y+rect1.width/2 < rect2.y + rect2.height &&
   rect1.y + rect1.height/2 > rect2.y) {
		crash="right";
	} else if (rect1.x==70) {
		console.log("hey")
	} else {crash=false;}
	return crash;
}
function draw() {
	foo.clearRect(0, 0, cnvs.width, cnvs.height)
	foo.imageSmoothingEnabled = false;
	player = new sprite(document.querySelector("#duck"), player_x, player_y, 81, 81, 0, flip, false, true);
	ai = new sprite(document.querySelector("#duck"), ai_x, ai_y, 81, 81, 0, true, false, true);
	platforms = [new rect(100, 5, "black", 100, 300), new rect(100, 5, "black", 400, 300), new rect(400, 5, "black", 100, 450)];
	ai_y+=ai_grav;
	ai_grav+=0.003;
	player_y += grav;
	grav+=0.003;
	if (ai_y > rckbtm) {
		ai_y = rckbtm;
		ai_grav=0;
	} 
	if (player_y > rckbtm) {
		player_y = rckbtm;
		grav=0;
	} else if (platcrash(player, platforms[0])==true || platcrash(player, platforms[1]) == true|| platcrash(player, platforms[2])==true) {
		grav=0;
	} if (playcrash(player, ai)=="right") {
		ai_x-=25;console.log("aaaahhhd");
	} if (platcrash(ai, platforms[0])==true || platcrash(ai, platforms[1]) == true|| platcrash(ai, platforms[2])==true) {
		ai_grav=0;
	}
	document.onkeydown=(e)=>{
		e = e || event;
		map[e.key.toLowerCase()] = e.type = true;
		if (map["w"]&&map["a"]||map["arrowup"]&&map["arrowleft"]) {
			player_x-=3;flip=true;grav-=0.1;player_y-=1;
		} else if (map["w"]&&map["d"]||map["arrowup"]&&map["arrowright"]) {
			player_x+=3;flip=false;grav-=0.1;player_y-=1;
		} else if (map["s"]&&map["d"]||map["arrowdown"]&&map["arrowright"]) {
			player_y+=1;player_x+=3;flip=false;
		} else if (map["s"]&&map["a"]||map["arrowdown"]&&map["arrowleft"]) {
			player_y+=1;player_x-=3;flip=true;
		} else if (map["w"]||map["arrowup"]) {
			grav -= 0.1;player_y-=1;
		} else if (map["s"]||map["arrowdown"]) {
			player_y+=1;
		} else if (map["d"]||map["arrowright"]) {
			player_x+=3;flip=false;
		} else if (map["a"]||map["arrowleft"]) {
			player_x-=3;flip=true;
		}
	}; document.onkeyup=(e)=>{map=[];};
}
