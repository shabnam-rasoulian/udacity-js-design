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
		// Add infoWindow to each marker
		var infoWindow = new google.maps.InfoWindow({
			content: "<div>" + attractions[i].name + "</div>"
		});
		google.maps.event.addListener(attractions[i].marker, "click", (function(marker, infoWindow) {
			return function() {
				infoWindow.open(map, marker);
			};
		}(attractions[i].marker, infoWindow)));
		// Extend the map boundaries to the new marker
		window.mapBounds.extend(new google.maps.LatLng(pos.lat, pos.lng));
	}
	// Fit the map to the new marker
	map.fitBounds(window.mapBounds);
	// Center the map
	map.setCenter(window.mapBounds.getCenter());
};

window.addEventListener("load", initializeMap);
