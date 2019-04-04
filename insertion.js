var canvas;
var ctx;

var screen_width;
var screen_height;

var column_width;

var max_value = 20;


var data_a;

function swap(i, j, data) {
    var value = data[i];
	data[i] = data[j];
    data[j] = value;
}

function log_with_index(data) {
	var str = "";
	for (var i = 0; i < data.length; i++) {
		if (i != 0) str += ", ";
		str += "#" + i + "=" + data[i];
	}
	console.log("{", str, "}")
}

function selection_sort(data, all_swaps)
{
	for (var i = 0; i < data.length - 1; i++)
	{
		log_with_index(data);
		console.log("trying to find the smallest value from", i, "onwards")
		console.log("gonna assume it's at #" + i + "=" + data[i]);
		// find the lowest value to go in position 'i'
		var min_pos = i;
		for (var j = i + 1; j < data.length; j++)
		{
			if (data[j] < data[min_pos])
			{
				console.log("wait, no, it's at #" + j + "=" + data[j]);
				// new smallest so far
				min_pos = j;
			}
		}
		// min_pos now holds position of smallest value in the list (from i)
		console.log("okay, it's definitely that")

		// if i was already the smallest, no further action needed
		if (min_pos != i)
		{
			console.log("gonna swap pos #" + i + "=" + data[i] + " with pos #" + min_pos + "=" + data[min_pos])
			// move the data at min_pos to i
			swap(i, min_pos, data);
			all_swaps.push([i, min_pos]);
		} else {
			console.log("well it's already in the right place so cool")
		}
	}
	log_with_index(data);
}


function ins(data) {

	for (var i = 0; i < data.length; i++) {

		// assume i is smallest value
		var min_pos = i;
		console.log("min_pos: " + min_pos);

		// next element along
		for (var j = i + 1; j < data.length; j++) {
			
			// if the next element along is less than min_pos
			// new lowest value for min_pos found
			if (data[j] < min_pos) {
				min_pos = j;
				console.log("New smallest min_pos: " + min_pos);
			}
		}
		if (min_pos != i) {
			swap(min_pos, i, data);
		}
	}
}

function generate_random_array(size) {
	var rand_arr = [];
	
	for (var i = 0; i < size; i++){
		// return randoms number between 1 and 10
		rand_arr.push(Math.floor(Math.random() * max_value + 1));
	}

	return rand_arr;
}


function draw_data(data, offset, colour) {
	

	// assume no swaps are taking place
	var swap_info = [-1, -1];
	if (swap_pos_insert < all_swaps_insert.length) {

		// if not at the end of the swaps array
		// set it to the next swap position
		swap_info = all_swaps_insert[swap_pos_insert];
	}

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

		// is the current position (i) a swap position?
		// if so turn the bar green.
		// if not stays red
		if (i == swap_info[0] || i == swap_info[1]) {
			ctx.fillStyle = "green";
		} else {
			ctx.fillStyle = "red";
		}

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

// keep track of quick sort swaps
var all_swaps_insert = [];
var swap_pos_insert = 0;

var lastTime = null;
function draw(timestamp)
{
	if (lastTime == null) {
    	lastTime = timestamp;
	}

	// check if second has passed
	if (timestamp - lastTime > 2000) {

		// inserion sort | data_c
		if (swap_pos_insert < all_swaps_insert.length) {
			var swap_info = all_swaps_insert[swap_pos_insert];
			document.getElementById("insertionOutput").innerHTML= "Swapping " + swap_info[0] + " and " + swap_info[1];
	        swap(swap_info[0], swap_info[1], data_a);
			swap_pos_insert++;

	    }

	    lastTime = timestamp;
	}

	ctx.clearRect(0, 0, screen_width, screen_height);


	draw_data(data_a, 0, "red");
	
	requestAnimationFrame(draw);
}


// when the window loads
window.addEventListener('load', function()
{
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");

	screen_width = canvas.width;
	screen_height = canvas.height;

	column_width = screen_width / max_value;


	data_a = generate_random_array(max_value);
	
	insertion_sort(data_a.slice(), all_swaps_insert);
	
	draw();
});