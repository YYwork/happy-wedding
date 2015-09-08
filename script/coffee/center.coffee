$ ()->

  $('.pop-x').click ()->
    $('.pop-windows').hide()

  validate = $("form.cus-center").validate(
    rules:
      name:
        required: true

      phone:
        required: true

      date:
        required: true

      address:
        required: true

      deskes:
        required: true

      meal:
        required: true

      other:
        required: true

    messages:
      name:
        required: "请输入姓名"

      phone:
        required: "请输入手机号"

      date:
        required: "请输入婚期"

      address:
        required: "请选择商圈"

      deskes:
        required: "请选择桌数"

      meal:
        required: "请选择餐标"

      other:
        required: "请输入其他"

    submitHandler: (form) -> #通过之后回调
      formData = $(form).serializeArray()
      $.ajax
        url: "/account/register"
        type: "post"
        dataType: "json"
        data: formData
        success: (data) ->
          if data.code isnt 0
            #
          else
            #

        error: ->
          #


    invalidHandler: (form, validator) -> #不通过回调
      false
  )
