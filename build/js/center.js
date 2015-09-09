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
    if (data.phone === '') {
      alert("请输入手机号");
      return false;
    }
    return true;
  };
  return $('#cus-submit').click(function() {
    var data;
    data = getFormData();
    if (checkForm(data)) {
      return $('.pop-windows').show();
    }
  });
});
