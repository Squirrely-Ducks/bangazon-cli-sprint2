const sqlite3 = require('sqlite3').verbose();
const { readFileSync } = require("fs");
const { customers } = require('../data/customers.js');

///// BUILD CUSTOMER TABLE /////
const db = new sqlite3.Database("db/bangazon.sqlite");

module.exports.build_cust_table = () => {
  return new Promise((resolve, reject) => {
    db.run(`DROP TABLE IF EXISTS customer`);
    db.run(
      `CREATE TABLE IF NOT EXISTS customer (
      customer_id INTEGER PRIMARY KEY,
      first_name TEXT,
      last_name TEXT,
      street TEXT,
      city TEXT,
      state TEXT,
      zip TEXT,
      phone TEXT
    )`, () => {
        resolve(insertCustData());
      });
  });
}

///// INSTERT DATA INTO TABLE /////
const insert_cust_data = () => {
  return new Promise((resolve, reject) => {
    customers.forEach(({ first_name, last_name, street, city, state, zip, phone, email, acct_date, active }) => {
      db.run(`INSERT INTO customer VALUES (
        ${null},
        "${first_name}",   
        "${last_name}",
        "${street}",
        "${city}",
        "${state}",
        "${zip}",
        "${phone}"
        )`);
    });
    resolve();
  });
};

