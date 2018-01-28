function main() {
	let count = 0;
	$("#cat_image").click(function() {
		count++;
		$("#count").text(count);
	});
};
$(document).ready(main());
