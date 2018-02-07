let cats = [{
		"name": "Kitty",
		"count": 0,
		"image_url": "images/cat1.jpg"
	}, {
	
		"name": "Jessy",
		"count": 0,
		"image_url": "images/cat2.jpg"
	}, {
		"name": "Tommy",
		"count": 0,
		"image_url": "images/cat3.jpg"
	}, {
		"name": "Sippy",
		"count": 0,
		"image_url": "images/cat4.jpg"
	}, {
		"name": "Rusty",
		"count": 0,
		"image_url": "images/cat5.jpg"
}];

function displayItem(item) {
	let $display = $("#display");
	$display.empty();
	let $htmlName = $("<h3>" + item.name + "</h3>");
	$display.append($htmlName);
	$cat_image = $("<img src='" + item.image_url + "' alt='A cat' width='500' height='300'>");
	$display.append($cat_image);
	$display.append("<div id='count'>" + item.count + "</div>");
	$cat_image.click(function() {
		item.count++;
		$("#count").text(item.count);
	});
};

function displayList(items) {
	let $list = $("#list");
	$list.empty();
	for (let i = 0; i < items.length; i++) {
		let $item = $("<li><h3>" + items[i].name+ "</h3></li>");
		$item.click((function(item) {
			return function() {
				displayItem(item);
			};
		}(items[i])));
		$list.append($item);
	}
};

displayList(cats);
