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

  socket.on('schalte1frei', function () {
    viewData.freigeschalten = true;
  });

  socket.on('textboxChanged', function (data) {
    console.log('Console: Textbox changed it\'s value: ' + data.data);
    socket.broadcast.emit('emitTest', data.data);
  });

  socket.on('switch1', function() {
    io.sockets.emit('switch1');
  });
});