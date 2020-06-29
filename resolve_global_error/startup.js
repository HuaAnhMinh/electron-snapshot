const path = require('path');

function combinePath() {
  return path.join('a', 'b', 'c');
}

exports.methodInTheSnapshot = combinePath;