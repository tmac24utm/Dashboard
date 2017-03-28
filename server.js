var express = require('express');
var app = express();
var Forecast = require('forecast');
const Websocket = require('ws');

app.use(express.static(__dirname));

var forecast = new Forecast({
  service: 'darksky',
  key: 'b8aaf95d2bed368dedd7ed00dead4b6a',
  units: 'celcius'
});

const wss = new Websocket.Server({port: 8081})
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    forecast.get([message], function(err, weather) {
      if(err) return console.dir(err);
      console.dir(weather);
    });
    console.log('received: %s', message);
  });
});

app.get('/index', function (req, res) {
  res.send(__dirname + "/index.html");
});

app.get('/accountSettings', function (req, res) {
  res.sendFile(__dirname + "/accountSettings.html");
});

app.listen(8080);
console.log("Server started")