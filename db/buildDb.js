const { build_cust_table } = require('./buildCustomer');
const { build_order_table } = require('./buildOrder');
const { build_payment_type_table } = require('./buildPaymentType');
const { build_product_table } = require('./buildProduct');
const { build_order_product_table } = require('./buildOrderProduct');
const { build_prod_type_table } = require('./productType');

module.exports.createTables = () => {
    build_cust_table()
    .then(() => {
        return build_order_table();
    })
    .then(() => {
        return build_payment_type_table();
    })
    .then(() => {
        return build_product_table();
    })
    .then(() => {
        return build_order_product_table();
    })
    .then(() => {
        return build_prod_type_table();
    });
};