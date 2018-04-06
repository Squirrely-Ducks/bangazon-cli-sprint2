
'use strict';

const prompt = require('prompt');
const { get_all_customers, get_one_customer } = require('../models/Customer')
const colors = require("colors/safe");


let headerDivider = `${colors.america(
  "*********************************************************"
)}`;

// Prompts for creating new customer object
module.exports.promptNewCustomer = () => {
  return new Promise( (resolve, reject) => {
    prompt.get([{
      name: 'first_name',
      description: 'Enter customer name (First)',
      type: 'string',
      required: true
    }, {
      name: 'last_name',
      description: 'Enter last name (Last)',
      type: 'string',
      required: true
    },{
      name: 'street',
      description: 'Enter street address',
      type: 'string',
      required: true
    }, {
      name: 'city',
      description: 'Enter city',
      type: 'string',
      required: true
    }, {
      name: 'state',
      description: 'Enter state (KY)',
      type: 'string',
      required: true
    }, {
      name: 'zip',
      description: 'Enter postal code',
      type: 'string',
      required: true
    }, {
      name: 'phone',
      description: 'Enter phone number (xxx-yyy-zzzz)',
      type: 'string',
      required: true
    }], function(err, results) {
      if (err) return reject(err);
      resolve(results);
    })
  });
};

// Prompt sub menu for selecting the active customer
module.exports.promptAllCustomers = () => {
  return new Promise((resolve,reject)=>{
  // gets all customers from model  
  get_all_customers()
  .then((customers)=> {
      console.log(headerDivider);
      console.log('Select Active Customer');
      console.log(headerDivider);
      // loops through customer array logging out id and name
      for(let i = 0; i < customers.length; i++){
        console.log(`${customers[i].customer_id}. ${customers[i].first_name} ${customers[i].last_name}`);
      }
      prompt.get
        ([{
          name: "customer_id",
          description: "Please make a selection",
          // if the customer selected is not listed, reject input and ask for a valid one.
          conform: function(v){return !(+v > customers.length || +v < 1)},
          message: 'Please select a customer from the list above'
        }],
        function(err,customer) {
          if(err) {
            return reject(err)
          }
          else {
            // resolves the selected customer
            resolve(customer)
          } 
      });
    });
  });
}

