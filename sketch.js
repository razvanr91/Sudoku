let sudokuBoard = [
					0, 0, 0, 0, 0, 0, 0, 0, 0,
					0, 0, 0, 0, 0, 0, 0, 0, 0,
					0, 0, 0, 0, 0, 0, 0, 0, 0,
					0, 0, 0, 0, 0, 0, 0, 0, 0,
					0, 0, 0, 0, 0, 0, 0, 0, 0,
					0, 0, 0, 0, 0, 0, 0, 0, 0,
					0, 0, 0, 0, 0, 0, 0, 0, 0,
					0, 0, 0, 0, 0, 0, 0, 0, 0,
					0, 0, 0, 0, 0, 0, 0, 0, 0];

let cells = new Array(81);

function setup() {
	createCanvas(600, 600);
	background("rgb(224, 224, 224)");
	let x = 30;
	let y = 10;
	let s = 50;
	
	stroke(255);
	strokeWeight(5)
	line(x,y, x+450,y);
	line(x,y, x, y+450);
	line(x,y+450,x+450, y+450);
	line(x+450, y+450, x+450, y);
	stroke(0);
	line(x + 150, y, x + 150, y + 450);

	strokeWeight(1);



	for(let i = 0; i < 81; i++) {
		strokeWeight(1)
		sudokuBoard[i] = i+1;
		let cell = new Cell(x,y,s, sudokuBoard[i]);
		cells[i] = cell;
		x = x + 50;
		if(x === 480) {
			x = 30;
			y += 50;
		}
	}
}

function Cell(x, y, s, value) {
	this.x = x;
	this.y = y;
	this.s = s;
	this.value = value;

	this.show = function () {
		fill("rgb(124, 176, 255)");
		stroke(255);
		square(x, y, s);
		textSize(32);
		text(value,x+19, y+35);
	};
}


function draw() {
	for(let i = 0; i < 81; i++) {
		cells[i].show();
	}
}