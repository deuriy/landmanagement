// breakpoint where swiper will be destroyed
// and switches to a dual-column layout
// const breakpoint = window.matchMedia( '(min-width: 1024px)' );

// // keep track of swiper instances to destroy later
// let swiperActivities;

// const breakpointChecker = function() {
//   // if larger viewport and multi-row layout needed
//   if ( breakpoint.matches === true ) {
//     // clean up old instances and inline styles when available
//     $.each(swiperActivities, function(index, val) {
//       if ( val !== undefined ) val.destroy( true, true );
//     });
//     // or/and do nothing
//     return;
//   // else if a small viewport and single column layout needed
//   } else if ( breakpoint.matches === false ) {
//     // fire small viewport version of swiper
//     return enableSwipers();
//   }
// };

// const enableSwipers = function() {
//   swiperActivities = new Swiper ('.Swiper-activities', {
//     loop: true,
//     breakpointsInverse: true,
//     breakpoints: {
//       768: {
//         slidesPerView: 2
//       },
//       1024: {
//         slidesPerView: 5
//       },
//     },

//     navigation: {
//       nextEl: '.Swiper-activities .Swiper_next',
//       prevEl: '.Swiper-activities .Swiper_prev',
//     }
//   });
// };

// // keep an eye on viewport size changes
// breakpoint.addListener(breakpointChecker);

// // kickstart
// breakpointChecker();

var swiperActivities = new Swiper ('.Swiper-activities', {
  breakpointsInverse: true,
  breakpoints: {
    768: {
      slidesPerView: 2
    },
    1024: {
      allowTouchMove: false,
      slidesPerColumn: 2,
      slidesPerColumnFill: 'row',
      slidesPerView: 3
    },
  },

  navigation: {
    nextEl: '.Swiper-activities .Swiper_next',
    prevEl: '.Swiper-activities .Swiper_prev',
  }
});

var swiperKeyBenefits = new Swiper ('.Swiper-keyBenefits', {
  loop: true,

  navigation: {
    nextEl: '.Swiper-keyBenefits .Swiper_next',
    prevEl: '.Swiper-keyBenefits .Swiper_prev',
  },

  pagination: {
    el: '.Swiper-keyBenefits .Swiper_pagination',
    clickable: true,
    bulletClass: 'Swiper_paginationItem',
    bulletActiveClass: 'Swiper_paginationItem-active',
  }
});

// Partners
var originalTextArr = [], trimmedTextArr = [];
$('.Partner_description').each(function(index, el) {
  originalTextArr.push(el.textContent);
  trimmedTextArr.push(el.textContent.slice(0, 91).trim().concat(' ...'));
});

$('.Partner_moreText').click(function(event) {
  var partnerIndex = $(this).parents('.Partner').index();
  if ($(this).hasClass('Partner_moreText-active')) {
    $(this).removeClass('Partner_moreText-active').parents('.Partner').find('.Partner_description').text(trimmedTextArr[partnerIndex]);
  } else {
    $(this).addClass('Partner_moreText-active').parents('.Partner').find('.Partner_description').text(originalTextArr[partnerIndex]);
  }
 
  event.preventDefault();
});

function trimPartnerDescription () {
  var wid = $(window).width();

  if (wid < 1023) {
    $('.Partner_description').each(function(index, el) {
      el.textContent = trimmedTextArr[index];
    });
  } else {
    $('.Partner_description').each(function(index, el) {
      el.textContent = originalTextArr[index];
    });
  }
}

trimPartnerDescription();
$(window).resize(function() {
  trimPartnerDescription()
});