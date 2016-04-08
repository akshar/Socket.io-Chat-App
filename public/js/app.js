var socket = io();

socket.on('connect', function() {
    console.log("connected to server");
});

socket.on('message', function(message) {

    console.log('new message');
    console.log(message.text);

});
