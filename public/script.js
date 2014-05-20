var i, j;

var socket = io.connect(document.URL);

var switches = document.querySelectorAll('.switch')
  , boxes = document.querySelectorAll('.textbox')
  , dict = [
      'git init',
      'git add readme.md'
      ]
  , emitter = []
;

for(j = 0; j < dict.length; j++) {
  if(dict[j] != null && boxes[j] != null) {
    emitter[j] = 'switch' + (j + 1);
  }
}

var changedTextbox = function() {
  socket.emit('boxesChanged', JSON.stringify(boxes));
  
  for(j = 0; j < dict.length; j++) {
    if(dict[j] === boxes[j].value) {
      socket.emit(emitter[j]);
    }
  }
}

for(i = 0; i < boxes.length; i++) {
  boxes[i].oninput = changedTextbox;
}

var box = document.querySelector('#textbox');

socket.on('emitTest', function(_boxes) {
  console.log('emitTest received: ' + _boxes);
  _boxes = JSON.parse(_boxes);
  for(i = 0; i < boxes.length; i++) {
    boxes[i].value = _boxes[i].value;
  }
})

var show = function(elem) {
  if(elem != null) {
    elem.style.opacity = 1;
  }
}

socket.on('switch1', function() {
  console.log('Switched one ...');
  show(switches[0]);
})
