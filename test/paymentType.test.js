const { assert: { equal, deepEqual, isNumber, isObject, isArray, isFunction } } = require('chai');
let { createType, getTypesByCustomer, getType } = require('../app/models/PaymentType.js');

let testObj = {
    payment_type_id: 1,
    customer_id: 1,
    type: 'Visa',
    account_number: 5158431997693020
}
let test2 = {
    payment_type_id: 2,
    customer_id: 3,
    type: 'VISA',
    account_number: 12345

}

describe('payment types', () => {
    it('all CRUDS should be functions', () => {
        isFunction(createType);
        isFunction(getTypesByCustomer);
        isFunction(getType);
    });
});


describe('get all types', () => {
    it('should be an array of objects', () => {
        return getTypesByCustomer(1)
            .then(types => {
                isArray(types);
                isObject(types[0])
            });
    });
    it('should have correct objects', ()=>{
        return getTypesByCustomer(1)
        .then(types=>{
            deepEqual(types[0], testObj)
        });
    })
});
describe('get type', () => {
    it('should return an object', () => {
        return getType(1)
            .then(type => {
                isObject(type)
            });
    });
    it('should return the correct object', () => {
        return getType(1)
            .then(type => {
                deepEqual(type, testObj)
            });
    });
})

describe('createType', () => {
    it('should return a number', () => {
        return createType(1, 'VISA', 12345)
            .then(typeId => {
                isNumber(typeId);
            });
    });
    
    it('should create the correct object in the database', () => {
        return createType(3, 'MC', 45678)
            .then(typeId => {
                return getType(typeId)
                    .then(newType => {
                        equal(typeId, newType.payment_type_id)
                    });

            });
    });
});
