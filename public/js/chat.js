$(document).ready(function() {
  console.log('Hello chat js');

  // var socket = io(); //call to localhost
  var sockets = io('http://28d03c90.ngrok.io'); // Call to ngrok

  //var fullChat = [];

  sockets.on('connect', function(){
    console.log('client connected with ngrok');
  });

  $('form').submit(function(){
    console.log('click form');
    sockets.emit('chat message', $('#m').val());
    msg = $('#m').val('');
    return false;
  });


  sockets.on('chat message', function(msg){
    console.log(msg);
    $('#messages').append($('<li>').text(msg));
    //fullChat.push(msg);

  });


});





