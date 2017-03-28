'use strict';

var ws = new WebSocket("ws://35.187.164.248:8081");

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
          }, function() {
            handleLocationError(true);
          });
    } else {
    // Browser doesn't support Geolocation
        handleLocationError(false);
    }
}

function handleLocationError(browserHasGeolocation) {
    getLocationFromIP();
}

function getLocationFromIP(){
    console.log("getLocationFromIP()");
    var req = new XMLHttpRequest();
    req.addEventListener("load", locationIPResponse);
    req.open("GET", "http://ip-api.com/json");
    req.send();
}

function locationIPResponse(){
    var response = JSON.parse(this.responseText);
    localStorage.setItem("userLocation", response.lon + "," + response.lat);
    codeLatLng(response.lat, response.lng);
}

function sendLocation(){
    ws.send(localStorage.getItem("userLocation"));
}