// Accordion
$('.Accordion_arrowCircle').click(function(event) {
	var parent = $(this).parents('.Accordion');
	parent.siblings('.Accordion').find('.Accordion_body').slideUp();
	parent.siblings('.Accordion').find('.Accordion_arrowCircle').removeClass('ArrowCircle-active');
	$(this).toggleClass('ArrowCircle-active').parents('.Accordion').find('.Accordion_body').slideToggle();
	event.preventDefault();
});