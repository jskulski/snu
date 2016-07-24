const invariant = require('invariant');

// data Filepath = String
// enum Visibility = VISIBLE | INVISIBLE
// data ServiceConfig = [ Key: Visibility]
// data Config = { ServiceConfig }

// data Message = String

// data Color = String
function Color(name) {
  invariant(name == 'green' || name == 'yellow' || name == 'red' || name == 'black', 'Color name not appropriate');
  return name;
}

// data Indicator = Key | Label | Color | Message | URL
function Indicator(key, label, color, message, moreInfoUrl) {
  invariant(key, 'Must have a valid key');
  invariant(label, 'Must have a valid label');
  invariant(color, 'Indicator must have a valid color');
  invariant(message, 'Indicator must have a valid message');
  invariant(moreInfoUrl, 'Indicator must have a valid moreInfoUrl');

  return {
    key: key,
    label: label,
    color: color,
    message: message,
    moreInfoUrl: moreInfoUrl
  }
}

module.exports = {
    Color,
    Indicator
}