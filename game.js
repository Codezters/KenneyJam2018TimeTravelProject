//game.js
try {
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, "");
const imageLoad = ["star1.png", "star2.png", "star3.png", "forward.png", "glassPanel.png", "metalPanel.png", "null_terminator.png", "gnshfont.png"];
var globals = {
	stars: []
};

var Star = class {
	constructor(direction, start) {
		this.sprite = game.add.sprite(getRandomInt(0, window.innerWidth), getRandomInt(0, window.innerHeight),["star1", "star2", "star3"][getRandomInt(0,3)]);
		this.dir = direction;
		this.start = start;
		this.speed = getRandomInt(10,40)/10;
		this.alpha = getRandomInt(0,101);
		this.dalpha = (-0.5/3)*this.speed;
		this.sprite.scale.setTo(0.25*this.speed, 0.25*this.speed)
	}
	update() {
		if (this.sprite.x <= -20) this.respawn();
		this.sprite.x += this.dir*this.speed;
		if (this.alpha >= 33*this.speed) this.dalpha = (-0.5/3)*this.speed;
		else if (this.alpha <= 1) this.dalpha = (0.5/3)*this.speed;
		if (this.alpha > 100) this.alpha = 99, this.dalpha = (-0.5/3)*this.speed;
		this.alpha+=this.dalpha;
		this.sprite.alpha = this.alpha/100;
	}
	respawn() {
		this.sprite.y = getRandomInt(0,window.innerHeight);
		this.sprite.x = this.start+20;
	}
}

var menuState = {
	preload: function() {
		//load all png files
		for (let i in imageLoad) {
			game.load.image(imageLoad[i].replace(".png", ""), "./assets/"+imageLoad[i]);
		}
	},
	
	create: function() {
		try {
			game.stage.backgroundColor = "#000";
			
			//create stars
			for (let i = 0;i<80;i++) {
				globals.stars.push(new Star(-1, window.innerWidth));
			}
			
			//create play button
			globals.playB = game.add.button(window.innerWidth/2-50, window.innerHeight/2+50, "metalPanel", ()=>{game.state.start("intro")}, this);
			globals.playB.onInputOver.add(playOver, this);
			globals.playB.onInputOut.add(playOut, this);
			
			globals.playForward = game.add.sprite(window.innerWidth/2-25, window.innerHeight/2+75, "forward");
			
			//create title
			globals.font = game.add.retroFont("gnshfont", 5,12, Phaser.RetroFont.TEXT_SET2, 20,0,0);
			globals.title = game.add.image(window.innerWidth/2, window.innerHeight/2-50, globals.font);
			globals.font.text = "Game Name";
			globals.title.anchor.set(0.5, 1);
			globals.title.scale.setTo(6, 6);
		}catch(e){console.log(e)}
	},
	
	update: function () {
		try {
			//update all the stars every frame
			for (let i in globals.stars) {
				globals.stars[i].update();
			}
		}catch(e){console.log(e)}
	}
};

game.state.add("Menu", menuState);
game.state.start("Menu");

//Totally stolen from the MDN docs :D
window.getRandomInt = function (min, max) {
	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

var playOver = function(){
	//update play button with glass panel on top?
	globals.playGlass = globals.playGlass || game.add.sprite(window.innerWidth/2-50, window.innerHeight/2+50, "glassPanel");
	globals.playGlass.alpha = 0.75;
};

var playOut = function() {
	if (typeof globals.playGlass !== "undefined") {
		globals.playGlass.alpha = 0;
	}
};

}catch(e){console.log(e)}