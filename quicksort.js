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


function quicksort(data, low, high, all_swaps){
    if (low < high) {
    	// store the partition
        var part = partition(data, low, high, all_swaps);

        quicksort(data, low, part - 1, all_swaps);
        quicksort(data, part + 1, high, all_swaps);
    }
}

function partition(data, low, high, all_swaps) {
    var pivot = data[high];

    var i = low - 1;

    for (var j = low; j <= high - 1; j++) {
        if (data[j] <= pivot) {
            i++;
            if (i != j) {
            	swap(i, j, data);
            	// store swapped items
            	all_swaps.push([i, j]);
            } 
        }
    }
    if (i + 1 != high){
    	swap(i + 1, high, data);
    	// store swapped items
	    all_swaps.push([i + 1, high]);
	    
    }
    return i + 1;
}

function generate_random_array(size) {
	var rand_arr = [];
	
	for (var i = 0; i < size; i++){
		// return randoms number between 1 and 10
		rand_arr.push(Math.floor(Math.random() * max_value + 1));
	}

	return rand_arr;
}

  //console.log(mergeSort(data_a))

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

// keep track of quick sort swaps
var all_swaps_quick = [];
var swap_pos_quick = 0;

var lastTime = null;
function draw(timestamp)
{
	if (lastTime == null) {
    	lastTime = timestamp;
	}

	// check if second has passed
	if (timestamp - lastTime > 1000) {

		// quick sort | data_a
	    if (swap_pos_quick < all_swaps_quick.length) {
	        var swap_info = all_swaps_quick[swap_pos_quick];
	        swap(swap_info[0], swap_info[1], data_a);
			swap_pos_quick++;
			//console.log("quick sort test");
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
	
	quicksort(data_a.slice(), 0, data_a.length - 1, all_swaps_quick);


	
	draw();
});