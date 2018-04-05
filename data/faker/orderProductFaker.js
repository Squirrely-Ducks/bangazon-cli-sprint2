"use strict";

const { createWriteStream } = require('fs');

const generateOrderProduct = () => {
    let orderProduct = [];
    for (let i = 0; i < 10; i++) {
        let order_id = i + 1;
        let product_id = i + 1;
        orderProduct.push({order_id, product_id})
        }
    return orderProduct;
}



module.exports.executeOrderProductData = () => {
    let orderProduct = generateOrderProduct();
    let orderProductStream = createWriteStream('./data/json/orderProduct.json')
    orderProductStream.write(JSON.stringify(orderProduct));
}