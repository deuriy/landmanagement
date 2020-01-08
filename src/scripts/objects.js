// Selectize
$('.SelectSearch').selectize({
	placeholder: "Начните вводить текст",
  readOnly: true,

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

// Range sliders
$("#LandArea").slider({
  range: true,
  min: 12,
  max: 10000,
  values: [ 12, 7700 ],
  classes: {
    "ui-slider-handle": "RangeSlider_handle",
    "ui-slider-range": "RangeSlider_range"
  },
  slide: function( event, ui ) {
    $('#LandAreaMin').text(ui.values[0] + " сот.");
    $('#LandAreaMax').text(ui.values[1] / 100 + " Га");
  }
});

$("#AreaCost").slider({
  range: true,
  min: 240000,
  max: 2000000000,
  values: [ 240000, 2000000000 ],
  classes: {
    "ui-slider-handle": "RangeSlider_handle",
    "ui-slider-range": "RangeSlider_range"
  },
  slide: function( event, ui ) {
    $('#AreaCostMin').text(ui.values[0].toLocaleString());
    $('#AreaCostMax').text(ui.values[1].toLocaleString());
  }
});

// Object display type
$('.ObjectDisplayType_label').click(function(event) {
  var labelId = $(this).attr('id'),
			searchResultsMap = $(this).parents('.SearchResults').find('.SearchResults_map'),
			searchResultsList = $(this).parents('.SearchResults').find('.SearchResults_list');

  $(this).siblings('.ObjectDisplayType_label').removeClass('ObjectDisplayType_label-active');
  $(this).addClass('ObjectDisplayType_label-active');

  if (labelId == 'ObjectDisplayAsList') {
    $('.ObjectDisplayType_switch').prop('checked', false);
    searchResultsMap.fadeOut();
  	searchResultsList.fadeIn();
  } else if (labelId == 'ObjectDisplayOnMap') {
    $('.ObjectDisplayType_switch').prop('checked', true);
    searchResultsMap.fadeIn();
  	searchResultsList.fadeOut();
  }

  event.preventDefault();
});

$('.ObjectDisplayType_switch').click(function(event) {
	var searchResultsMap = $(this).parents('.SearchResults').find('.SearchResults_map'),
			searchResultsList = $(this).parents('.SearchResults').find('.SearchResults_list');

  $(this).siblings('.ObjectDisplayType_label').toggleClass('ObjectDisplayType_label-active');

  if ($(this).siblings('.ObjectDisplayType_label-active').attr('id') == 'ObjectDisplayAsList') {
  	searchResultsMap.fadeOut();
  	searchResultsList.fadeIn();
  } else {
  	searchResultsMap.fadeIn();
  	searchResultsList.fadeOut();
  }
});

$('.ShowOnMap').click(function(event) {
  var searchResultsMap = $(this).parents('.SearchResults').find('.SearchResults_map'),
      searchResultsList = $(this).parents('.SearchResults').find('.SearchResults_list');

  $('.ObjectDisplayType_switch').prop('checked', true);
  $('.ObjectDisplayType_switch').siblings('.ObjectDisplayType_label').toggleClass('ObjectDisplayType_label-active');
  
  searchResultsMap.fadeIn();
  searchResultsList.fadeOut();
  event.preventDefault();
});

// Yandex Map
ymaps.ready(init);
function init() {
  var myMap = new ymaps.Map("map", {
    center: [55.7780, 37.2328],
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
  mapSection.find('.MapSection_overlay').fadeToggle();
});

// Sorting objects
$('.SortingObjects_link').click(function(event) {
	$(this).parent().toggleClass('SortingObjects_item-active');
	event.preventDefault();
});

// Fancybox
$('.PopupBetterConditionsLink').fancybox({
  touch: false,
  slideClass: "FancyboxSlide FancyboxSlide-html",
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
    // This small close button will be appended to your html/inline/ajax content by default,
    // if "smallBtn" option is not set to false
    smallBtn:
      '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small FancyboxButton" title="{{CLOSE}}">' +
      '<svg class="SvgIco" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><g class="SvgIco_path" fill="#FFF"><rect width="22" height="2" x="-2" y="8" rx="1" transform="rotate(-45 9 9)"/><rect width="22" height="2" x="-2" y="8" rx="1" transform="rotate(45 9 9)"/></g></svg>' +
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

var formGetBetterConditions = new InteractiveForm('.Form-getBetterConditions');