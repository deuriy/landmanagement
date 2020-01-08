// Tabs
$('.Tabs_list').each(function() {
  $(this).find('.Tabs_item').each(function(i) {
    $(this).click(function() {
      var parent = $(this).parents('.Tabs'),
      		underline = parent.find('.Tabs_underline'),
      		siblings = $(this).prevAll(),
      		activeItemWidth = $(this).width(),
      		distance = 0;

      $(this).addClass('Tabs_item-active').siblings().removeClass('Tabs_item-active');
      parent.find('.Tabs_content').fadeOut();
      parent.find('.Tabs_content:eq(' + i + ')').fadeIn();

      siblings.each(function(index, el) {
      	distance += $(this).width() + parseInt($(this).css('marginRight'));
      });

      underline.css({
      	width: activeItemWidth + 'px',
      	left: distance + 'px'
      });

      event.preventDefault();
    });
  });
});