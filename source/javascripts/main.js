var Application = {};

/*
    Application
*/
// Initialize
Application.initialize = function ()
{
  console.log('[Application::initialize] Intializing Application');

  $(document).prepareQrcode();
}
// Fetch Page
Application.fetchPage = function ()
{
  console.log('[Turbolinks] Fetching page...');
  NProgress.start();
}
// Change Page
Application.changePage = function ()
{
  console.log('[Turbolinks] Page changed!');
  NProgress.done();
}
// Restore Page
Application.restorePage = function ()
{
  console.log('[Turbolinks] Page restored!');
  NProgress.remove();
}


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


/*
    Turbolinks
*/
$(document)
  .on('page:load', Application.initialize)
  .on('page:fetch', Application.fetchPage)
  .on('page:change', Application.changePage)
  .on('page:restore', Application.restorePage);

/*
    NProgress
*/
NProgress.configure(
  {
    showSpinner: false
  }
);