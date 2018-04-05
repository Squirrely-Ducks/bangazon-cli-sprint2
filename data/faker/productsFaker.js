'use strict';

const faker = require('faker');
const { createWriteStream } = require('fs');

const generateProducts = () => {
  let products = [];
  
  for (let i = 0; i < 10; i++) {
    let seller_id = 10 - i;
    let product_type_id = i + 1;
    let title = faker.commerce.productName();
    let price = faker.commerce.price();
    let description = faker.company.bs();
    let create_date = faker.date.between('2016-12-31','2018-01-01');
    let quantity = Math.floor(Math.random() * (30 - 10 + 1) + 10);

    products.push({
      seller_id,
      product_type_id,
      title,
      price,
      description,
      create_date,
      quantity
    });
  };
  return products;
}

module.exports.executeProductData = () => {
    let products = generateProducts();
    let productStream = createWriteStream('./data/json/products.json');
    productStream.write(JSON.stringify(products));
}



