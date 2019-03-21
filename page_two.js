var canvas;
var ctx;

var screen_width;
var screen_height;

var column_width;

var max_value = 10;

//var data_a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var data_a;
//var data_b = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var data_b;

var test = [3, 5, 8, 9, 2, 1, 6, 7, 4, 0];



function generate_random_array(size) {
	var rand_arr = [];
	
	for (var i = 0; i < size; i++){
		// return randoms number between 1 and 10
		rand_arr.push(Math.floor(Math.random() * max_value + 1));
	}

	return rand_arr;
}




function swap(i, j, data) {
    var value = data[i];
	data[i] = data[j];
    data[j] = value;
}


function quicksort(data, low, high){
    if (low < high) {
        var part = partition(data, low, high);

        quicksort(data, low, part - 1);
        quicksort(data, part + 1, high);
    }
}

function partition(data, low, high) {
    var pivot = data[high];

    var i = low - 1;

    for (var j = low; j <= high - 1; j++) {
        if (data[j] <= pivot) {
            i++;
            swap(i, j, data);
        }
    }
    swap(i + 1, high, data);
    return i + 1;
}



function bubble_sort(data){

    for(var i = 0; i < data.length - 1; i++){
        if(data[i] > data [i + 1]){
            var temp = data[i];
            data[i] = data[i + 1];
            data[i + 1] = temp;
            return true;
        }
    }
    return false;
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

var lastTime = null;
function draw(timestamp)
{
	if (lastTime == null) {
		lastTime = timestamp;
	}

	// check if second has passed
	if (timestamp - lastTime > 1000) {

		//insertion_sort(data_a);
		bubble_sort(data_b);
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
	data_b = generate_random_array(10);


	requestAnimationFrame(draw);
});