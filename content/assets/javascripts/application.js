// =require modernizr
// =require jquery

$(function() {

  // Agreement condition lightbox
  $('#lightbox').hide();

  $('.lightbox_link').on('click', function(event) {
    event.preventDefault();

    $('#lightbox').slideDown('slow');
  });

  $('#close').on('click', function(event) {
    event.preventDefault();

    $('#lightbox').slideUp('fast');
  });
});