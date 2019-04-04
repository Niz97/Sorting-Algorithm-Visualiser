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

function bubble_sort(data, all_swaps){
    var swapped;
   
    do {
        swapped = false;
        for(var i = 0; i < data.length - 1; i++){
            if(data[i] > data [i + 1]){
                var temp = data[i];
                data[i] = data[i + 1];
                data[i + 1] = temp;

                all_swaps.push([i, i + 1]);
                swapped = true 
            }
        }
    } while (swapped);
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
	if (swap_pos_bubb < all_swaps_bubb.length) {

		// if not at the end of the swaps array
		// set it to the next swap position
		swap_info = all_swaps_bubb[swap_pos_bubb];
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
var all_swaps_bubb = [];
var swap_pos_bubb = 0;

var lastTime = null;
function draw(timestamp)
{
	if (lastTime == null) {
    	lastTime = timestamp;
	}

	// check if second has passed
	if (timestamp - lastTime > 1000) {

		// bubble sort 
	    if (swap_pos_bubb < all_swaps_bubb.length) {
	        var swap_info = all_swaps_bubb[swap_pos_bubb];
	        swap(swap_info[0], swap_info[1], data_a);
	        document.getElementById("bubbleOutput").innerHTML= "Swapping " + swap_info[0] + " and " + swap_info[1];
			swap_pos_bubb++;
			//console.log("bubble sort test");
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
	
	bubble_sort(data_a.slice(), all_swaps_bubb);
	
	draw();
});