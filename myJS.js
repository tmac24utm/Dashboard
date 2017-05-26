'use strict';

<<<<<<< HEAD
var ws = new WebSocket("wss://" + window.location.hostname + ":" + (window.location.port || 8080) + "/");
=======
var ws = new WebSocket("ws://" + window.location.hostname + ":" + (window.location.port || 8080) + "/"); 
>>>>>>> origin/master

/**
 * Check if an element exists using query selector
 */ 
function checkElementExists(elem){
    var elem = document.querySelector(elem);
    if(elem == null){
        return false;
    } else return true;
}

/**
 * Sets the date and time
 */
function changeDateTime(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    var m = today.getMinutes();
    var s = today.getSeconds();

    // If date is less than 10 append a 0 for easier reading - Same applies to the others below
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

    
    if(localStorage.getItem("clockSettings") == "12H"){ // If the user selects the 12H clock, does the calculation for it and sets hours to that
        var h = today.getHours() % 12 || 12;
    } else {
        var h = today.getHours();
        if(h==0 || h<10){
            h='0'+h
        }
    }

    today = dd+'/'+mm+'/'+yyyy+' '+h+':'+m+':'+s;
    if(checkElementExists('#dateTime')){ // Check it exists on the page so it doesn't try it on pages without the clock causing errors
        document.getElementById('dateTime').innerHTML = today;
    }
}
setInterval(changeDateTime, 1000); 

/**
 * Google geolocation
 */
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
        handleLocationError(false);
    }
}

/**
 * If geolocation fails, calls getLocationFromIP
 */
function handleLocationError(browserHasGeolocation) {
    getLocationFromIP();
}

/**
 * Gets the location from user IP
 */
function getLocationFromIP(){
    var req = new XMLHttpRequest();
    req.addEventListener("load", locationIPResponse);
    req.open("GET", "http://ip-api.com/json");
    req.send();
}

/**
 * Formats the IP Location response
 */
function locationIPResponse(){
    var response = JSON.parse(this.responseText);
    localStorage.setItem("userLocation", JSON.stringify({"lat":response.lat, "lng":response.lon}));
}

/**
 * Sends the user location
 */
function sendLocation(){
    if(localStorage.getItem("userLocation")){
        ws.send(localStorage.getItem("userLocation"));
    } else {
        setTimeout(function(){ // Attempts to send the location every second if there is currently no stored location
            sendLocation();
        }, 1000);
    }
}
setInterval(sendLocation, 300000);

/**
 * Retrieves the weather from the websocket
 */ 
function getWeather(){
    ws.onmessage = function(message) {
        localStorage.setItem("weather", "Todays Forecast: " + JSON.parse(message.data).hourly + "<br />" + "Currently: " + JSON.parse(message.data).currently);
        document.getElementById("location").innerHTML = localStorage.getItem("weather");
    }   
}

/**
 * Creates the local storage "notes"
 */
function setNotes(){
    localStorage.setItem("notes", document.getElementById("notepad").innerHTML);
}

/**
 * Retrieves the local storage "notes"
 */
function getNotes(){
    document.getElementById("notepad").innerHTML = localStorage.getItem("notes");
}