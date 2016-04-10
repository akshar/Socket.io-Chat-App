var express = require('express');
var moment = require('moment');
var app = express();
var PORT = process.env.PORT || 3000;
var http = require('http').Server(app);
var io = require('socket.io')(http);

var clientInfo = {};

function sendCurrentUsers(socket) {

    var info = clientInfo[socket.id];
    var users = [];

    if (typeof info === 'undefined') {
        return;
    }
    Object.keys(clientInfo).forEach(function(socketId) {
        var userInfo = clientInfo[socketId];
        if (info.room === userInfo.room) {
            users.push(userInfo.name);
        }
    });

    socket.emit('message',{
    	name:'System',
    	text:'current users' + users.join(', '),
    	timestamp:moment().valueOf()

    });

}

// Gets fired when   
io.on('connection', function(socket) {
    console.log("user connected via socket.io");

    socket.on('disconnect', function() {
        var userData = clientInfo[socket.id];
        if (typeof userData !== 'undefined') {
            socket.leave(userData.name);
            io.to(userData.room).emit('message', {
                name: 'System',
                text: userData.name + ' has left!',
                timestamp: moment().valueOf()
            });
            delete clientInfo[socket.id];
        }

    });

    socket.on('joinRoom', function(req) {
        clientInfo[socket.id] = req; //{"ab345x":{
        socket.join(req.room); //		name:'name', 'room:room'	
        socket.broadcast.to(req.room).emit('message', { //	}			
            name: 'System', //	}
            text: req.name + ' has joined!',
            timestamp: moment().valueOf()

        });
    });

    socket.on('message', function(message) {
        console.log('message received' + message.text);

        if (message.text === '@currentUsers') {
            sendCurrentUsers(socket);
        } else {
            message.timestamp = moment().valueOf();
            // socket.broadcast.emit('message', message);
            io.to(clientInfo[socket.id].room).emit('message', message); // clientInfo[socket.id][room]

        }

    });

    socket.emit('message', {
        name: 'System',
        text: 'welcome to the chat application',
        timestamp: moment().valueOf()
    });
});

app.use(express.static(__dirname + '/public'));

http.listen(PORT, function() {

    console.log("server Started!");

});
