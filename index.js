document.querySelector("#play").addEventListener("click", function() {
  document.querySelector("#home").style.display = "none";
  document.querySelector("#game").style.display = "block";
  setInterval(draw, 20)
});
cnvs = document.querySelector("#game-canvas")
foo = cnvs.getContext("2d");
player_x = 0;
player_y = 0;
grav = 0;
var stop = false;
var flip = false;
rckbtm = cnvs.height - 36;
function drawImage(img, x, y, width, height, deg, flip, flop, center) {
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
}; function drawRect(width, height, color, x, y) {
    foo.fillStyle = color;
    foo.fillRect(x,y,width,height);
}
function draw() {
	foo.clearRect(0, 0, cnvs.width, cnvs.height)
	foo.imageSmoothingEnabled = false;
	foo.save();
	foo.translate(player_x, player_y);
	drawImage(document.querySelector("#duck"), 70, 0, 98, 98, 0, flip, false, true);
	foo.restore();
	drawRect(100.5, 10.5, "black", 100, 300);
	player_y += grav;
	grav +=  0.04;
	if (player_y > rckbtm) {
		player_y = rckbtm;
		grav=0;
	}
	document.onkeydown=(e)=>{
		e = e || event;
		if (e.key == "w" || e.keyCode=="38" || e.keyCode=="32") {
			grav -= 0.3;
		} else if (e.key == "s" || e.keyCode=="40") {
			player_y+=1;
		} else if (e.key == "d" || e.keyCode=="39") {
			player_x+=2;
			flip=false;
		} else if (e.key=="a" || e.keyCode=="37") {
			player_x-=2;
			flip=true;
		}
	};
}
