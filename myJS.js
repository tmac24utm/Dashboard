'use strict';

function checkElementExists(elem){
    var elem = document.querySelector(elem);
    if(elem == null){
        return false;
    } else return true;
}

function changeDateTime(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    if(m<10){
        m='0'+m
    }

    if(s<10){
        s='0'+s
    }

    
    if(localStorage.getItem("clockSettings") == "12H"){
        var h = today.getHours() % 12 || 12;
    }

    today = dd+'/'+mm+'/'+yyyy+' '+h+':'+m+':'+s;
    if(checkElementExists('#dateTime')){
        document.getElementById('dateTime').innerHTML = today;
    }
}
setInterval(changeDateTime, 1000);

function getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            localStorage.setItem("userLocation", JSON.stringify(pos));
            codeLatLng(pos.lat, pos.lng);
          }, function() {
            handleLocationError(true);
          });
    } else {
    // Browser doesn't support Geolocation
    handleLocationError(false);
    }
}

function handleLocationError(browserHasGeolocation) {
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}


var geocoder= new google.maps.Geocoder();
function codeLatLng(lat, lng) {
  var latlng = new google.maps.LatLng(lat, lng);
  geocoder.geocode({latLng: latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        var arrAddress = results;

        for(var i = 0; i < arrAddress.length; i++){
            if(arrAddress[i].types[0] == "locality"){
                localStorage.setItem("location", arrAddress[i].address_components[0].long_name);
                document.getElementById("location").textContent = localStorage.getItem("location");
                break;
            }
        }

      } else {
        alert("No results found");
      }
    } else {
      alert("Geocoder failed due to: " + status);
    }
  });
}