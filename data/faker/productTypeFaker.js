"use strict";

const faker = require('faker');
const { createWriteStream } = require('fs');

const generateProductType = () => {
    let productType = [];
    for (let i = 0; i < 10; i++) {
        let type = faker.commerce.product();
        productType.push({type});
    }
    return productType;
};


module.exports.executeProductTypeData = () => {
    let productTypes = generateProductType();
    let productTypeStream = createWriteStream('./data/json/productType.json');
    productTypeStream.write(JSON.stringify(productTypes));
};