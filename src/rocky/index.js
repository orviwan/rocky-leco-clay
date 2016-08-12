var rocky = require('rocky');

var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 
  'Oct', 'Nov', 'Dec'];
var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

var settings = null;

rocky.on('draw', function(drawEvent) {
  var ctx = drawEvent.context;
  var w = ctx.canvas.unobstructedWidth;
  var h = ctx.canvas.unobstructedHeight;
  var obstruction_h = (ctx.canvas.clientHeight - ctx.canvas.unobstructedHeight) / 2;
  var d = new Date();

  var foregroundColor = 'white';
  var backgroundColor = 'black';

  if (settings) {
    foregroundColor = cssColor(settings.ForegroundColor.value);
    backgroundColor = cssColor(settings.BackgroundColor.value);
  }

  // BACKGROUND
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight); 

  // TIME
  ctx.fillStyle = foregroundColor;
  var clockTime = leftpad(d.getHours(), 2, 0) + ':' + 
                    leftpad(d.getMinutes(), 2, 0); // TODO: Detect 24h
  ctx.font = '42px bold numbers Leco-numbers';
  ctx.textAlign = 'center';
  ctx.fillText(clockTime, w / 2, 56 - obstruction_h);

  // DATE
  ctx.fillStyle = foregroundColor;
  var clockDate = dayNames[d.getDay()] + ' ' + d.getDate() + ' ' + 
                    monthNames[d.getMonth()] + ', ' + d.getFullYear();
  ctx.font = '18px bold Gothic';
  ctx.textAlign = 'center';
  ctx.fillText(clockDate, w / 2, 100 - obstruction_h);

  // COLON BLINK MASK
  if(!settings || (settings && settings.Blink.value)) {
    if (!(d.getSeconds() % 2)) {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(66, 72 - obstruction_h, 12, 26);
    }  
  }
});

rocky.on('message', function(event) {
  settings = event.data;
});

rocky.on('secondchange', function(e) {
  rocky.requestDraw();
});

function leftpad(str, len, ch) {
  str = String(str);
  var i = -1;
  if (!ch && ch !== 0) ch = ' ';
  len = len - str.length;
  while (++i < len) {
    str = ch + str;
  }
  return str;
}


// Borrowed from Clay.js

/**
 * @param {string|boolean|number} color
 * @returns {string}
 */
function cssColor(color) {
  if (typeof color === 'number') {
    color = color.toString(16);
  } else if (!color) {
    return 'transparent';
  }

  color = padColorString(color);

  return '#' + color;
}

/**
 * @param {string} color
 * @return {string}
 */
function padColorString(color) {
  color = color.toLowerCase();

  while (color.length < 6) {
    color = '0' + color;
  }

  return color;
}
