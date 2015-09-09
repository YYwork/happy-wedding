$(function() {
  var checkForm, getFormData;
  $('.pop-x').click(function() {
    $('.pop-windows').hide();
    return location.href = '../order/order.html';
  });
  getFormData = function() {
    var data;
    return data = {
      name: $('.name').val(),
      phone: $('.phone').val(),
      date: $('.date').val(),
      address: $('.address').val(),
      deskes: $('.deskes').val(),
      meal: $('.meal').val(),
      other: $('.other').val()
    };
  };
  checkForm = function(data) {
    if (data.name === '') {
      alert("请输入姓名");
      return false;
    }
    if (data.phone === '') {
      alert("请输入手机号");
      return false;
    }
    if (data.date === '') {
      alert("请输入婚期");
      return false;
    }
    if (data.address === '') {
      alert("请选择商圈");
      return false;
    }
    if (data.deskes === '') {
      alert("请选择桌数");
      return false;
    }
    if (data.meal === '') {
      alert("请选择餐标");
      return false;
    }
    if (data.other === '') {
      alert("请输入其他");
      return false;
    }
    return true;
  };
  return $('#cus-submit').click(function() {
    var data;
    data = getFormData();
    if (checkForm(data)) {
      console.log(1);
      return $('.pop-windows').show();
    }
  });
});
