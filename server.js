var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection',function(){
	console.log("user connected via socket.io");
});

app.use(express.static(__dirname + '/public'));

http.listen(PORT,function(){

	console.log("server Started!");

});

