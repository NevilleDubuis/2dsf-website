// =require modernizr
// =require jquery
// =require underscore

$(function($, undefined) {

  scrollbarWidth = (function() {
    var $inner = jQuery('<div style="width: 100%; height:200px;">test</div>'),
    $outer = jQuery('<div style="width:200px;height:150px; position: absolute; top: 0; left: 0; visibility: hidden; overflow:hidden;"></div>').append($inner),
    inner = $inner[0],
    outer = $outer[0];

    jQuery('body').append(outer);
    var width1 = inner.offsetWidth;
    $outer.css('overflow', 'scroll');
    var width2 = outer.clientWidth;
    $outer.remove();

    return (width1 - width2);
  })();

  // Navbar Jeux
  $('.NavBarLi2').hide();

  $('.NavBarLi').hover(function() {
    event.preventDefault();

    $(this).addClass('active').queue(function() {
      $('.NavBarLi2').slideDown('slow');
      $(this).dequeue();
    });
  });

  $('.NavBarLi').mouseleave(function() {
    event.preventDefault();
    var $this = $(this);

    $('.NavBarLi2').slideUp('slow').queue(function() {
      $this.removeClass('active');
      $(this).dequeue();
    });
  });

  // Overlay
  var overlayToggle = window.overlayToggle = function(el, options) {
    options = _.defaults(options || {}, {
      loader: true
    });

    el = $(el);
    if (el.has('.overlay').length === 0) {
      el.css('position', 'relative');
      var overlay = $('<div class="overlay"><div class="background" /></div>');
      if (options.loader) {
        overlay.append('<div class="loader" />');
      }
      overlay.appendTo(el).fadeIn();
    } else {
      el.children('.overlay').fadeOut(function() {
        $(this).remove();
      });
    }
  }

  // LightBox Show
  var lightboxShow = function() {
    console.log('click');
    var item_class = $(this).first();
    scrollPosition = $(window).scrollTop();

    $('#details article').show();
    $('section#main > *').wrapAll('<div />').parent()
    .css({
      position: 'fixed',
      top: '0',
      'margin-top': -scrollPosition + 'px',
      width: $('section#main').width()
    });
    $('section#main').css('padding-right', scrollbarWidth + 'px');
    $(window).scrollTop(0);

    $('body').css({
      height: Math.max($(window).outerHeight() - ($('#details').outerHeight(true) - $('#details').outerHeight()), $('#details').outerHeight()),
      'padding-bottom': $(window).outerHeight() <= $('#details').outerHeight() ? '50px' : '0px'
    });

    overlayToggle($('body'), { loader: false });
    $('body > .overlay').css({
      height: $('section#main > div').outerHeight(),
    });

    $('#details').fadeIn();

    // var item = _.find(items, function(item, key) { return item.index === parseInt(item_class.match(/\d+/)[0]) });
    // History.setLocation({item: item.key });
    // _gaq.push(['_trackPageview', '/items/' + item.key]);
  }

  // LightBox Hide
  var hideDetail = function(){
    overlayToggle($('body'));

    $('#details').fadeOut(function() {
      $('section#main').css('padding-right', 0);
      $('header, section.content, footer').unwrap();
      $(window).scrollTop(scrollPosition);
      $('#details article').hide();
    });

    History.resetLocation();
    _gaq.push(['_trackPageview', '/']);
  }

  // Nav Arrows Books
  var containerNumber = $('.box > .overflow > .display').length;
  var containerWidth = $('.box > .overflow > .display').outerWidth();
  var totalWidth = containerNumber * containerWidth;
  $('.box > .overflow').css('width', totalWidth + 'px');
  $('.box > .overflow > .display').first().addClass('current');
  $('.box > .overflow').css('position', 'relative');

  var scrollTo = function(event) {
    event.preventDefault();
    var move = "+=0";
    var side = "+=0";
    var current = $('.box > .overflow > .current');

    if($(this).hasClass('next')) {
      if($(current).next('.box > .overflow > .display').length > 0){
        current.removeClass('current');
        move = "-=" + current.outerWidth(true);
        current.next('.box > .overflow > .display').addClass('current');
      }
    } else {
      if($(current).prev('.box > .overflow > .display').length > 0){
        current.removeClass('current');
        move = "+=" + current.outerWidth(true);
        current.prev('.box > .overflow > .display').addClass('current');
      }
    }

    $(event.currentTarget).parent().find('.box > .overflow').animate({left: move}, 1500);

    if($('.box > .overflow > .current').next('.box > .overflow > .display').length === 0) {
      $('.next').fadeOut();
    } else {
      $('.next').fadeIn();
    }

    if($('.box > .overflow > .current').prev('.box > .overflow > .display').length === 0) {
      $('.previous').fadeOut();
    } else {
      $('.previous').fadeIn();
    }
  }

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

  // init
  $(function() {
    // LightBox Initialisation
    $('#item_lightbox').on('click', lightboxShow);
    $('#details .close').on('click', hideDetail);

    // Bind click arrows
    $('.previous').on('click', scrollTo);
    $('.next').on('click', scrollTo);
  });
})(jQuery);
