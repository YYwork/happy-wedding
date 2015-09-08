'use strict';

$.pop =

  _show: (type, message, title, callback)->
    $('body').append(
      '<div id="popup" class="pop-cover">'\
      +'<div class="pop-windows">'\
      +'<div class="pop-title hidden"><span class="pop-x">x</span></div>'\
      +'<div class="pop-content">'\
      +'<div class="pop-text"><span>请输入 QQ 号,请输入 QQ 号请输入 QQ 号</span></div>'\
      +'</div>'\
      +'<div class="pop-btn-group hidden">'\
      +'<button class="pop-cancel">取消</button>'\
      +'<button class="pop-yes">确定</button>'\
      +'</div>'\
      +'</div>'\
      +'</div>');

  _hide: () ->
    $('#popup').remove();

  alert: (message, title, callback)->
    $.pop._show(message, title, 'alert', callback)

  toast: (message, title, callback)->

$ ()->
  $('.pop-x, .pop-cancel').click ()->
    $('.pop-cover').hide();
    return false;

  $('.pop-yes').click ()->
    $('.pop-cover').hide();
    return true;