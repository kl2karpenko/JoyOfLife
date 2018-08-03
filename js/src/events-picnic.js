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

  $('#mc-embedded-subscribe').on('click', function (e) {
    $(this).data('click', true);
    $('#mc-embedded-subscribe-2').data('click', false);
  });

  $('#mc-embedded-subscribe-2').on('click', function (e) {
    $(this).data('click', true);
    $('#mc-embedded-subscribe').data('click', false);
  });

  $('#call').click(function(){
    var name = $('#name').val();
    var phone = $('#phone').val();

    //Если поля заполнены, то отправляем данные
    if(name != '' && phone != '') {
      $.post("../../callback.php",{
        name: name,
        phone: phone
      },function success(data){
        alert('Мы скоро с вами свяжемся!');
        $('#subscribe-call').trigger('reset');
      });

      $('#subscribe-call').trigger('reset');

    } else {
      alert('Пожалуйста заполните все поля формы =)');
    }

  });

  $('#buyModal').on('hide.bs.modal', function (e) {
    console.log("hide");
    $("#mc_embed_signup > form").trigger('reset');
  });

  $('#mc_embed_signup > form').on('submit', function (e) {
    if (!$('#mc_embed_signup > form .mce_inline_error:visible').length) {

      fbq('track', 'CompleteRegistration', {
        value: 'facebook'
      });
      /* DOnt redirect to payment
       * =================== */
      if ($('#mc-embedded-subscribe').data('click')) {
        setTimeout(function () {
          $('#buyModal').modal('hide');
          $("#mc_embed_signup > form").trigger('reset');
          $('#alreadyBought').modal('show');
        }, 500);
      } else if ($('#mc-embedded-subscribe-2').data('click')) {
        if ($('#mce-TIC_TYPE').val() === "2") {
          /*  redirect to 2 tickets buy */
          setTimeout(function () {
            // 2 tickets
            $("#mc_embed_signup > form").trigger('reset');
            location.assign('https://secure.wayforpay.com/button/b21cd312ca428');
          }, 200);
        } else {
          /*  redirect to 1 ticket buy */
          setTimeout(function () {
            // 1 ticket
            $("#mc_embed_signup > form").trigger('reset');
            location.assign('https://secure.wayforpay.com/button/b3cf5d6e8007d');
          }, 200);
        }
      }
    } else {
      $("#mc_embed_signup > form").trigger('reset');
      alert('Поля были заполнены неправильно, пожалуйста проверьте правильность почты и телефонного номера!')
    }
  });
});