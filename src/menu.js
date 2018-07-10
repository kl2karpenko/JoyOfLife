jQuery(function () {
  jQuery(document).on('click', '#menuOpen', function () {
    "use strict";
    jQuery('.navbar-collapse').toggleClass('opened');
    jQuery('body').toggleClass('opened-menu');
  });

  jQuery('body.opened-menu').on('click', function () {
    "use strict";
    jQuery('.navbar-collapse').toggleClass('opened');
    jQuery('body').toggleClass('opened-menu');
  });

  jQuery('body').on('click', '#menuClose', function () {
    "use strict";
    jQuery('.navbar-collapse').removeClass('opened');
    jQuery('body').removeClass('opened-menu');
  });
});