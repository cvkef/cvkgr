var Application = {};

/*
    Application
*/
// Initialize
Application.initialize = function ()
{
  $(document).prepareQrcode();

  // Contact Initialization
  if ( $('body').is('.contact') )
  {
    $(document).initializeForm();
  }

};


/*
    Contact Form
*/

// initialize form
$.fn.initializeForm = function ()
{
  var $contactForm;

  $contactForm = $('#contact-form');
  $contactForm.resetForm()
              .on('change.cvk.ContactForm', '.form-control.required',
                function (e)
                {
                  return $(this).isValid();
                }
              )
              .on('submit.cvk.ContactForm',
                function (e)
                {
                  e.preventDefault();
                  $contactForm.validateForm();
                }
              );

};

// reset form
$.fn.resetForm = function ()
{
  var $form = $(this);

  $(this).find('.form-group').removeClass('has-error');
  $form.buttonState('reset');

  return $(this);
};

// scroll to first error
$.fn.scrollToError = function ()
{
  var $first = $('.has-error:first');
  var offset = ($first.length > 0) ? ($first.offset().top - 10) : 0;
  $('html, body').animate(
    {
      scrollTop: offset
    }, 350,
    function ()
    {
      $first.find('.form-control:first').focus();
    }
  );

  return $(this);
}

// submit button state
$.fn.buttonState = function (state)
{
  var $form, $submitBtn, html, spinner;

  $form = $(this);
  $submitBtn = $form.find('#contact-submit-btn');

  spinner = '<i class="fa fa-spinner fa-spin inline"></i>';

  switch (state)
  {
    case 'sending':
      $submitBtn.blur()
                 .html( spinner + $submitBtn.data(state) )
                 .attr('disabled', true)
                 .prop('disabled', true);
      break;

    case 'reset':
    default:
      $submitBtn.blur()
                 .html( $submitBtn.data(state) )
                 .removeAttr('disabled')
                 .removeProp('disabled');
      break;
  }

  return $(this);
};

// validate email address
$.fn.isValidEmail = function ()
{
  var email = $(this).val();

  return RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i).test(email);
}

// validate form field
$.fn.isValid = function ()
{
  var $formGroup, $field, val;

  $field = $(this);
  $formGroup = $field.closest('.form-group');
  val = $field.val();

  if (  ( val.length === 0 )
        || ( $field.is('.text') && ( val.length < 2 ) )
        || ( $field.is('.fulltext') && ( val.length < 2 ) )
        || ( $field.is('.email') && !$field.isValidEmail() )
     )
  {
    $formGroup.addClass('has-error')
              .find('.help-block').removeClass('hidden').fadeIn(250);

    return false;
  }

  $formGroup.removeClass('has-error')
            .find('.help-block').fadeOut(250);

  return true;
};

// validate form
$.fn.validateForm = function ()
{
  var $form, $formGroup, $submitBtn, errors = 0;

  $form = $(this);

  $form.buttonState('sending')
        .find('.form-control.required').each(
          function (index, field)
          {
            if ( !$(field).isValid() ) errors++;
          }
        );

  ( errors > 0 ) ? $form.delay(250).scrollToError().buttonState('reset') : $form.submitForm()

  return $(this);
};

// submit form
$.fn.submitForm = function ()
{
  var $form, $formData, url;

  $form = $(this);
  $formData = $form.serialize();
  url = $form.attr('action');

  $.ajax(
      {
        url:    url,
        data:   $formData,
        method: 'post',
        crossDomain: true
      }
    )
    .done(
      function (data, textStatus, jqXHR)
      {
        console.log(data);
      }
    )
    .fail(
      function (jqXHR, textStatus, errorThrown)
      {
        console.log(errorThrown);
      }
    )
    .always(
      function (data, textStatus, jqXHR)
      {
        console.log('always', data);
        $form.buttonState('reset');
      }
    );
};


/*
    QRCode
*/
$.fn.prepareQrcode = function ()
{
  var $qrcode, $qrcodeBtn, $qrcodeCloseBtn, $qrcodeOverlay;

  $qrcode = $('#qrcode');
  $qrcodeBtn = $qrcode.find('#qrcode-btn');
  $qrcodeCloseBtn = $qrcode.find('.qrcode-close-btn');
  $qrcodeOverlay = $qrcode.find('#qrcode-overlay');

  $qrcodeBtn.on('click.cvk.qrcode',
    function (e)
    {
      e.preventDefault();
      $qrcodeOverlay.fadeIn(250);
    }
  );

  $qrcodeCloseBtn.on('click.cvk.qrcodeClose',
    function (e)
    {
      e.preventDefault();
      $qrcodeOverlay.fadeOut(250);
    }
  );
};


/*
    DOM Ready
*/
$(document).ready(
  function ()
  {
    Application.initialize();
  }
);