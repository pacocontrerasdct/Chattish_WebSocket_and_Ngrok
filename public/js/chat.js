$(document).ready(function() {
  console.log('Hello chat js');
  var userPrincipal = "PACO said >";
  // var socket = io(); //call to localhost
  var sockets = io('http://983b022a.ngrok.io'); // Call to ngrok

  sockets.on('connect', function(){
    console.log('client connected with ngrok');
  });

  $('form').submit(function(){
    console.log('click form');
    sockets.emit('chat message', userPrincipal + " " + $('#m').val());
    msg = $('#m').val('');
    return false;
  });


  sockets.on('chat message', function(msg){
    console.log(msg);
    $('#messages').append($('<li>').text(msg));
  });


});





