$(function() {
  $('.nav-span').click(function() {
    $('.nav-cover').toggleClass('show');
    $('.myorder-li-complete').toggleClass('complete-animate');
    $('.myorder-li-repeat').toggleClass('repeat-animate');
    $('.myorder-li-delete').toggleClass('delete-animate');
    return $('.myorder-li-loading').toggleClass('loading-animate');
  });
  $('.menu_option').css({
    'visibility': 'visible'
  });
});
