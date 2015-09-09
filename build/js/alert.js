'use strict';
$.pop = {
  _show: function(message, title, type, callback) {
    var toastRemove;
    $('body').append('<div id="popup" class="pop-cover">' + '  <div class="pop-windows">' + '    <span class="pop-x">x</span>' + '    <div class="pop-title">' + '      <span class="pop-title-text">' + title + '</span>' + '    </div>' + '    <div class="pop-content">' + '      <div class="pop-text">' + '          <span>' + message + '</span>' + '      </div>' + '    </div>' + '    <div class="pop-btn-group">' + '      <button class="pop-cancel">取消</button>' + '      <button class="pop-yes">确定</button>' + '    </div>' + '  </div>' + '</div>');
    switch (type) {
      case 'alert':
        $('.pop-yes').click(function() {
          $.pop._hide();
          return callback(true);
        });
        return $('.pop-x').click(function() {
          $.pop._hide();
          if (callback) {
            return callback(null);
          }
        });
      case 'confirm':
        $('.pop-yes').click(function() {
          $.pop._hide();
          return callback(true);
        });
        return $('.pop-x, .pop-cancel').click(function() {
          $.pop._hide();
          if (callback) {
            return callback(null);
          }
        });
      case 'toast':
        return toastRemove = setInterval(function() {
          $('#popup').remove();
          return clearInterval(toastRemove);
        }, 1000);
      case 'form':
        return $('.pop-text').addClass('pop-form-text').append(message);
    }
  },
  _hide: function() {
    return $('#popup').remove();
  },
  confirm: function(message, title, callback) {
    $.pop._show(message, title, 'confirm', callback);
    if (title === void 0 || title === null || (title = '')) {
      console.log(title);
      return $('.pop-title').remove();
    }
  },
  alert: function(message, title, callback) {
    $.pop._show(message, title, 'alert', callback);
    $('.pop-title, .pop-cancel').addClass('hidden');
    return $('.pop-yes').addClass('pop-yes-line');
  },
  toast: function(message, title, callback) {
    $.pop._show(message, null, 'toast', callback);
    $('.pop-title, .pop-btn-group, .pop-x').remove();
    return $('#popup').addClass('pop-toast');
  },
  form: function(form, title, callback) {
    $.pop._show(form, title, 'form', callback);
    $('.pop-cancel, .pop-text span').remove();
    return $('.pop-yes').addClass('pop-yes-line');
  }
};

$(function() {
  var form;
  form = '<div><label>手机号：</label><input type="text" placeholder="请输入手机号！"/></div>';
  form += '<div><label>密码：</label><input type="text" placeholder="请输入手机号！"/></div>';
  return $.pop.form(form, '注册', 'form');
});
