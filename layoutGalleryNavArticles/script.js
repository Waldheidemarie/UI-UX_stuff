//Portfolio filter
	$(window).load(function () {
        var $container = $('.portfolio-wrap');
        var $filter = $('#filter');
        // Initialize isotope
        $container.isotope({
            filter: '*',
            layoutMode: 'fitRows',
            animationOptions: {
                duration: 750,
                easing: 'linear'
            }
        });
        // Filter items when filter link is clicked
        $filter.find('a').click(function () {
            var selector = $(this).attr('data-filter');
            $filter.find('a').removeClass('current');
            $(this).addClass('current');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    animationDuration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });	
	});    
    
// Portfolio Isotope
    $(document).ready(function(){
        var container = $('.portfolio-wrap');		
			function splitColumns() { 
				var winWidth = $(window).width(), 
					columnNumb = 1;
				
				if (winWidth > 1024) {
					columnNumb = 4;
				} else if (winWidth > 900) {
					columnNumb = 2;
				} else if (winWidth > 479) {
					columnNumb = 2;
				} else if (winWidth < 479) {
					columnNumb = 1;
				}				
				return columnNumb;
			}			
			function setColumns() { 
				var winWidth = $(window).width(), 
					columnNumb = splitColumns(), 
					postWidth = Math.floor(winWidth / columnNumb);
				
				container.find('.portfolio-box').each(function () { 
					$(this).css( { 
						width : postWidth + 'px' 
					});
				});
			}			
			function setProjects() { 
				setColumns();
				container.isotope('reLayout');
			}			
			container.imagesLoaded(function () { 
				setColumns();
			});		
		
			$(window).bind('resize', function () { 
				setProjects();			
			});

	});
// Portfolio Ajax	 
		$(window).load(function() {
            var loader = $('.expander-wrap');
			if(typeof loader.html() == 'undefined'){
				$('<div class="expander-wrap"><div id="expander-wrap" class="container clearfix relative"><p class="cls-btn"><a class="close">X</a></p><div/></div></div>').css({opacity:0}).hide().insertAfter('.portfolio');
				loader = $('.expander-wrap');
			}
			$('.expander').on('click', function(e){
				e.preventDefault();
				e.stopPropagation();
				var url = $(this).attr('href');

				loader.slideUp(function(){
					$.get(url, function(data){
						var portfolioContainer = $('.portfolio');
						var topPosition = portfolioContainer.offset().top;
						var bottomPosition = topPosition + portfolioContainer.height();
						$('html,body').delay(600).animate({ scrollTop: bottomPosition - (-10)}, 800);
						var container = $('#expander-wrap>div', loader);
						
						container.html(data);
						/*$('.project-wrap-slider').flexslider({
							animation: "fade",
							selector: ".slider-project-ajax .slide",
							controlNav: false,
							directionNav: true ,
							slideshowSpeed: 5000,  
						});*/
						
					
						loader.slideDown(function(){
							if(typeof keepVideoRatio == 'function'){
								keepVideoRatio('.video-container > iframe');
							}
						}).delay(1000).animate({opacity:1}, 200);
					});
				});
			});
			
			$('.close', loader).on('click', function(){
				loader.delay(300).slideUp(function(){
					var container = $('#expander-wrap>div', loader);
					container.html('');
					$(this).css({opacity:0});
					
				});
				var portfolioContainer = $('.portfolio');
					var topPosition = portfolioContainer.offset().top;
					$('html,body').delay(0).animate({ scrollTop: topPosition - 70}, 500);
			});

	});