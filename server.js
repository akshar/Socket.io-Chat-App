var express = require('express');
var moment = require('moment');
var app = express();
var PORT = process.env.PORT || 3000;
var http = require('http').Server(app);
var io = require('socket.io')(http);
// Gets fired when   
io.on('connection', function(socket) {
    console.log("user connected via socket.io");

    socket.on('message', function(message) {
        console.log('message received' + message.text);
        message.timestamp = moment().valueOf();
        // socket.broadcast.emit('message', message);
        io.emit('message', message);

    });

    socket.emit('message', {
        text: 'welcome to the chat application',
        timestamp: moment().valueOf()
    });
});

app.use(express.static(__dirname + '/public'));

http.listen(PORT, function() {

    console.log("server Started!");

});
