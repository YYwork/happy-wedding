$(function() {
  var validate;
  $('.pop-x').click(function() {
    return $('.pop-windows').hide();
  });
  return validate = $("form.cus-center").validate({
    rules: {
      name: {
        required: true
      },
      phone: {
        required: true
      },
      date: {
        required: true
      },
      address: {
        required: true
      },
      deskes: {
        required: true
      },
      meal: {
        required: true
      },
      other: {
        required: true
      }
    },
    messages: {
      name: {
        required: "请输入姓名"
      },
      phone: {
        required: "请输入手机号"
      },
      date: {
        required: "请输入婚期"
      },
      address: {
        required: "请选择商圈"
      },
      deskes: {
        required: "请选择桌数"
      },
      meal: {
        required: "请选择餐标"
      },
      other: {
        required: "请输入其他"
      }
    },
    submitHandler: function(form) {
      var formData;
      formData = $(form).serializeArray();
      return $.ajax({
        url: "/account/register",
        type: "post",
        dataType: "json",
        data: formData,
        success: function(data) {
          if (data.code !== 0) {

          } else {

          }
        },
        error: function() {}
      });
    },
    invalidHandler: function(form, validator) {
      return false;
    }
  });
});
