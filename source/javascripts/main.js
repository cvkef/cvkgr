var Application = {};

/*
    NProgress
*/
// NProgress Setup
// -------------------------
NProgress.configure(
  {
    showSpinner: false
  }
);


/*
    Application
*/
// Initialize
// -------------------------
Application.initialize = function ()
{
  console.log('[Application::initialize] Intializing Application');
}
// Fetch Page
// -------------------------
Application.fetchPage = function ()
{
  console.log('[Turbolinks] Fetching page...');
}
// Change Page
// -------------------------
Application.changePage = function ()
{
  console.log('[Turbolinks] Page changed!');
}
// DOM Ready
// -------------------------
$(document).ready(
  function ()
  {
    Application.initialize();
  }
);


// Turbolinks
// -------------------------
$(document)
  .on('page:load', Application.initialize)
  .on('page:fetch', Application.fetchPage)
  .on('page:change', Application.changePage);