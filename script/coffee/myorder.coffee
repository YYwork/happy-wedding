$ ()->
  $('.nav-span').click ()->
    $('.nav-cover').toggleClass('show')
    $('.myorder-li-complete').toggleClass('complete-animate')
    $('.myorder-li-repeat').toggleClass('repeat-animate')
    $('.myorder-li-delete').toggleClass('delete-animate')
    $('.myorder-li-loading').toggleClass('loading-animate')
  $('.menu_option').css({
    'visibility': 'visible'
  })
