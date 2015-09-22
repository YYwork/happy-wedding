$ ->
  # $('#grid').masonry(
  #   columnWidth: 250,
  #   itemSelector: '.grid-item',
  #   isFitWidth: true
  # )
  $('.to-top').click( ()->
    $('html,body').animate({scrollTop:0},'slow')
  )
  $('.grid-item').mouseenter( () ->
    # $that = $(this).find('img')
    # $width = $that.width()
    # $height = $that.height()
    # $that.css(
    #   "width": $width * 1.06,
    #   "height": $height * 1.06,
    #   "margin-top": - $width * 0.03,
    #   "margin-left": - $height * 0.03
    # )
    # $that.parents('.grid-item').css(
    #   "width": $width,
    #   "height": $height
    # )

    $(this).find('.grid-item-cover').show();
  )



  $('.grid-item').mouseleave( () ->
    # $that = $(this).find('img')
    # $width = $that.width()
    # $height = $that.height()
    # $that.css(
    #   "width": $width / 1.06,
    #   "height": $height / 1.06,
    #   "margin-top": 0,
    #   "margin-left": 0
    # )
    $(this).find('.grid-item-cover').hide()
  )

  # $('.loading').click( () ->
  #   elements = '<div class="grid-item"><img src="../../images/demo/1.jpg"></div><div class="grid-item"><img src="../../images/demo/2.jpeg"></div><div class="grid-item"><img src="../../images/demo/3.jpg"></div><div class="grid-item"><img src="../../images/demo/4.jpg"></div><div class="grid-item"><img src="../../images/demo/5.jpg"></div><div class="grid-item"><img src="../../images/demo/6.jpg"></div><div class="grid-item"><img src="../../images/demo/7.jpg"></div><div class="grid-item"><img src="../../images/demo/8.jpg"></div><div class="grid-item"><img src="../../images/demo/9.jpg"></div><div class="grid-item"><img src="../../images/demo/10.png"></div>'
  #   $('#grid').append(elements).masonry('appended', elements, true);
  #   $img = $('#grid img');
  #   $img.load( ()->
  #     $('#grid').masonry();
  #   )
  # )


  # $('.global-wedding').infinitescroll {
  #   navSelector: '#navigation'
  #   nextSelector: '#navigation a'
  #   itemSelector: '.grid-item'
  #   debug: true
  #   animate: true
  #   extraScrollPx: 150
  #   bufferPx: 40
  #   errorCallback: ->
  #     alert 'error'
  #     return
  #   localMode: true
  #   dataType: 'json'
  #   template: (data)->
  #     elements = '<div class="grid-item"><img src="../../images/demo/1.jpg"></div><div class="grid-item"><img src="../../images/demo/2.jpeg"></div><div class="grid-item"><img src="../../images/demo/3.jpg"></div><div class="grid-item"><img src="../../images/demo/4.jpg"></div><div class="grid-item"><img src="../../images/demo/5.jpg"></div><div class="grid-item"><img src="../../images/demo/6.jpg"></div><div class="grid-item"><img src="../../images/demo/7.jpg"></div><div class="grid-item"><img src="../../images/demo/8.jpg"></div><div class="grid-item"><img src="../../images/demo/9.jpg"></div><div class="grid-item"><img src="../../images/demo/10.png"></div>'
  #     elements
  #   loading:
  #     msgText: '加载中...'
  #     finishedMsg: '没有新数据了...'
  #     selector: '.loading'
  # }, (newElems) ->
  #   console.log(newElems)
  #   #程序执行完的回调函数
  #   $newElems = $(newElems)
  #   $('#grid').masonry 'appended', $newElems
  #   return
  #
  downloadToTopHeight = $('.xswHeadindex').height()
  $(document).scroll( ()->
    if ($(document).scrollTop() >= downloadToTopHeight)
      $('.gw-main-header').addClass('fixed');
    else
      $('.gw-main-header').removeClass('fixed');
  )

(($) ->

  html = '<div class="mfp-figure">'\
        +'  <div class="mfp-close"></div>'\
        +'  <div class="mfp-cover-content">'\
        +'    <div class="mfp-cover-left">'\
        +'      <div class="mfp-cover-header">'\
        +'      </div>'\
        +'      <div class="mfp-img"></div>'\
        +'    </div>'\
        +'    <div class="mfp-cover-right"></div>'\
        +'  </div>'\
        +'</div>'
  $itemsList = $("li", $('#grid'))
  $('#grid, #cover-grid').magnificPopup(
    type: 'image',
    image:
      markup: html,
      cursor: 'mfp-zoom-out-cur',
      titleSrc: 'title',
      verticalFit: true,
      tError: '<a href="%url%">The image</a> could not be loaded.'

    delegate: 'li:not(.inactive) a',
    gallery:
      enabled: true
    callbacks:
      open: ()->
        ###
        # 此处可用模板
        ###
        $('.mfp-cover-header').append($('#cover').html())
        $('.mfp-cover-right').append($('#tag-list').html())

        $items = $itemsList
        $item = ''
        $items.each((index) ->
          src = $(this).find('img').attr('src')
          if $(this).hasClass('nocover')
            $item += '<li class="grid-item"><img src="' + src + '"></li>'
          else
            $item += '<li class="grid-item"><img src="' + src + '" class="img-cover"></li>'
        )

        $('#cover-grid').append $item

        imagesLoaded '#cover-grid', ->
          wookmark2 = new Wookmark('#cover-grid',
            offset: 2
            itemWidth: 47
          )
      markupParse: (template, values, item)->
        $itemsList = $("li", $('#grid'))
        $itemsList.removeClass('nocover')
        $($itemsList[item.index]).addClass('nocover')
  )

  $('body').delegate('.cover-share', 'click', ()->
    $('.pop-qcore').toggleClass('show');
  )


  onScroll = ->

    # Check if we're within 100 pixels of the bottom edge of the broser window.
    $scrollActionHeight = 100;
    winHeight = (if window.innerHeight then window.innerHeight else $window.height()) # iphone fix
    closeToBottom = ($window.scrollTop() + winHeight > $document.height() - $scrollActionHeight)
    if closeToBottom

      # Get the first then items from the grid, clone them, and add them to the bottom of the grid
      # ajax 获取 data 转化为 $items
      $.ajax(
        type: 'get',
        url: '../../../json/page.json',
        dataType: 'json',
        success: (data, textStatus)->
          ###
          # 此处替换为 ajax
          ###
          $items = $("li", $container)
          $firstTen = $items.slice(0, 10).clone().css("opacity", 0)
          ###

          # console.log(data)
          # ajax 数据 组织成 html
          # $firstTen += '<li class="grid-item"><a href="' + src + '"><img src="' + src + '"></a></li>'

          ###
          $container.append $firstTen
          wookmark.initItems()
          wookmark.layout true, ->
            # Fade in items after layout
            setTimeout (->
              $firstTen.css "opacity", 1
            ), 500

        error: (er)->
          # console.log(er)
      )

  wookmark = undefined
  wookmark2 = undefined
  container = "#grid"
  $container = $(container)
  $window = $(window)
  $document = $(document)
  imagesLoaded container, ->
    wookmark = new Wookmark(container,
      offset: 11
      itemWidth: 240
    )


  # Capture scroll event.
  $window.bind "scroll.wookmark", onScroll
) jQuery

