// Area Information
$('.AreaInformation_arrowCircle').click(function(event) {
	var groupParent = $(this).parents('.AreaInformation_group-collapsible');
	var siblings = groupParent.siblings('.AreaInformation_group-collapsible');

	siblings.find('.AreaInformation_items').slideUp();
	siblings.find('.AreaInformation_arrowCircle').removeClass('ArrowCircle-active');

	groupParent.find('.AreaInformation_items').slideToggle();
	$(this).toggleClass('ArrowCircle-active');

	event.preventDefault();
});

$(window).resize(function(event) {
	$('.AreaInformation_items').removeAttr('style');
});

$('.Select').selectize({
  create: false,
  persist: false,
  maxItems: 1,

  openOnFocus: false,

  onInitialize: function () {
    var that = this;

    this.$control.on("click", function () {
      that.ignoreFocusOpen = true;
      setTimeout(function () {
          that.ignoreFocusOpen = false;
      }, 50);
    });
  },

  onFocus: function () {
    if (!this.ignoreFocusOpen) {
      this.open();
    }
  }
});

$(".Select .selectize-input input").attr('readonly', 'readonly');

// Yandex Map
ymaps.ready(init);
function init() {
  var coords = $('#map').data('coords');
  var placemarkTitle = $('#map').data('placemarkTitle');

  var myMap = new ymaps.Map("map", {
    center: coords,
    zoom: 13
  });

  var myPlacemark = new ymaps.Placemark(coords, {
    balloonContent: placemarkTitle
  }, {
    // Опции.
    // Необходимо указать данный тип макета.
    iconLayout: 'default#image',
    hideIconOnBalloonOpen: false,
    // Своё изображение иконки метки.
    iconImageHref: '/img/agriculture.svg',
    // Смещение левого верхнего угла иконки относительно
    // её "ножки" (точки привязки).
    iconImageOffset: [-5, -38],
    balloonOffset: [10, -35]
  });

  myMap.geoObjects.add(myPlacemark);

  myMap.setType('yandex#hybrid');

  myMap.controls.remove('geolocationControl');
  myMap.controls.remove('searchControl');
  myMap.controls.remove('trafficControl');
  myMap.controls.remove('typeSelector');
  myMap.controls.remove('fullscreenControl');
  myMap.controls.remove('rulerControl');
  myMap.behaviors.disable(['scrollZoom']);
}

// Toggle map overlay
$('.MapSection_overlayToggle').click(function(event) {
  var mapSection = $(this).parents('.MapSection');
  
  mapSection.find('.MapSection_overlayToggle').toggleClass('MapSection_overlayToggle-close');
  mapSection.find('.MapSection_overlay').fadeToggle();
});

// Object photos slider
var swiperObjectPhotos = new Swiper ('.Swiper-objectPhotos', {
	loop: true,
  spaceBetween: 12,
  slidesPerView: 'auto',
  breakpointsInverse: true,

  navigation: {
    nextEl: '.Swiper-objectPhotos .Swiper_next',
    prevEl: '.Swiper-objectPhotos .Swiper_prev',
  },

  pagination: {
    el: '.Swiper-objectPhotos .Swiper_pagination',
    clickable: true,
    bulletClass: 'Swiper_paginationItem',
    bulletActiveClass: 'Swiper_paginationItem-active',
  }
});

// Fancybox
$('.Swiper-objectPhotos .Swiper_slide').fancybox({
	buttons: [
    "close"
  ],
  loop: true
});

var formGetBetterConditions = new InteractiveForm('.Form-getBetterConditions');
var formSendByEmail = new InteractiveForm('.Form-sendByEmail');