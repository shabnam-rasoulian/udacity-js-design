var cats= [{
		name: "Kitty",
		count: 0,
		image_url: "images/cat1.jpg",
		nickNames: ["Kit Kat", "Kitty Catty", "Tak Tak"]
	}, {
		name: "Jessy",
		count: 0,
		image_url: "images/cat2.jpg",
		nickNames: ["Jay", "Jess"]
	}, {
		name: "Tommy",
		count: 0,
		image_url: "images/cat3.jpg",
		nickNames: ["Tom Tom", "Mr. T", "T-Bone"]
	}, {
		name: "Sippy",
		count: 0,
		image_url: "images/cat4.jpg",
		nickNames: ["Sip", "Siiii"]
	}, {
		name: "Rusty",
		count: 0,
		image_url: "images/cat5.jpg",
		nickNames: ["Rus"]
}];

var Cat = function(data) {
	this.name = ko.observable(data.name);
	this.count = ko.observable(data.count);
	this.image_url = ko.observable(data.image_url);
	this.level = ko.computed(function() {
		var counter = this.count();
		if (counter < 10) {
			return "Newborn";
		} else if (counter < 50) {
			return "Infant";
		} else if (counter < 100) {
			return "Child";
		} else if (counter < 200) {
			return "Teen";
		} else {
			return "Adult";
		}
	}, this);

	this.nickNames = ko.observableArray(data.nickNames);
};

var ViewModel = function() {
	var self = this;
	this.catList = ko.observableArray([]);
	cats.forEach(function(cat) {
		self.catList().push(new Cat(cat));
	});
	this.currentCat = ko.observable(this.catList()[0]);
	this.setCurrentCat = function(cat) {
		self.currentCat(cat);
	};
	this.incrementCounter = function() {
		self.currentCat().count(self.currentCat().count() + 1);
	};
};

ko.applyBindings(new ViewModel());
