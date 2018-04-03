"use strict";
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("db/bangazon.sqlite");

// create tables for payment types
module.exports.build_payment_type_table = () => {
    return new Promise((resolve, reject) => {
        db.run(`DROP TABLE IF EXISTS payment_type`);
        db.run(`CREATE TABLE IF NOT EXISTS payment_type 
      (payment_type_id INTEGER PRIMARY KEY,
      customer_id INT,
      type INT,
      account_number INT,
      FOREIGN KEY (customer_id) REFERENCES customers (customer_id))`
            , () => {
                resolve();
            });
    });
};