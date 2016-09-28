var express = require('express');
var path = require('path');
var http = require('http');
var app = express();

app.use(express.static(path.join(__dirname, '.')));

var server = http.createServer(app);
var port = 3000;
server.listen(port);
server.on('listening', function () {
	console.log("server start! " + port);
});
