log = (a)->
  console.log a

$ ()->

  $('.input-btn').click ()->
    $('.pop-windows').show()

  $('.pop-x').click ()->
    $('.pop-windows').hide()

  $('.btn-ico').click ()->
    $('.detail-description').toggleClass('detail-pack-up')
    $('.btn-ico').toggleClass('card-down')

  $('.use-btn').click ()->
    $('.pop-windows').show()

  $('.btn-no').click ()->
    $('.pop-windows').hide()

  $('.btn-yes').click ()->
    log '确认消券'
    $('.pop-windows').hide()