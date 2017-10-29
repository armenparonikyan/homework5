const rand = function(num) {
	return Math.floor(Math.random() * num) + 1;
};

const createBadGuys =  function(tiv, width , height){
	const result = [];
	const loop = function(num) {
	  	if(num === 0) {
	    	return;
	    }
	    result.push({
		 	x:rand(width-30),
			y:rand(height-100),
			width:30,
			height:30,
			xDelta:1,
			yDelta:1
	    });
	    loop(num-1);
  };
  loop(tiv);

  return result;
};


const forEach = function(arr, func) {
	const helper = function(index) {
		if(index === arr.length){
			return;
		}
		func(arr[index], index);
		helper(index+1);
	};
	helper(0);
};


const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

const gameData = {
	hero: {
		height: 50,
		width: 50,
		xDelta:5,
		yDelta:5,
		x:0,
		y: canvas.height-50,
		isRight:true
	},
	badGuys: createBadGuys(7, canvas.width, canvas.height)
};
const points = gameData.badGuys;

const background = new Image();
background.src = "http://www.graphic-buffet.com/wp-content/uploads/2012/04/cloud-example.jpg";

const enemy = new Image();
enemy.src = "http://netclones.com/icon/pacman.png";

const heroRight = new Image();
heroRight.src = "./img/hero_right.png";

const heroLeft = new Image();
heroLeft.src = "./img/hero_left.png";

const hero = gameData.hero;

const draw = function(){
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	forEach(points, function(point){
		ctx.drawImage(enemy, point.x, point.y, point.width, point.height);
  	});
	if (hero.isRight) {
		ctx.drawImage(heroRight, hero.x, hero.y, hero.width, hero.height);
	}else {
		ctx.drawImage(heroLeft, hero.x, hero.y, hero.width, hero.height);
	}

};


const update = function(){
	forEach(points, function(point){
		point.x += point.xDelta;
		point.y += point.yDelta;

		if(point.y <= 0 || point.y + point.height > canvas.height) {
			point.yDelta *= -1;
		}
		if(point.x <= 0 || point.x + point.width > canvas.width) {
			point.xDelta *= -1;
		}

		if (point.xDelta > 0) {
			if(point.y + point.height > hero.y && point.y < hero.y + hero.height && point.x + point.width > hero.x && point.x < hero.x+hero.width) {
				alert('Game over');
			}
		} else {
			if(point.y + point.height > hero.y && point.y < hero.y + hero.height && point.x>hero.x && point.x < hero.x+hero.width){
				alert('Game over');
			}
		}
	});
};

const loop = function() {
	draw();
	update();

	requestAnimationFrame(loop);
};


window.addEventListener('keydown', function(e){

	if( hero.y < 0 ){
		hero.y = 0;
	}
	if(hero.y + hero.height > canvas.height){
		hero.y = canvas.height-hero.height;
	}
	if(hero.x < 0){
		hero.x = 0;
	}
	if (hero.x + hero.width > canvas.width) {
		hero.x = canvas.width-hero.width;
	}

	if(e.keyCode === 38) {
		hero.y -= hero.yDelta;
	}
	if(e.keyCode === 37) {
		hero.x -= hero.xDelta;
		hero.isRight = false;
	}
	if(e.keyCode === 39) {
		hero.x += hero.xDelta;
		hero.isRight = true;
	}
	if(e.keyCode === 40) {
		hero.y += hero.yDelta;
	}
});

loop();
