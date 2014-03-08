// fix middleman removing http
$(document).ready(
  function ()
  {
    var http, $fb;

    $fb = $('.fb-like');
    http = $fb.data('href');

    if ( http.indexOf('http:') === -1 )
    {
      $fb.attr('data-href', 'http:' + http);
    }
  }
);
(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=1396010247318816";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));