/**
 * Required modules
 */
const http = require('http');
const wsserver = require('ws').Server;
const express = require('express');
var Forecast = require('forecast');

/**
 * Create the server and websocket
 */
const server = http.createServer();
const wss = new wsserver({ server: server });
const app = express();


server.on('request', app);

/**
 * Serve static content
 */
app.use(express.static(__dirname));

/**
 * Initialise forecast
 */
var forecast = new Forecast({
  service: 'darksky',
  key: 'b8aaf95d2bed368dedd7ed00dead4b6a',
  units: 'celcius'
});

/**
 * Turns the websocket on and sends a message containing the weather information
 */
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    var loc = JSON.parse(message);
    forecast.get([loc.lat, loc.lng], true, function(err, weather) {
      if(err) return console.dir(err);
      if(weather !== undefined){ // If weather is not undefined, send the desired results
          ws.send(JSON.stringify({"currently":weather.currently.summary + "," + Math.round(Number(weather.currently.temperature)) + "°C", "hourly":weather.hourly.summary}));
      } else { // Else, send unavailable so it doesn't appear empty
          ws.send(JSON.stringify({"currently":"Unavailable", "hourly":"Unavailable"}));
      }
    });
  });
});

/**
 * Send index.html
 */
app.get('/index', function (req, res) {
  res.send(__dirname + "/index.html");
});

/**
 * Send accountSettings.html
 */
app.get('/accountSettings', function (req, res) {
  res.sendFile(__dirname + "/accountSettings.html");
});

server.listen(8080);
console.log("Server started");
console.log("Websocket started");