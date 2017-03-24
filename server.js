var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.get('/index', function (req, res) {
  res.send(__dirname + "/index.html");
});

app.get('/accountSettings', function (req, res) {
  res.sendFile(__dirname + "/accountSettings.html");
});
  
app.listen(8080);