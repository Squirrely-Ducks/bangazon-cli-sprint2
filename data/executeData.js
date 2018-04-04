const { executeProductData } = require('./faker/productsFaker');
const { executeOrderData } = require('./faker/ordersFaker');
const { executePaymentTypeData } = require('./faker/paymentTypeFaker');
const { executeProductTypeData } = require('./faker/productTypeFaker');
const { executeOrderProductData } = require('./faker/orderProductFaker');

executeProductData();
executeOrderData();
executePaymentTypeData();
executeProductTypeData();
executeOrderProductData();