$(function() {
  $('.to-top').click(function() {
    return $('html,body').animate({
      scrollTop: 0
    }, 'slow');
  });
  $('.grid-item').mouseenter(function() {
    return $(this).find('.grid-item-cover').show();
  });
  return $('.grid-item').mouseleave(function() {
    return $(this).find('.grid-item-cover').hide();
  });
});

(function($) {
  var $container, $document, $itemsList, $window, container, html, onScroll, wookmark, wookmark2;
  html = '<div class="mfp-figure">' + '  <div class="mfp-close"></div>' + '  <div class="mfp-cover-content">' + '    <div class="mfp-cover-left">' + '      <div class="mfp-cover-header">' + '      </div>' + '      <div class="mfp-img"></div>' + '    </div>' + '    <div class="mfp-cover-right"></div>' + '  </div>' + '</div>';
  $itemsList = $("li", $('#grid'));
  $('#grid, #cover-grid').magnificPopup({
    type: 'image',
    image: {
      markup: html,
      cursor: 'mfp-zoom-out-cur',
      titleSrc: 'title',
      verticalFit: true,
      tError: '<a href="%url%">The image</a> could not be loaded.'
    },
    delegate: 'li:not(.inactive) a',
    gallery: {
      enabled: true
    },
    callbacks: {
      open: function() {

        /*
         * 此处可用模板
         */
        var $item, $items;
        $('.mfp-cover-header').append($('#cover').html());
        $('.mfp-cover-right').append($('#tag-list').html());
        $items = $itemsList;
        $item = '';
        $items.each(function(index) {
          var src;
          src = $(this).find('img').attr('src');
          if ($(this).hasClass('nocover')) {
            return $item += '<li class="grid-item"><img src="' + src + '"></li>';
          } else {
            return $item += '<li class="grid-item"><img src="' + src + '" class="img-cover"></li>';
          }
        });
        $('#cover-grid').append($item);
        return imagesLoaded('#cover-grid', function() {
          var wookmark2;
          return wookmark2 = new Wookmark('#cover-grid', {
            offset: 2,
            itemWidth: 47
          });
        });
      },
      markupParse: function(template, values, item) {
        $itemsList = $("li", $('#grid'));
        $itemsList.removeClass('nocover');
        return $($itemsList[item.index]).addClass('nocover');
      }
    }
  });
  $('body').delegate('.mfp-share-text', 'click', function() {
    return $('.pop-qcore').toggleClass('show');
  });
  onScroll = function() {
    var $scrollActionHeight, closeToBottom, winHeight;
    $scrollActionHeight = 100;
    winHeight = (window.innerHeight ? window.innerHeight : $window.height());
    closeToBottom = $window.scrollTop() + winHeight > $document.height() - $scrollActionHeight;
    if (closeToBottom) {
      return $.ajax({
        type: 'get',
        url: '../../../json/page.json',
        dataType: 'json',
        success: function(data, textStatus) {

          /*
           * 此处替换为 ajax
           */
          var $firstTen, $items;
          $items = $("li", $container);
          $firstTen = $items.slice(0, 10).clone().css("opacity", 0);

          /*
          
           * console.log(data)
           * ajax 数据 组织成 html
           * $firstTen += '<li class="grid-item"><a href="' + src + '"><img src="' + src + '"></a></li>'
           */
          $container.append($firstTen);
          wookmark.initItems();
          return wookmark.layout(true, function() {
            return setTimeout((function() {
              return $firstTen.css("opacity", 1);
            }), 500);
          });
        },
        error: function(er) {}
      });
    }
  };
  wookmark = void 0;
  wookmark2 = void 0;
  container = "#grid";
  $container = $(container);
  $window = $(window);
  $document = $(document);
  imagesLoaded(container, function() {
    return wookmark = new Wookmark(container, {
      offset: 10,
      itemWidth: 238
    });
  });
  return $window.bind("scroll.wookmark", onScroll);
})(jQuery);
