function init() {
	canvas = document.getElementById("mycanvas");
	W = H = canvas.width = canvas.height = 1000;
	pen = canvas.getContext('2d');
	cs = 67;
	game_over = false;

	food = getRandomFood();

	score = 5;

	// create an imageobject for food
	foodImg = new Image();
	foodImg.src = "Assets/apple.png";

	trophy = new Image();
	trophy.src = "Assets/trophy.png";

	snake = {
		init_len: 5,
		color: "blue",
		cells: [],
		direction: "right",

		createSnake: function () {
			for (var i = this.init_len; i > 0; i--) {
				this.cells.push({ x: i, y: 0 });
			}
		},

		drawSnake: function () {
			for (var i = 0; i < this.cells.length; i++) {
				pen.fillStyle = this.color;
				pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs - 2, cs - 2);

			}
		},

		updateSnake: function () {
			// console.log("updateSnake according to the direction property");
			// check if snake eaten has food 

			var headX = this.cells[0].x;
			var headY = this.cells[0].y;

			if (headX == food.x && headY == food.y) {
				// console.log("food eaten");
				food = getRandomFood();
				score++;
			}
			else {
				this.cells.pop();
			}

			var nextX, nextY;

			if (this.direction == "right") {
				nextX = headX + 1;
				nextY = headY;
			}
			else if (this.direction == "left") {
				nextX = headX - 1;
				nextY = headY;
			}
			else if (this.direction == "up") {
				nextX = headX;
				nextY = headY - 1;
			}
			else {
				nextX = headX;
				nextY = headY + 1;
			}

			this.cells.unshift({ x: nextX, y: nextY });

			//  logic that prevents snake fron going out
			var last_x = Math.round(W / cs);
			var last_y = Math.round(H / cs);

			if (this.cells[0].x < 0 || this.cells[0].y < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y) {
				game_over = true;

			}

		}
	};

	snake.createSnake();

	// Add a event listner on the document object
	function keyPressed(e) {
		//  conditional statements
		if (e.key == "ArrowRight") {
			snake.direction = "right";
		}
		else if (e.key == "ArrowLeft") {
			snake.direction = "left";
		}
		else if (e.key == "ArrowDown") {
			snake.direction = "down";
		}
		else if (e.key == "ArrowUp") {
			snake.direction = "up";
		}

		console.log(snake.direction);
	}

	document.addEventListener("keydown", keyPressed);


}

function draw() {
	// console.log("In draw");

	// erase the old frame
	pen.clearRect(0, 0, W, H);
	snake.drawSnake();
	pen.fillStyle = food.color;

	pen.drawImage(foodImg, food.x * cs, food.y * cs, cs, cs);

	pen.drawImage(trophy, 20, 20, cs, cs);

	pen.fillStyle = "blue";
	pen.font = "bold 20px Roboto";
	pen.fillText(score, 50, 50);

}

function update() {
	// console.log("In update");
	snake.updateSnake();

}

function getRandomFood() {
	var foodX = Math.round(Math.random() * (W - cs) / cs);
	var foodY = Math.round(Math.random() * (H - cs) / cs);

	var food = {
		x: foodX,
		y: foodY,
		color: "red"
	}
	return food;
}

function gameloop() {

	if (game_over) {
		clearInterval(f);
		alert("GAMEOVER");
	}
	draw();
	update();

}

init();

var f = setInterval(gameloop, 100);