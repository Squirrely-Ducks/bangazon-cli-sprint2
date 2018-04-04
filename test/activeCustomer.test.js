const { assert: {equal, isFunction} } = require('chai');
const { setActiveCustomer, getActiveCustomer } = require('../app/activeCustomer');

describe('Active Customer', () => {
    describe('Set Active Customer', () => {
        it('should set id and return same id', () => {
            let testId = 1;
            setActiveCustomer(testId);
            let { id } = getActiveCustomer();
            equal(id, testId);
        });
    });
});
