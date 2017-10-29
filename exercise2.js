const rand = function(num) {
	return Math.floor(Math.random() * num) + 1;
};

const createPoints =  function(tiv, width , height){
	const result = [];
	const colorArray = ['red', 'blue', 'orange'];
	const loop = function(num) {
	  	if(num === 0) {
	    	return;
	    }
	    result.push({
		 	x:rand(width-30),
			y:rand(height-30),
			width:30,
			height:30,
			xDelta:1,
			yDelta:1,
			color: colorArray[rand(3)-1]
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
canvas.width = 500;
canvas.height = 500;

const points = createPoints(7, canvas.width, canvas.height);

const draw = function(){
	ctx.fillStyle = 'black';
	ctx.fillRect(0,0,canvas.width,canvas.height);

	forEach(points, function(point){
		ctx.fillStyle = point.color;
		ctx.fillRect(point.x, point.y, point.width, point.height);
  	});
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
	});
};

const loop = function() {
	draw();
	update();

	requestAnimationFrame(loop);
};

loop();
