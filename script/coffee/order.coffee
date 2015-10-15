$ ($) ->
  initInput = ->
    $('.yy-textarea-placeholder').hide()
  changeTagLiStyle = ($that)->
    if $that.hasClass('added')
      $that.removeClass('added')
      $that.find('.order-ico').addClass('order-jia').removeClass('order-dui1')
    else
      $that.addClass('added')
      $that.find('.order-ico').removeClass('order-jia').addClass('order-dui1')

  $('#yy-tags').tagsInput
    defaultText: ''
    width: '100%'
    height: '220px'
    onAddTag: (tag)->
      # if $('span.tag').length <= 5
      #   $('.yy-textarea-number').html 5 - $('span.tag').length
      # else
      #   $('#yy-tags').removeTag $('span.tag')[5].innerText

      $('.yy-customer-tags li').each ()->
        if $(this).text() == tag
          changeTagLiStyle($(this))
    onRemoveTag: (tag)->
      # $('.yy-textarea-number').html 5 - $('span.tag').length
      $('.yy-customer-tags li').each ()->
        if $(this).text() == tag
          changeTagLiStyle($(this))

    onChange: (tag)->
      initInput()

  $('.yy-customer-form').delegate '.yy-customer-tags li, #yy-tags_tagsinput span.tag', 'click', ->
    $that = $(this)

    if $('#yy-tags').tagExist($that.text())
      $('#yy-tags').removeTag $that.text()
    else
      $('#yy-tags').addTag $that.text()

  # $('.yy-customer-form').delegate '#yy-tags_tagsinput span.tag', 'click', ->
  #   $that = $(this)
  #   if $('#yy-tags').tagExist($that.text())
  #     $('#yy-tags').removeTag $that.text()
  #   else
  #     $('#yy-tags').addTag $that.text()



  $('.yy-customer-form').delegate '#yy-tags_tagsinput, #yy-tags_addTag', 'click', ->
    initInput()

  $('.yy-customer-form').delegate '#yy-tags_tag', 'focus', ->
    $('#yy-tags_tag').css border: '1px dashed #777'

  $('.yy-customer-form').delegate '#yy-tags_tag', 'blur', ->
    $('#yy-tags_tag').css border: '0px dashed #777'
    $('.yy-textarea-placeholder').show()  if $('span.tag').length is 0

  $('.input-item-check').click ->
    $(this).siblings('.icon').toggleClass('order-not-circle-yes')


  $('#submit-notorder').click ->
    count = 0
    $('.input-item').find(':checkbox').each ()->
      if $(this).is(':checked')
        count++
    if count == 0 && $.trim($('.other-reason').val()) == ''
      alert '原因不能为空～'
    return


  if $('.long-text').text().length <= 22
    $('.long-point').hide()
    return
