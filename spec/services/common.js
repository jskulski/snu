const assert = require('chai').assert;

function shouldBe(expectedIndicator, done) {
  return function(actualIndicator) {
    assert.deepEqual(actualIndicator, expectedIndicator);
    done();
  }
}

module.exports = {
    shouldBe
}