var express = require('express')
  , app = express()
  , server = require('http').Server(app)
  , io = require('socket.io').listen(server)
  , jade = require('jade')

app.set('view engine', 'jade');

var viewData = {}
  , switches = 18;

app.get('/', function(req, res) {
  res.render('index.jade', {
    pageTitle: 'Test',
    layout: true,
    data: viewData
  });
});


// static files
app.use(express.static(__dirname + '/public'));

// Start the server.
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080  
, ip = process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0";
server.listen(port);

io.sockets.on('connection', function (socket) {
  var initSwitchSocket = function(i) {
    var _switch = 'switch' + i;
    socket.on(_switch, function() {
      viewData[_switch] = true;
      io.sockets.emit(_switch);
    });
  }

  socket.on('boxesChanged', function (_values) {
    console.log('Console: Boxes changed their value: ' + _values);
    socket.broadcast.emit('emitTest', _values);
  });

  for(var i = 1; i <= switches; i++) {
    initSwitchSocket(i);
  }
});