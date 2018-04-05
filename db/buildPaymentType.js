"use strict";
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("db/bangazon.sqlite");
const { readFileSync } = require('fs');

const payment_type_data = JSON.parse(readFileSync("./data/json/paymentType.json"));


///// BUILD PAYMENT TABLE /////
module.exports.build_payment_type_table = () => {
    return new Promise((resolve, reject) => {
        db.run(`DROP TABLE IF EXISTS payment_type`)
            .run(`CREATE TABLE IF NOT EXISTS payment_type 
        (payment_type_id INTEGER PRIMARY KEY,
        customer_id INT,
        type INT,
        account_number INT,
        FOREIGN KEY (customer_id) REFERENCES customers (customer_id))`,
                (err) => {
                    if (err) reject(err);
                    resolve(insert_payment_type_data());
                });
    });
}

const insert_payment_type_data = () => {
    return new Promise((resolve, reject) => {
        payment_type_data.forEach(({
            customer_id,
            type,
            account_number
        }) => {
            db.run(`INSERT INTO payment_type
            VALUES (${null},
              ${customer_id}, 
              "${type}", 
              ${account_number})`,
                () => {
                    resolve();
                });
        });
    });
};