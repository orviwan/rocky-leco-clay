var rocky = require('rocky');

var Clay = require('pebble-clay');
var clayConfig = require('./config');
var clay = new Clay(clayConfig, null, { autoHandleEvents: false });

Pebble.addEventListener('showConfiguration', function(e) {
  Pebble.openURL(clay.generateUrl());
});

Pebble.addEventListener('webviewclosed', function(e) {
  if (e && !e.response) {
    return;
  }

  // Return settings from Config Page to watch
  var settings = clay.getSettings(e.response, false);
  rocky.postMessage(settings);
});

rocky.on('message', function(event) {
  if (event.data.command === 'settings') {

    // Restore settings from localStorage and send to watch
    var settings = JSON.parse(localStorage.getItem('clay-settings'));
    if (settings) {
      rocky.postMessage(settings);
    }
  }
});
