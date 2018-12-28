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
var rckbtm = cnvs.height - 36;var map=[];var ai_grav=0;
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
} function coc(o1, o2) {
	var crash;		
	if (o1.y<=o2.y+o2.height/2&&o1.y+o1.height/2>=o2.y+o2.height*3&&o1.x<=o2.x+o2.width&&o1.x+o1.width/2>=o2.x+o1.width/2) {crash=true;} else {crash=false;};
	return crash;
} function grav(h) {
	setInter
}
function draw() {
	foo.clearRect(0, 0, cnvs.width, cnvs.height)
	foo.imageSmoothingEnabled = false;
	player = new sprite(document.querySelector("#duck"), player_x, player_y, 98, 98, 0, flip, false, true);
	ai = new sprite(document.querySelector("#duck"), ai_x, ai_y, 98, 98, 0, true, false, true);
	platforms = [new rect(100, 5, "black", 100, 300), new rect(100, 5, "black", 400, 300), new rect(400, 5, "black", 100, 450)];
	ai_y+=ai_grav;
	ai_grav+=0.004;
	player_y += grav;
	grav +=  0.004;
	if (ai_y > rckbtm) {
		ai_y = rckbtm;
		ai_grav=0;
	}
	if (player_y > rckbtm) {
		player_y = rckbtm;
		grav=0;
	} else if (coc(player, platforms[0])==true || coc(player, platforms[1]) == true|| coc(player, platforms[2])==true|| coc(player, ai)==true) {
		grav=0;
	}
	document.onkeydown=(e)=>{
		e = e || event;
		map[e.key] = e.type = true;
		if (map["w"]&&map["a"]||map["ArrowUp"]&&map["ArrowLeft"]) {
			player_x-=2;flip=true;grav-=0.1;player_y-=1;
		} else if (map["w"]&&map["d"]||map["ArrowUp"]&&map["ArrowRight"]) {
			player_x+=2;flip=false;grav-=0.1;player_y-=1;
		} else if (map["s"]&&map["d"]||map["ArrowDown"]&&map["ArrowRight"]) {
			player_y+=1;player_x+=2;flip=false;
		} else if (map["s"]&&map["a"]||map["ArrowDown"]&&map["ArrowLeft"]) {
			player_y+=1;player_x-=2;flip=true;
		} else if (map["w"]||map["ArrowUp"]) {
			grav -= 0.1;player_y-=1;
		} else if (map["s"]||map["ArrowDown"]) {
			player_y+=1;
		} else if (map["d"]||map["ArrowRight"]) {
			player_x+=2;flip=false;
		} else if (map["a"]||map["ArrowLeft"]) {
			player_x-=2;flip=true;
		}
	}; document.onkeyup=(e)=>{map=[];};
}
