// Requiring modules and putting them in variables
var express      = require('express');
var app          = express();
var server       = require('http').createServer(app);
var morgan       = require('morgan');
var port         = process.env.PORT || 3000;
var bodyParser   = require('body-parser');
var expressLayouts = require('express-ejs-layouts');

// Database stuff
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chattish_db');
require('./models/chat');
var Chat =  mongoose.model("Chat");


app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressLayouts)
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', './views');

// Websocket
var io  = require('socket.io')(server);

// // Trying to get my IP
// var get_ip = require('ipware')().get_ip;

// // ipware module
// app.use(function(req, res, next) {
//         var ip_info = get_ip(req);
//         console.log(ip_info);
//         // { clientIp: '127.0.0.1', clientIpRoutable: false }
//         next();
// });


app.get('/', function(req, res){
  Chat.find({}, function(err, chatLines) {
    res.render('index', { chatLines: chatLines });    
  })
});

// websocket connection
io.on('connect', function(sockets) {
  console.log('Someone has connected!');
  sockets.on('chat message', function(msg){
    console.log('message: ' + msg);
    if(msg != "") {
      var msg = msg;
      io.emit('chat message', msg);    
      line = new Chat({
        chatLine: msg
      })
      line.save(function(err, chat) {
        if (err) console.log(err);
        console.log('Line Saved!');
      })
    }
  });
})




/////////////////////////////////////////
// SEEDs for BD
/////////////////////////////////////////
// var line1 = new Chat({
//   chatLine: 'Hello this is my first line'
// })
//     line1.save(function(err, chat) {
//       if (err) console.log(err);
//       console.log('Line1 Saved!');
//     })
// var line2 = new Chat({
//   chatLine: 'Second line testing mongoose db'
// })
//     line2.save(function(err, chat) {
//       if (err) console.log(err);
//       console.log('Line2 Saved!');
//     })






server.listen(port, function(){
  console.log('listening on port %s', port);
});





