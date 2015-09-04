var log;

log = function(a) {
  return console.log(a);
};

$(function() {
  $('.input-btn').click(function() {
    return $('.pop-windows').show();
  });
  $('.pop-x').click(function() {
    return $('.pop-windows').hide();
  });
  $('.btn-ico').click(function() {
    $('.detail-description').toggleClass('detail-pack-up');
    return $('.btn-ico').toggleClass('card-down');
  });
  $('.use-btn').click(function() {
    return $('.pop-windows').show();
  });
  $('.btn-no').click(function() {
    return $('.pop-windows').hide();
  });
  return $('.btn-yes').click(function() {
    log('确认消券');
    return $('.pop-windows').hide();
  });
});
