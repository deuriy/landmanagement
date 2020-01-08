var swiperBuildingTypes = new Swiper ('.Swiper-buildingTypes', {
  loop: true,
  breakpointsInverse: true,
  breakpoints: {
    768: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 4,
      allowTouchMove: false
    }
  },

  navigation: {
    nextEl: '.SwiperAll-buildingTypes .SwiperAll_next',
    prevEl: '.SwiperAll-buildingTypes .SwiperAll_prev',
  },

  pagination: {
    el: '.Swiper-buildingTypes .Swiper_pagination',
    clickable: true,
    bulletClass: 'Swiper_paginationItem',
    bulletActiveClass: 'Swiper_paginationItem-active',
  }
});

var swiperAdvantages = new Swiper ('.Swiper-advantages', {
  loop: true,
  breakpointsInverse: true,
  breakpoints: {
    768: {
      slidesPerView: 3
    },
    1024: {
      slidesPerView: 4
    },
    1280: {
      slidesPerView: 5,
      allowTouchMove: false
    }
  },

  navigation: {
    nextEl: '.Swiper-advantages .Swiper_next',
    prevEl: '.Swiper-advantages .Swiper_prev',
  },

  pagination: {
    el: '.Swiper-advantages .Swiper_pagination',
    clickable: true,
    bulletClass: 'Swiper_paginationItem',
    bulletActiveClass: 'Swiper_paginationItem-active',
  }
});

// Offer block slider
var swiperOfferBlock = new Swiper ('.Swiper-offerBlock', {
  // loop: true,
  slideNextClass: 'Swiper_slide-next',
  slideActiveClass: 'Swiper_slide-active',
  breakpointsInverse: true,
  breakpoints: {
    320: {
      slidesPerView: 'auto'
    },
    1280: {
      slidesPerView: 3,
    }
  },

  navigation: {
    nextEl: '.SwiperAll-offerBlock .SwiperAll_next',
    prevEl: '.SwiperAll-offerBlock .SwiperAll_prev',
  },

  pagination: {
    el: '.Swiper-offerBlock .Swiper_pagination',
    clickable: true,
    bulletClass: 'Swiper_paginationItem',
    bulletActiveClass: 'Swiper_paginationItem-active',
  }
});

// Yandex Map
ymaps.ready(init);
function init() {
  var myMap = new ymaps.Map("map", {
    center: [55.7798, 37.2328],
    zoom: 16
  });

  myMap.geoObjects.add(new ymaps.Placemark([55.7804, 37.2328], {
    balloonContent: '143421, Московская область, Красногорский район, 9 км Ново-Рижского шоссе, БЦ «RigaLand», стр. 3, подъезд 1',
    iconCaption: 'Riga Land'
  }, {
    preset: 'islands#redDotIcon'
  }));

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
  mapSection.find('.MapSection_overlay, .MapSection_contactsBlock').fadeToggle();
});

// Fancybox
$('.PopupSendMessageLink').fancybox({
  touch: false,
  slideClass: "FancyboxSlide FancyboxSlide-sendMessage FancyboxSlide-html",
  baseTpl:
    '<div class="fancybox-container" role="dialog" tabindex="-1">' +
    '<div class="fancybox-bg FancyboxBg"></div>' +
    '<div class="fancybox-inner">' +
    '<div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div>' +
    '<div class="fancybox-toolbar">{{buttons}}</div>' +
    '<div class="fancybox-navigation">{{arrows}}</div>' +
    '<div class="fancybox-stage"></div>' +
    '<div class="fancybox-caption"></div>' +
    "</div>" +
    "</div>",
  btnTpl: {
    smallBtn:
      '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small FancyboxButton" title="{{CLOSE}}">' +
      '<svg class="SvgIco" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><g class="SvgIco_fillGroup" fill="#FFF"><rect width="22" height="2" x="-2" y="8" rx="1" transform="rotate(-45 9 9)"/><rect width="22" height="2" x="-2" y="8" rx="1" transform="rotate(45 9 9)"/></g></svg>' +
      "</button>"
  },
  lang: "ru",
  i18n: {
    ru: {
      CLOSE: "Закрыть"
    }
  },
  afterLoad: function (instance, current) {
    $('.Wrapper').addClass('Blur');
  },
  beforeClose: function (instance, current) {
    $('.Wrapper').removeClass('Blur');
  }
});

// File upload
$(".FileUpload_input").change(function() {
  var fileUpload = $(this).parents('.FileUpload');
  var filename = $(this).val().replace(/.*\\/, "");

  if (filename.length > 30) {
    filename = filename.substring(0, 30) + '...';
  }

  fileUpload.find('.FileUpload_filename').text(filename);
  if(fileUpload.find('.FileUpload_filename').text().length) {
    fileUpload.find('.FileUpload_delete').show();
    fileUpload.find('.FileUpload_labelText').hide();
  }
});

$('.FileUpload_delete').click(function(event) {
  var fileUpload = $(this).parents('.FileUpload');

  fileUpload.find('.FileUpload_labelText').show();
  fileUpload.find('.FileUpload_delete').hide();
  fileUpload.find('.FileUpload_filename').text('');
  fileUpload.find('.FileUpload_input').val('');
  event.preventDefault();
});

var formSendMessage = new InteractiveForm('.Form-sendMessage');