var canvas;
var ctx;

var screen_width;
var screen_height;

var column_width;

var max_value = 10;
var data_a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var data_b = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function swap(i, j, data) {
	var value = data[i];
	data[i] = data[j];
	data[j] = value;
}

function draw_data(data, offset, colour) {
	
	// rectangle colour
	ctx.fillStyle = colour;
	// border colour
	ctx.strokeStyle = "black";
	// border thickness 
	ctx.lineWidth = 5;

	ctx.beginPath();

	for (var i = 0; i < data.length; i++)
	{	
		// draw nothing if 0
		if (data[i] == 0) continue;
		
		// draw a column based on data[i]
		var x_pos = i * column_width

		// var bottom_left_y = screen_height;
		// e.g. data[3] = 5 * (600 / 10)
		// bar 4 = 300 tall
		var column_height = data[i] * screen_height / max_value;

		// offset = how far away other bar chart should be
		// (x, y, width, height)
		ctx.fillRect(
			offset + x_pos + 5,
			screen_height - column_height,
			column_width - 10,
			column_height
		);
		
		// (x, y, width, height)
		ctx.rect(
			offset + x_pos + 5,
			screen_height - column_height,
			column_width - 10,
			column_height + 10
		);
	}

	ctx.stroke();
	ctx.closePath();
}

function draw()
{
	ctx.clearRect(0, 0, screen_width, screen_height);

	draw_data(data_a, 0, "red");
	draw_data(data_b, screen_width / 2, "blue");

	requestAnimationFrame(draw);
}


// when the window loads
window.addEventListener('load', function()
{
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");

	screen_width = canvas.width;
	screen_height = canvas.height;

	column_width = screen_width / data_a.length / 2;

	draw();
});
