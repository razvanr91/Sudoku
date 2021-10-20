function setup() {
	createCanvas(500, 500);
	background("rgb(224, 224, 224)");
}

function Cell(x, y, s) {
	this.x = x;
	this.y = y;
	this.s = s;

	this.show = function () {
		fill("rgb(124, 176, 255)");
		stroke(255);
		square(x, y, s);
	};
}

function draw() {
	let cell = new Cell(5, 5, 50);
	cell.show();
}
