var canvas;
var ctx;

var screen_width;
var screen_height;

var column_width;

var max_value = 10;

//var data_a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var data_a = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

var data_b = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


var test = [3, 5, 8, 9, 2, 1, 6, 7, 4, 0];






function swap(i, j, data) {
    var value = data[i];
	data[i] = data[j];
    data[j] = value;
}


function quicksort(data, low, high, all_swaps){
    if (low < high) {
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
            	all_swaps.push([i, j]);
            } 
        }
    }
    if (i + 1 != high){
    	swap(i + 1, high, data);
	    all_swaps.push([i + 1, high]);
	    
    }
    return i + 1;
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

function insertion_sort(data){
    var i = 1;

    while (i < data.length){
        var j = i;
        while (j > 0 && data[j - 1] > data[j]){
            
            swap(j, j-1, data);
            
        }
        i += 1;
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

		// quick sort | data_a
	    if (swap_pos_quick < all_swaps_quick.length) {
	        var swap_info = all_swaps_quick[swap_pos_quick];
	        swap(swap_info[0], swap_info[1], data_a);
	        swap_pos_quick++;
	    }

	    // bubble sort | data_b
	    if (swap_pos_bubb < all_swaps_bubb.length) {
	        var swap_info = all_swaps_bubb[swap_pos_bubb];
	        swap(swap_info[0], swap_info[1], data_b);
	        swap_pos_bubb++;
	    }

	    lastTime = timestamp;
	}

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


	data_a = generate_random_array(10);
	// copies data_a to data_b
	data_b = data_a.slice();

	quicksort(data_a.slice(), 0, data_a.length - 1, all_swaps_quick);
	bubble_sort(data_b.slice(), all_swaps_bubb);

	draw();
});