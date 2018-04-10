
'use strict';

const prompt = require('prompt');
const colors = require("colors/safe");
const {createType} = require('../models/PaymentType');
const {getActiveCustomer} = require('../activeCustomer')

let headerDivider = `${colors.america(
    "*********************************************************"
  )}`;

module.exports.promptAddPayment = () => {
    return new Promise((resolve,reject)=>{
        console.log(headerDivider);
        console.log('Add a payment');
        console.log(headerDivider);
        prompt.get([{
            name: 'type',
            description: 'Enter a payment type',
            type: 'string',
            required: true
            
        },{
            name: 'account_number',
            description: 'Enter an account number',
            // pattern:/^\d{16}/,
            // message: '16 digits are required to complete a payment',
            type: 'number',
            required: true
            
        }], function(err,payment){
            if(err) return reject(err);
            resolve(payment)
        })
    })
}  

module.exports.createPayment = (payment) => {
        const { type, account_number} = payment;
        let id = getActiveCustomer().id;
        createType(id, type, account_number)
        .then((data)=>{
            console.log('Payment created. Buy some stuff.');
        });
    }
