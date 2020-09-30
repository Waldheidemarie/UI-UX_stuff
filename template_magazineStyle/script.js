$(document).ready(function(){

	$(".image1").click(function() {
		$(".body-wrapper").addClass("body-wrapper-magazine");
		$(".landing-page-wrap").hide();
		$("header").hide();
		$(".magazine-wrap").show();
		window.setTimeout(function() {
		$(".magazine-wrap").addClass("magazine-wrap-show");
		}, 10);
	});

	//MAGAZINE READ TOGGLE
	$(".article a").click(function() {
		$(".magazine-wrap").addClass("magazine-wrap-reading");
		$(".magazine-right").hide(0);
		$(".mag-header span").fadeIn(300);
		$(".magazine-read").delay(300).fadeIn(400);
		$(".back").delay(300).fadeIn(400);
		$(".magazine-triangle").show();
		$(".magazine-triangle").addClass("magazine-triangle-active");
		$(".magazine-authors li").hide();
		$(".mag-overlay").addClass('mag-overlay-no-overflow');
	});

	$(".back").click(function() {
		$(".magazine-wrap").removeClass("magazine-wrap-reading");
		$(".magazine-triangle").removeClass("magazine-triangle-active");
		$(".mag-header span").fadeOut(300);
		$(".magazine-read").hide();
		$(".magazine-right").fadeIn(300);
		$(".back").hide();
		$(".magazine-triangle").hide();
		$(".magazine-authors li").show();
		$(".mag-overlay").removeClass('mag-overlay-no-overflow');
	});

	// BOTTOM BAR ON SCROLL LOGIC
	$(".magazine-read").scroll(function() {
	    var posTop = $('.magazine-read').scrollTop();
	    if (posTop > 300) {
	    	$(".bottom-bar").addClass('bottom-bar-pull');
	    } else {
	    	$(".bottom-bar").removeClass('bottom-bar-pull');
	    }

	    if (posTop > 60) {
	    	$(".read-head").addClass("read-head-fix");
	    } else {
	    	$(".read-head").removeClass("read-head-fix");
	    }

	});
});