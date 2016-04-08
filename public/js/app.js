var socket = io();

socket.on('connect', function() {
    console.log("connected to server");
});

socket.on('message', function(message) {

    console.log('new message');
    console.log(message.text);
    jQuery('.messages').append('<p>' + message.text + '</p>')
});

var $form = jQuery('#message-form');

$form.on('submit', function(event) {
    event.preventDefault();
    $message = $form.find('input[name=message]');
    socket.emit('message', {
        text: $message.val()
    });

    $message.val('');

});
