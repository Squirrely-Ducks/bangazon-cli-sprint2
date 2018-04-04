const { } = require('../app/models/customer');
const { assert: { isNumber, isObject, equal } } = require('chai');

// Placed here to confirm test file runs properly
describe('just a test', () => {
  it('should be equal', () => {
    equal( 3, 1 + 2)
  });
});

// Test for the creating customers method
describe('customers module', () => {
  describe('adding customer', () => {
    it('should be a function', () => {
      isFunction();
    });
    it('should add an object', () => {
      isObject();
    });
    it('should have an id === id', () => {

    });
  });
});