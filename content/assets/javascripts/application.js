// =require modernizr
// =require jquery

$(function() {

  // Navbar Jeux
  $('.NavBarLi').hide();
  $('.NavBarLink').on('click', function(event) {
    event.preventDefault();
    $('.NavBarLi').fadeIn('fast');
  });

  $('.NavBarLink2').on('click', function(event) {
    event.preventDefault();
    $('.NavBarLi').fadeOut('fast');
  });

  // LightBox
  $('#lightbox').hide();

  $('.lightbox_link').on('click', function(event) {
    event.preventDefault();

    $('#lightbox').slideDown('slow');
  });

  $('#close').on('click', function(event) {
    event.preventDefault();

    $('#lightbox').slideUp('fast');
  });

  // Nav Position Books
  var position;

  $('.books').hover(function() {
    position = $(this).position();

    var active_item = $(this);
    var active_position_left = $(this).position();
    var item_left = active_position_left.left - 40;

    active_item.addClass('active').css({
      'z-index': '2000',
      'top': '15px',
      'left': item_left,
      'max-width': '185px',
      'max-height': '280px'
    });
  },

  function() {
    var active_item = $(this);

    active_item.removeClass('active').css({
      'z-index': '1000',
      'top': position.top,
      'left': position.left,
      'max-width': '145px',
      'max-height': '266px'
    });
  });
});