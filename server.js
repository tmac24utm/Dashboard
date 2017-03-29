const http = require('http');
const wsserver = require('ws').Server;
const express = require('express');
var Forecast = require('forecast');

const server = http.createServer();
const wss = new wsserver({ server: server });
const app = express();


server.on('request', app);

app.use(express.static(__dirname));

var forecast = new Forecast({
  service: 'darksky',
  key: 'b8aaf95d2bed368dedd7ed00dead4b6a',
  units: 'celcius'
});

wss.on('connection', function connection(ws) {
  console.log("Websocket started")
  ws.on('message', function incoming(message) {
    forecast.get([message], true, function(err, weather) {
      if(err) return console.dir(err);
      ws.send(JSON.stringify({"currently":weather.currently.summary, "hourly":weather.hourly.summary}));
    });
  });
});

app.get('/index', function (req, res) {
  res.send(__dirname + "/index.html");
});

app.get('/accountSettings', function (req, res) {
  res.sendFile(__dirname + "/accountSettings.html");
});

server.listen(8080);
console.log("Server started");