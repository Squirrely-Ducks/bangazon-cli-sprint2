'use strict';
const { Database } = require('sqlite3').verbose();
// const { setActiveCustomer, getActiveCustomer } = require('./activeCustomer');
const path = require('path');

const db = new Database(path.join(__dirname, '../..', 'db', 'bangazon.sqlite'));


// method for getting all customers
module.exports.get_all_customers = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM customer`,
      (err, customer) => {
        if (err) return reject(err)
        resolve(customer);
      });
  });
};

// method for getting one customer 
module.exports.get_one_customer = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT *
      FROM customer
      WHERE customer_id = ${id}`,
      (err, customer) => {
        if (err) return reject(err)
        resolve(customer);
      });
  });
};

// method for adding new customer
module.exports.new_customer = ({ first_name, last_name, street, city, state, zip, phone }) => {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO customer VALUES(
      null,
      "${first_name}",
      "${last_name}",
      "${street}", 
      "${city}",
      "${state}",
      "${zip}",
      "${phone}" )`,
      function (err, customer) {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(this.lastID)
      });
  });
};

// method for deleting a customer 
module.exports.remove_customer = (id) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM customer
    WHERE customer_id = ${id}`,
      function (err) {
        if (err) reject(err)
        resolve(this.changes)
      })
  })
}

    