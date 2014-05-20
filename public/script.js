// var socket = io.connect('http://localhost:8080');
var socket = io.connect(document.URL);
socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});

var switches = document.querySelectorAll('.switch');

var box = document.querySelector('#textbox');

socket.on('emitTest', function(str) {
  console.log('emitTest received: ' + str);
  box.value = str;
})

var show = function(elem) {
  elem.style.opacity = 1;
}

socket.on('switch1', function() {
  console.log('Switched one ...');
  show(switches[0]);
})

var changedTextbox = function() {
  socket.emit('textboxChanged', {data: box.value});
  console.log('Textbox changed value: ' + box.value);
  
  if(box.value === 'schalten') {
    socket.emit('switch1');
  }
}