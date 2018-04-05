'use strict';

const { createWriteStream } = require('fs');
const faker = require('faker');

const generateOrders = () => {
  let orders = [];

  for (let i = 0; i < 10; i++) {
    let customer_id = i + 1;
    let payment_type_id = i + 1;
    let create_date = faker.date.between('2017-3-4', '2018-1-1');

    orders.push({
      customer_id,
      payment_type_id,
      create_date
    });
  }
  return orders;
};

module.exports.executeOrderData =()=>{
    let orders = generateOrders();
    let orderStream = createWriteStream(`./data/json/orders.json`);
    orderStream.write(JSON.stringify(orders));   
}