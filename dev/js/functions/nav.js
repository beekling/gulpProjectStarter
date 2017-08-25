$(window).resize(function() {
  if ($(this).width() <= 768) {
    $(".menu__icons i, .menu__link, .menu__logo").click(function() {
      $(".menu__icons i").toggleClass('hidden', 'slow');
      $(".menu__link").toggle();
    });
  }
  if ($(this).width() > 769) {
    $(".menu__link").show();
  }
});

var selector = '.menu__link';

$(selector).on('click', function(){
    $(selector).removeClass('active');
    $(this).addClass('active');
});