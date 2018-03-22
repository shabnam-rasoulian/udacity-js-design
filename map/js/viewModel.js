var attraction = function(data) {
	this.name = ko.observable(data.name);
	this.position = ko.observable(data.position);
	this.marker = data.marker;
	this.yelpID = data.yelpID;
};

var map;
function initializeMap() {
	// Set the map options
	var mapOptions = {disableDefaultUI: true};
	// Append google map to #mapdiv 
	map = new google.maps.Map(document.querySelector("#mapDiv"), mapOptions);
	// Set the boundaries of the map
	window.mapBounds = new google.maps.LatLngBounds();
	// Add the markers to each attraction in the model
	for (var i = 0; i < attractions.length; i++) {
		var pos = attractions[i].position;
		attractions[i].marker = new google.maps.Marker({
			map: map,
			position: pos,
		});
		// Extend the map boundaries to the new marker
		window.mapBounds.extend(new google.maps.LatLng(pos.lat, pos.lng));
	}
	// Fit the map to the new marker
	map.fitBounds(window.mapBounds);
	// Center the map
	map.setCenter(window.mapBounds.getCenter());
};

function viewModel() {
	var self = this;
	// Create list of attractions
	this.attractionList = ko.observableArray([]);
	attractions.forEach(function(item) {
		self.attractionList().push(new attraction(item));
	});
	// Create a variable to store current location
	this.currentLocation = ko.observable();
	//
	this.displayLocation = function() {
		$("#lst").empty();
		var yelpUrl = "https://api.yelp.com/v2/businesses/" + self.currentLocation().yelpID;
		$.ajax({
			url: yelpUrl,
			dataType: "jsonp",
			headers: {Authorization: "Bearer " + "dkJdms6mcNncZNvQCckwMGwRKBa_5ND9MbUOUuSNb-CkyadKzbxGNhvvJFOj34FFnJMwt3HpcUVXCJKSflq_j1h7YRVoNrkCnnTPYT8fRxzkkQxlkW7S1cf1-g6XWnYx"},
			success: function(data) {
				console.log(data);	
			}
		});
	};
	// Set the current location based on click on marker and hide other markers
	for (var i = 0; i < self.attractionList().length; i++) {
		var item = self.attractionList()[i];
		google.maps.event.addListener(item.marker, "click", (function(item) {
			return function() {
				self.attractionList().forEach(function(listItem) {
					if (listItem !== item) {
						listItem.marker.setMap(null);
					}
				});
				//$("#lst").empty();
				self.currentLocation(item);
				self.displayLocation();
			};
		})(item));
	}
	// Create a variable to store search box input
	this.searchAttractions = ko.observable("");
	// Filter the attractions list based on user's input
	this.filteredAttractions = ko.computed(function() {
		var attr = ko.utils.arrayFilter(self.attractionList(), function(item) {
			const visible = self.searchAttractions().length == 0 || item.name().toLowerCase().indexOf(self.searchAttractions().toLowerCase()) > -1;
			// Invisible the markers based on filter result
			item.marker.setMap(visible ? map : null);
			return visible;
		});
		if (attr.length === 1) {
			//$("#lst").empty();
			self.currentLocation(attr[0]);
			self.displayLocation();
		}
		return attr;
	});
	// Set the current location based on user's action
	this.setCurrentLocation = function(item) {
		//$("#lst").empty();
		self.currentLocation(item);
		self.displayLocation();
	};
};

initializeMap();
ko.applyBindings(new viewModel());
