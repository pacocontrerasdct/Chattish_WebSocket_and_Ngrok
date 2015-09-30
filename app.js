var express      = require('express');
var app          = express();
var server       = require('http').createServer(app);
var morgan       = require('morgan');
var port         = process.env.PORT || 3000;
var bodyParser   = require('body-parser');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', './views');

// Websocket
var io  = require('socket.io')(server);

app.get('/', function(req, res){
  res.render('index');
});

io.on('connect', function(sockets) {
  console.log('Someone has connected!');

  sockets.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

})




// Database stuff
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chattish_db');
var Chat =  require('./models/chat');

var line1 = new Chat({
  chatLine: 'Hello this is my first line'
})

line1.save(function(err, chat) {
  if (err) console.log(err);
  console.log('Line1 Saved!');
})







server.listen(port, function(){
  console.log('listening on port %s', port);
});




