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