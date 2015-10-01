$(document).ready(function() {
  console.log('Hello chat js');
  var userPrincipal = "PACO said >";
  // var socket = io(); //call to localhost
  var sockets = io('http://1115df85.ngrok.io'); // Call to ngrok

  sockets.on('connect', function(){
    console.log('client connected with ngrok');
  });

  $('form').submit(function(){
    console.log('click form');
    sockets.emit('chat message', userPrincipal + $('#m').val());
    msg = $('#m').val('');
    return false;
  });


  sockets.on('chat message', function(msg){
    console.log(msg);
    $('#messages').append($('<li>').text(msg));
    var $elem = $('#messages');
    console.log('click');
    $('#recorded-chat').animate({scrollTop: $elem.height()}, 800);
  });

  // Scroll auto of messages
  var $elem = $('#messages');
  $('#recorded-chat').animate({scrollTop: $elem.height()}, 2500);
  // Buttons to scroll
  $('#nav_up').on('click', function(event){
    var $elem = $('#messages');
    console.log('click');
    $('#recorded-chat').animate({scrollTop: '0px'}, 800);
  });
  $('#nav_down').on('click', function(event){
    var $elem = $('#messages');
    console.log('click');
    $('#recorded-chat').animate({scrollTop: $elem.height()}, 800);
  });  

});






