$ ()->

  $('.pop-x').click ()->
    $('.pop-windows').hide()
    location.href = '../order/order.html'

  getFormData = ()->
    data =
      name: $('.name').val()
      phone: $('.phone').val()
      date: $('.date').val()
      address: $('.address').val()
      deskes: $('.deskes').val()
      meal: $('.meal').val()
      other: $('.other').val()

  checkForm = (data)->
    if data.phone == ''
      alert("请输入手机号")
      return false
    return true

  $('#cus-submit').click ()->
    data = getFormData()
    if checkForm data
      $('.pop-windows').show()
      # ajax 提交表单

