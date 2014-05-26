var i, j;

var socket = io.connect(document.URL);

var switches = document.querySelectorAll('.switch')
  , boxes = document.querySelectorAll('.textbox')
  , dict = [
      /git initXXX/
      ,/git add readme.md/
      ,/git commit/
      ,/git push/
      ,/git branch hotfix/
      ,/git checkout hotfix/
      ,/git status/
      ,/git log/
      ,/git checkout master/
      ,/git merge hotfix/
      ,/git branch -d hotfix/
      ,/git reset/
      ,/git revert/
      ,/git reset icon.psd/
      ,/git clone/
      ,/git checkout -b addon/
      ,/git cherry-pick dbf8e77/
      ,/git pull/
      ,/git pull --rebase/
      ]
  , emitter = []
  , box = document.querySelector('#textbox')
;

/**
 * string represents value from boxes-array
 */
var valuesFromBoxes = function() {
  var str = '';
  for(i = 0; i < boxes.length; i++) {
    str += boxes[i].value + ',';
  }
  return str;
}

/**
 * set values of boxes-array from string
 */
var valuesToBoxes = function(_values) {
  var splitted = _values.split(',')
  for(i = 0; i < boxes.length; i++) {
    boxes[i].value = splitted[i];
  }
}

/**
 * init switches dict
 */
for(j = 0; j < dict.length; j++) {
  if(dict[j] != null && boxes[j] != null) {
    emitter[j] = 'switch' + (j + 1);
  }
}

/**
 * handler: if box value changed
 */
var changedTextbox = function() {
  socket.emit('boxesChanged', valuesFromBoxes());
  console.log('changedTextbox call, with valuesFromBoxes: ' + valuesFromBoxes());

  for(j = 0; j < dict.length; j++) {
    // test for regex
    if(dict[j].test(boxes[j].value)) {
      socket.emit(emitter[j]);
    }
  }
}

/**
 * attach handler to every input
 */
for(i = 0; i < boxes.length; i++) {
  boxes[i].oninput = changedTextbox;
}

socket.on('emitTest', function(_values) {
  console.log('emitTest received: ' + _values);
  valuesToBoxes(_values);
})

var show = function(elem) {
  if(elem != null) {
    elem.style.opacity = 1;
  }
}

/**
 * init socket listening
 */
var initSwitchSocket = function(i) {
  socket.on('switch' + (i + 1), function() {
    console.log('Switched ' + i + ' ...');
    show(switches[i]);
  });
}

for(i = 0; i < switches.length; i++) {
  initSwitchSocket(i);
}