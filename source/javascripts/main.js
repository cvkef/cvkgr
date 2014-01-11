var Application = {};

/*
    Application
*/
// Initialize
Application.initialize = function ()
{
  console.log('[Application::initialize] Intializing Application');
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