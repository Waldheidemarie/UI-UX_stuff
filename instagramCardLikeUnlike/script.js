$('.card-body').dblclick(function(){
   $('.like-sign').fadeIn();
    
  setTimeout(function(){
    $('.like-sign').fadeOut();
  }, 1000);
  
  $('.icon-like').removeClass('fa-heart-o')
                  .addClass('fa-heart');
});

$('.icon-like').click(function(){
  if($('.icon-like').hasClass('fa-heart-o')){
      $('.like-sign').fadeIn();

      setTimeout(function(){
        $('.like-sign').fadeOut();
      }, 1000);
    
     $('.icon-like').removeClass('fa-heart-o')
                  .addClass('fa-heart');
  }else{
    $('.icon-like').addClass('fa-heart-o')
                  .removeClass('fa-heart');
  }
});