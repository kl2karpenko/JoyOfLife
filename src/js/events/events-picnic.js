$(function () {
  $('.gender').on('click', function () {
    var gender = $(this).attr('id');

    if (gender === 'female') {
      $('#mce-GENDER-1').attr('checked', true);
      $('body').addClass('female');
    } else {
      $('#mce-GENDER-0').attr('checked', true);
      $('body').addClass('male');
    }

    $('#choose-gender').hide();
    $(window).scrollTop(0);
  });

  $('#buyModal').on('show.bs.modal', function (e) {
    var typeTicket = $(e.relatedTarget).attr('id');

    if (typeTicket === 'buy2') {
      $('#mce-TIC_TYPE').val("2");
    } else {
      $('#mce-TIC_TYPE').val("1");
    }
  });

  $('[data-click-listen]').on('click', function (e) {
    $('[data-click-listen]').data('click', false);
    $(this).data('click', true);
  });

  $('#buyModal').on('hide.bs.modal', function (e) {
    $("#mc_embed_signup > form").trigger('reset');
  });

  $('#mc_embed_signup > form').on('submit', function (e) {
    if (!$('#mc_embed_signup > form .mce_inline_error:visible').length) {
      fbq('track', 'CompleteRegistration', {
        value: 'facebook'
      });
    } else {
      $("#mc_embed_signup > form").trigger('reset');
      alert('Поля были заполнены неправильно, пожалуйста проверьте правильность почты и телефонного номера!')
    }
  });

  $('#mc_embed_signup_2 > form').on('submit', function (e) {
    if (!$('#mc_embed_signup > form .mce_inline_error:visible').length) {

      fbq('track', 'CompleteRegistration', {
        value: 'facebook'
      });

      var coupon = $('#coupon').val().trim();

      /* DOnt redirect to payment
       * =================== */
      if ($('#mc-embedded-subscribe-call').data('click')) {
        setTimeout(function () {
          $('#buyModal').modal('hide');
          $("#mc_embed_signup > form").trigger('reset');
          $('#alreadyBought').modal('show');
        }, 500);
      } else if ($('#mc-embedded-subscribe').data('click')) {
        if ($('#mce-TIC_TYPE').val() === "2") {
          /*  redirect to 2 tickets buy */
          setTimeout(function () {
            // 2 tickets

            $("#mc_embed_signup > form").trigger('reset');
            if (coupon && coupon.indexOf("loveTerraceEdition") !== -1) {
              // redirect to page with discount
              location.assign('https://secure.wayforpay.com/button/b5c2cce33140d');
            } else {
              location.assign('https://secure.wayforpay.com/button/b3cf5d6e8007d');
            }
          }, 200);
        } else {
          /*  redirect to 1 ticket buy */
          setTimeout(function () {
            // 1 ticket
            $("#mc_embed_signup > form").trigger('reset');

            if (coupon && coupon.indexOf("loveTerraceEdition") !== -1) {
              // redirect to page with discount
              location.assign('https://secure.wayforpay.com/button/b7c351b957d9f');
            } else {
              location.assign('https://secure.wayforpay.com/button/be474e83702b6');
            }
          }, 200);
        }
      }
    } else {
      $("#mc_embed_signup > form").trigger('reset');
      alert('Поля были заполнены неправильно, пожалуйста проверьте правильность почты и телефонного номера!')
    }
  });
});