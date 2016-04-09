var socket = io();



socket.on('connect', function() {
    console.log("connected to server");
});

socket.on('message', function(message) {
	var momentTimeStamp = moment.utc(message.timestamp);
	
    console.log('new message');
    console.log(message.text);
    jQuery('.messages').append('<p><strong>  '+ momentTimeStamp.local().format('h:mm a') +': </strong>' + message.text + '</p>')
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
