'use strict';

const faker = require('faker');
const { createWriteStream } = require('fs');

const generatePaymentType = () => {
  let paymentType = [];
  let paymentArray = ["Visa", "American Express", "MasterCard", "American Express", "Visa", "American Express", "MasterCard", "American Express", "Visa", "MasterCard"];
  
  for (let i = 0; i < 10; i++) {
    let customer_id  = i + 1;
    let payment_number = Math.floor(Math.random() * 4);  
    let type = paymentArray[i];
    let account_number = Math.floor(Math.random() * (9999999999999999 - 1000000000000000 + 1) + 1000000000000000);

    paymentType.push({
    customer_id,
    type,
    account_number
    });
  };
  return paymentType;
}


module.exports.executePaymentTypeData=()=> {
    let paymentType = generatePaymentType();
    let paymentTypeStream = createWriteStream(`./data/json/paymentType.json`);
    paymentTypeStream.write(JSON.stringify(paymentType));
};