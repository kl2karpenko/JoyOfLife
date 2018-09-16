$(function () {
  function showFixed() {
    $('.signup.fixed').fadeIn(500);
    $('body').addClass('signup-show');
  }

  function hideFixed() {
    $('.signup.fixed').fadeOut(500);
    $('body').removeClass('signup-show');
  }

  setTimeout(showFixed, 2000);

  $('#mc_embed_signup > form').on('submit', function (e) {
    if (!$('#mc_embed_signup > form .mce_inline_error:visible').length) {
      /* if submit good */
      hideFixed();
    }
  });

  $('body').on('click', '#mc_embed_signup-close', hideFixed);
  $('body').on('click', "[data-show='mc_embed_signup_show']", showFixed);
});