var Application = {};


// Application :: Fetch Page
// -------------------------
Application.fetchPage = function ()
{
  console.log('[Turbolinks] Fetching page...');
}

// Application :: Change Page
// -------------------------
Application.changePage = function ()
{
  console.log('[Turbolinks] Page changed!');
}

// Application :: Initialize
// -------------------------
Application.initialize = function ()
{
  console.log('[Application::initialize] Intializing Application');
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