$(document).ready(function() {

	var colorClass = '';

	$('.select-color').click(function() {
		var selectedColor = $(this).attr('class');

		switch (selectedColor) {
			case "select-color green not-selected":
				colorClass = 'green';
				break;
			case "select-color yellow not-selected":
				colorClass = 'yellow';
				break;
			case "select-color red not-selected":
				colorClass = 'red';
				break;
		}

		$(this).removeClass('not-selected');
		$(this).siblings().addClass('not-selected');
	});

	$('.box').click(function() {
		$(this).toggleClass(colorClass);
	});

	$('.toggle-blink').click(function() {
		if (colorClass) {
			$('.toggle-blink').toggleClass('opacity');
			setInterval(function() {
				$('.box.green, .box.yellow, .box.red').toggleClass('blink');
			}, 350);
		}
	});

});