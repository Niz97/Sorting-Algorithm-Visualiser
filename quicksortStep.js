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


var expectedOutput = [1,2,3,4,5];

function quicksort_test(data, output) {
	
	var testData = data;
	var swapHolder = [];
	
	// sort the data
	quicksort(testData, 0, testData.length - 1, swapHolder);

	// compare each element
	for (var i = 0; i < testData.length; i++) {

		if (testData[i] != expectedOutput[i]) {return false};

	}

	// if the test above passes return true
	return true;

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


function draw_data(data, offset, colour) {
	

	// assume no swaps are taking place
	var swap_info = [-1, -1];
	if (swap_pos_quick < all_swaps_quick.length) {

		// if not at the end of the swaps array
		// set it to the next swap position
		swap_info = all_swaps_quick[swap_pos_quick];
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
var all_swaps_quick = [];
var swap_pos_quick = 0;

function stepForwards() {
    // quick sort | data_a
    if (swap_pos_quick < all_swaps_quick.length) {
        var swap_info = all_swaps_quick[swap_pos_quick];
        swap(swap_info[0], swap_info[1], data_a);

        // output what bars are currently being swapped
        document.getElementById("quickOutput").innerHTML="Swapping " + swap_info[0] + " and " + swap_info[1];
        swap_pos_quick++;

        // output number of swaps
        document.getElementById("swapLength").innerHTML="Number of swaps: " + swap_pos_quick;

    }
}

function draw()
{

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
