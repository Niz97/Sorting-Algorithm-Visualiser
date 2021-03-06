var canvas;
var ctx;

var screen_width;
var screen_height;

var column_width;

var max_value = 10;

var data_a;
var data_b;
var data_c;
var data_d;


var test = [3, 5, 8, 9, 2, 1, 6, 7, 4, 0];

function swap(i, j, data) {
    var value = data[i];
	data[i] = data[j];
    data[j] = value;
}

// https://www.geeksforgeeks.org/selection-sort/
function selection_sort(data){

	var arr_len = data.length;

	for (var i = 0; i < arr_len - 1; i++){

		var min_index = i;
		for (var j = i + 1; j < arr_len; j++) {
			if (data[j] < data[min_index])
				min_index = j;
		}

		swap(i, min_index, data);
		
	}
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



// function insertion_sort(array) {
// 	var length = array.length;
	
// 	for(var i = 1, j; i < length; i++) {
// 	  var temp = array[i];
// 	  for(var j = i - 1; j >= 0 && array[j] > temp; j--) {
// 		array[j+1] = array[j];
// 	  }
// 	  array[j+1] = temp;
// 	}
	
// 	return array;
//   }



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

var all_swaps_insert = [];
var swap_pos_insert = 0;

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

	    // bubble sort | data_b
	    if (swap_pos_bubb < all_swaps_bubb.length) {
	        var swap_info = all_swaps_bubb[swap_pos_bubb];
	        swap(swap_info[0], swap_info[1], data_b);
			swap_pos_bubb++;
			//console.log("bubble sort test");
		}

		// inserion sort | data_c
		if (swap_pos_insert < all_swaps_insert.length) {
			var swap_info = all_swaps_insert[swap_pos_insert];
	        swap(swap_info[0], swap_info[1], data_c);
			swap_pos_insert++;
			console.log("insertion sort test");
	    }

	    lastTime = timestamp;
	}

	ctx.clearRect(0, 0, screen_width, screen_height);


	draw_data(data_a, 0, "red");
	draw_data(data_b, screen_width / 4, "blue");
	draw_data(data_c, screen_width / 2, "green");
	draw_data(data_d, screen_width / (4/3), "yellow");
	
	requestAnimationFrame(draw);
}


// when the window loads
window.addEventListener('load', function()
{
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");

	screen_width = canvas.width;
	screen_height = canvas.height;

	column_width = screen_width / max_value / 4;


	data_a = generate_random_array(10);
	data_b = data_a.slice();
	data_c = data_a.slice();
	data_d = data_a.slice();


	//mergeSort(data_a);
	quicksort(data_a.slice(), 0, data_a.length - 1, all_swaps_quick);
	bubble_sort(data_b.slice(), all_swaps_bubb);
	insertion_sort(data_c);
	//insertion_sort(data_c.slice(), all_swaps_insert);

	
	draw();
});