'use strict';
$.pop = {
  _show: function(type, message, title, callback) {
    return $('body').append('<div id="popup" class="pop-cover">' + '<div class="pop-windows">' + '<div class="pop-title hidden"><span class="pop-x">x</span></div>' + '<div class="pop-content">' + '<div class="pop-text"><span>请输入 QQ 号,请输入 QQ 号请输入 QQ 号</span></div>' + '</div>' + '<div class="pop-btn-group hidden">' + '<button class="pop-cancel">取消</button>' + '<button class="pop-yes">确定</button>' + '</div>' + '</div>' + '</div>');
  },
  _hide: function() {
    return $('#popup').remove();
  },
  alert: function(message, title, callback) {
    return $.pop._show(message, title, 'alert', callback);
  },
  toast: function(message, title, callback) {}
};

$(function() {
  $('.pop-x, .pop-cancel').click(function() {
    $('.pop-cover').hide();
    return false;
  });
  return $('.pop-yes').click(function() {
    $('.pop-cover').hide();
    return true;
  });
});
