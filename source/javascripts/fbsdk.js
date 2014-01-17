// fix middleman removing http
$(document).ready(
  function ()
  {
    var $fb = $('.fb-like');
    $('.fb-like').attr('data-href', 'http:' + $fb.data('href'));
  }
);
(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=1396010247318816";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));