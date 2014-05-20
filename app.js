var express = require('express')
  , app = express()
  , server = require('http').Server(app)
  , io = require('socket.io').listen(server)
  , jade = require('jade')

// app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var viewData = {};

app.get('/', function(req, res) {
  res.render('index.jade', {
    pageTitle: 'Test',
    layout: true,
    data: viewData
  });
});

// config
// static files
app.use(express.static(__dirname + '/public'));

// Start the server.
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080  
, ip = process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0";

server.listen(port);

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });

  socket.on('boxesChanged', function (boxes) {
    console.log('Console: Boxes changed their value: ' + boxes);
    socket.broadcast.emit('emitTest', boxes);
  });

  socket.on('switch1', function() {
    viewData.switch1 = true;
    io.sockets.emit('switch1');
  });
});