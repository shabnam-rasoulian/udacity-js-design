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
		visible: false,
	};

	var octopus = {
		init: function() {
			this.adminArea = $("#admin_area");
			this.name = $("#cat_name");
			this.url = $("#cat_url");
			this.count = $("#cat_count");
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
		},

		setVisibility: function() {
			if (model.visible) {
				model.visible = false;
			} else {
				model.visible = true;
			}
		},

		getVisibility: function() {
			return model.visible;
		},

		showForm: function() {
			this.adminArea.show();
			this.name.val(model.currentCat.name);
			this.url.val(model.currentCat.image_url);
			this.count.val(model.currentCat.count);
		},

		hideForm: function() {
			this.adminArea.hide();
		},
		
		updateForm: function() {
			model.currentCat.name = this.name.val();
			model.currentCat.image_url = this.url.val();
			model.currentCat.count = this.count.val();
		}
	};

	var view = {
		init: function() {
			this.catImage = $("#cat_image");
			this.catImage.click(function() {
				octopus.incrementCount();
				let count = octopus.getCurrentCat().count;
				$("#count").text(count);
				$("#cat_count").val(count);
			});
			$("#admin_area").hide();
			$("#admin_btn").click(function() {
				octopus.setVisibility();
				octopus.showForm();
			});
			$("#cancel_btn").click(function() {
				octopus.setVisibility();
				octopus.hideForm();
			});
			$("#save_btn").click(function() {
				octopus.updateForm();
				octopus.hideForm();
				view.render();
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
						if (octopus.getVisibility()) {
							octopus.showForm();
						}
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
