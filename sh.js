const TAG = window.location.search.substring(1)
const INSTA_API = "https://api.instagram.com/v1/tags/"+TAG+"/media/recent"

var get_photos = function() {
  var promise = $.ajax({
    url: INSTA_API,
    dataType: "jsonp",
    data: {
      client_id: CLIENT_ID
    }
  });
  return promise;
}

var load_photos = function(promise) {
  promise.then(function(result) {
    var photo_array = result.data;
    var img_url, full;
    var $slideshow = $("#slideshow");
    // debugger;
    for (var i=0; i < photo_array.length; i++) {
      img_url = photo_array[i].images.standard_resolution.url;
      caption = photo_array[i].caption.text;
      full = "<img src="+img_url+">";
      $slideshow.append(full);
    }
    $('img:first-child').addClass('active');
  });
}

var switch_photo = function() {
  var $active = $('#slideshow img.active');
  var $next = $active.next();
  
  // check if we're at the end of the img elements
  if (!$next.length)
    $next = $('img:first-child').addClass('active');  
  
  $next.css({opacity: 0.0})
    .addClass('active')
    .animate({opacity:1.0}, 500, function() {
      $active.removeClass('active last-active');
    });
}

$(function() {
  promise = get_photos();
  load_photos(promise);
  setInterval("switch_photo()", 800);
});




