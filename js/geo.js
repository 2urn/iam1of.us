// Big thanks to Jason Connell who did the heavy lifting here to reverse geocode for zip: http://jasontconnell.com/comment/reverse-geocoding-in-javascript

function init() {
  if (navigator.geolocation && typeof (navigator.geolocation.getCurrentPosition) == "function") {
    navigator.geolocation.getCurrentPosition(geoCodeCallback);
  }
}

function geoCodeCallback(position) {
  var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  var coder = new google.maps.Geocoder();
  coder.geocode({ 'latLng': latLng }, showLocaleCallback);
}

function showLocaleCallback(results, status) {
  if (status == google.maps.GeocoderStatus.OK) {
    var zip = "";
    var res = results[0];
    for (var i = 0; i < res.address_components.length; i++) {
      if (res.address_components[i].types[0] == "postal_code") {
        zip = res.address_components[i].short_name;
      }
      if (res.address_components[i].types[0] == "administrative_area_level_1") {
        state = res.address_components[i].long_name;
      }
    }

    $('#zipCode').val(zip);

    var $userState = state;
    $("#state option").filter(function() {
        return $(this).text() === state; 
    }).prop('selected', true);

  }
}

$(document).ready(init);