let cats = [{
		"name": "Kitty",
		"count": 0,
		"image_url": "images/cat1.jpg"
	}, {
	
		"name": "Jessy",
		"count": 0,
		"image_url": "images/cat2.jpg"
}];

function display(items) {
	let $container = $("#container");
	$container.empty();
	for (let i = 0; i < items.length; i++) {
		let $cat_elem = $("<div class='cat_elem'></div>");
		$container.append($cat_elem);
		$cat_elem.append("<div>" + items[i].name + "</div>");
		$cat_image = $("<img src='" + items[i].image_url + "' alt='A cat' width='500' height='300' id='cat_image" + i + "'>");
		$cat_elem.append($cat_image);
		$("#cat_image" + i + "").click(function() {
			items[i].count++;
			$("#count" + i + "").text(items[i].count);
		});
		$count = $("<p id='count" + i + "'>0</p>")
		$cat_elem.append($count);
	}
};

display(cats);
