const invariant = require('invariant');

// data = 'green' || 'yellow' || 'red'
function Color(name) {
  invariant(name == 'green' || name == 'yellow' || name == 'red', 'Color name not appropriate');
  return name;
}

// data Key -> Color
function Indicator(key, color) {
  return {
    key: key,
    color: color
  }
}

module.exports = {
  Indicator,
  Color
}