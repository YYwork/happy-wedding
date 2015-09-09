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
    if data.name == ''
      alert("请输入姓名")
      return false
    if data.phone == ''
      alert("请输入手机号")
      return false
    if data.date == ''
      alert("请输入婚期")
      return false
    if data.address == ''
      alert("请选择商圈")
      return false
    if data.deskes == ''
      alert("请选择桌数")
      return false
    if data.meal == ''
      alert("请选择餐标")
      return false
    if data.other == ''
      alert("请输入其他")
      return false
    return true

  $('#cus-submit').click ()->
    data = getFormData()
    if checkForm data
      console.log 1
      $('.pop-windows').show()
      # ajax 提交表单

