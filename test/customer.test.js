const { new_customer, get_one_customer, remove_customer } = require('../app/models/Customer');
const { assert: { isNumber, isArray, isObject, equal, isFunction, deepEqual } } = require('chai');

// Dummy arrays and objects
let addTestObj = {
  first_name: 'cookie',
  last_name: 'case',
  street: 'monster',
  city: 'bird town',
  state: 'sessy',
  zip: '42069',
  phone: '808080'
}

let oneCustomer = {
  customer_id: 1,
  first_name: 'Fred',
  last_name: 'Smith',
  street: '500 Somewho Lane',
  city: 'St. Louis',
  state: 'Iowa',
  zip: '12345',
  phone: "123-555-5309"
}

// Test for the creating customers method
describe('customers module', () => {

  describe('getting customer', () => {
    it('return one customer from database', () => {
      let test_id = oneCustomer.customer_id;
      return get_one_customer(test_id)
        .then((customer) => {
          deepEqual(oneCustomer, customer)
        })
    });
  });

  describe('adding customer', () => {
    it('should be a function', () => {
      isFunction(new_customer);
    });
    it('should add an object inside array', () => {
      isObject(addTestObj);
    });
    it('should post to the data base', () => {
      return new_customer(addTestObj)
        .then((id) => {
          addTestObj.customer_id = id
          return get_one_customer(id);
        })
        .then((customer) => {
          deepEqual(customer, addTestObj);
          return remove_customer(customer.customer_id);
        })
    });
  });
});



