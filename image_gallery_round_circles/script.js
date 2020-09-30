var blnReady	   = true;
var strPath 	   = 'section .layer';
var strFinished  = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';

$('.btn').click(function(e) {
  e.preventDefault();

  var top 		= $(strPath).first();
  var bottom 	= $(strPath).last();
  var sliceL	= $(top).find('.slice.left');
  var sliceR	= $(top).find('.slice.right');
  var btn     = $(this);

  if($(btn).hasClass("next") && (blnReady === true)){
    blnReady = false;
    $(btn).addClass('disable');
    $(sliceR).addClass('next spin-in');
    $(sliceR).one(strFinished,   
      function() {
        $(sliceL).addClass('next spin-out');
        $(sliceL).one(strFinished,   
          function() {
            $(top).insertAfter(bottom);
            $(sliceL).removeClass('next spin-out');
            $(sliceR).removeClass('next spin-in');
            $(btn).removeClass('disable');
            blnReady = true;
            return;
          });	
      });
  }

  if($(this).hasClass("prev") && (blnReady === true)){
    blnReady = false;
    $(btn).addClass('disable');
    $(bottom).insertAfter(top);
    $(sliceL).addClass('prev spin-in');
    $(sliceL).one(strFinished,
      function() {
        $(sliceR).addClass('prev spin-out');
        $(sliceR).one(strFinished,   
          function() {
            $(bottom).insertBefore(top);
            $(sliceL).removeClass('prev spin-in');
            $(sliceR).removeClass('prev spin-out');
            $(btn).removeClass('disable');
            blnReady = true;
            return;
          });	
      });
  }
});


$('.btn').hover(function(e) {
  $('.btn').removeClass('wake');
});
$('.btn').addClass('wake');