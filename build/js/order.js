$(function($) {
  var changeTagLiStyle, initInput;
  initInput = function() {
    return $('.yy-textarea-placeholder').hide();
  };
  changeTagLiStyle = function($that) {
    if ($that.hasClass('added')) {
      $that.removeClass('added');
      return $that.find('.order-ico').addClass('order-jia').removeClass('order-dui1');
    } else {
      $that.addClass('added');
      return $that.find('.order-ico').removeClass('order-jia').addClass('order-dui1');
    }
  };
  $('#yy-tags').tagsInput({
    defaultText: '',
    width: '100%',
    height: '220px',
    onAddTag: function(tag) {
      return $('.yy-customer-tags li').each(function() {
        if ($(this).text() === tag) {
          return changeTagLiStyle($(this));
        }
      });
    },
    onRemoveTag: function(tag) {
      return $('.yy-customer-tags li').each(function() {
        if ($(this).text() === tag) {
          return changeTagLiStyle($(this));
        }
      });
    },
    onChange: function(tag) {
      return initInput();
    }
  });
  $('.yy-customer-form').delegate('.yy-customer-tags li, #yy-tags_tagsinput span.tag', 'click', function() {
    var $that;
    $that = $(this);
    if ($('#yy-tags').tagExist($that.text())) {
      return $('#yy-tags').removeTag($that.text());
    } else {
      return $('#yy-tags').addTag($that.text());
    }
  });
  $('.yy-customer-form').delegate('#yy-tags_tagsinput, #yy-tags_addTag', 'click', function() {
    return initInput();
  });
  $('.yy-customer-form').delegate('#yy-tags_tag', 'focus', function() {
    return $('#yy-tags_tag').css({
      border: '1px dashed #777'
    });
  });
  $('.yy-customer-form').delegate('#yy-tags_tag', 'blur', function() {
    $('#yy-tags_tag').css({
      border: '0px dashed #777'
    });
    if ($('span.tag').length === 0) {
      return $('.yy-textarea-placeholder').show();
    }
  });
  $('.input-item-check').click(function() {
    return $(this).siblings('.icon').toggleClass('order-not-circle-yes');
  });
  $('#submit-notorder').click(function() {
    var count;
    count = 0;
    $('.input-item').find(':checkbox').each(function() {
      if ($(this).is(':checked')) {
        return count++;
      }
    });
    if (count === 0 && $.trim($('.other-reason').val()) === '') {
      alert('原因不能为空～');
    }
  });
  if ($('.long-text').text().length <= 22) {
    $('.long-point').hide();
  }
});
