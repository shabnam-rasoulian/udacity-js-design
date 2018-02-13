$(function() {
	var model = {
		cats: [{
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
		}],

		currentCat: null,
	};

	var octopus = {
		init: function() {
			view.init();
		},

		getCats: function() {
			return model.cats;
		},

		getCurrentCat: function() {
			return model.currentCat;
		},

		setCurrentCat: function(cat) {
			model.currentCat = cat;
		},

		incrementCount: function() {
			model.currentCat.count++;
		}
	};

	var view = {
		init: function() {
			this.catImage = $("#cat_image");
			this.catImage.click(function() {
				octopus.incrementCount();
				$("#count").text(octopus.getCurrentCat().count);
			});
			view.render();
		},

		displayList: function() {
			let items = octopus.getCats();
			let $list = $("#list");
			$list.empty();
			for (let i = 0; i < items.length; i++) {
				let $item = $("<li><h3>" + items[i].name + "</h3></li>");
				$list.append($item);
				$item.click((function(item) {
					return function() {
						octopus.setCurrentCat(item);
						view.displayItem();
					};
				})(items[i]));
			}
		},

		displayItem: function() {
			let current = octopus.getCurrentCat();
			if (!current) {
				this.catImage.attr("src", "images/cats.jpg");
				return;
			}
			$("#name").text(current.name);
			this.catImage.attr("src", current.image_url);
			$("#count").text(current.count);
		},

		render: function() {
			view.displayList();
			view.displayItem();
		}
	};

	octopus.init();
});
