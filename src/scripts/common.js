/*=require ./includes/blocks/*.js*/

// DropDown
$('.DropDown_item').hover(function() {
  $(this).siblings().find('.DropDown_link').addClass('DropDown_link-color');
}, function() {
  $(this).siblings().find('.DropDown_link').removeClass('DropDown_link-color');
});

// Menu Hamburger
$('.MenuHamburger').click(function() {
	$(this).toggleClass('MenuHamburger-open');
	$(document.body).toggleClass('Overlay');
});

// Adaptive menu
var touch = $('.MenuHamburger');
var menu = $('.MobileNavigation');

$(touch).on('click', function(e) {
	e.preventDefault();
	menu.fadeToggle();
});

$(window).resize(function() {
	var wid = $(window).width();
	if (wid > 1023) {
		menu.removeAttr('style');
		touch.removeClass('MenuHamburger-open');
	};
});

$('.MobileNavigation_close').on('click', function(event) {
	$('.MobileNavigation').fadeOut();
	$('.MenuHamburger').removeClass('MenuHamburger-open');
	$(document.body).removeClass('Overlay');
	event.preventDefault();
});

window.pagePreloader = new Preloader("#pagePreloader");
window.pagePreloader.hide();

// Fixed mobile header top
var $headerTopSticky = $('.Header_top-sticky'),
		$headerLogo = $headerTopSticky.find('.Header_logo'),
		scrolled = $(window).scrollTop(),
		oldScrollY = 0;

if (scrolled > $headerTopSticky.height() + 20) {
	$headerTopSticky.addClass('Header_top-fixed');
	$headerLogo.addClass('Logo-headerFixed');
}

$(window).scroll(function(event) {
	scrolled = $(window).scrollTop();
	var dY = scrolled - oldScrollY;

	if (scrolled > $headerTopSticky.height() + 20) {
		$headerTopSticky.addClass('Header_top-fixed');
		$headerLogo.addClass('Logo-headerFixed');
		if ( dY > 0 ) {
			$headerTopSticky.addClass('Header_top-fixedTop');
		} else {
			$headerTopSticky.removeClass('Header_top-fixedTop');
		}
	} else {
		$headerTopSticky.removeClass('Header_top-fixed');
		$headerLogo.removeClass('Logo-headerFixed');
	}
	
	oldScrollY = scrolled;
});