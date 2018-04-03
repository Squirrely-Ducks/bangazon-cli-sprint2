"use strict";

const sqlite3 = require('sqlite3').verbose();
const { readFileSync } = require("fs");
const db = new sqlite3.Database('db/bangazon.sqlite');


module.exports.build_order_table = () => {
    return new Promise((resolve, reject) => {
        db.run(`DROP TABLE IF EXISTS orders`);
        db.run(`CREATE TABLE IF NOT EXISTS orders 
        (order_id INTEGER PRIMARY KEY,
        customer_id INT,
        payment_type_id INT, 
        create_date TEXT, 
        FOREIGN KEY (customer_id) REFERENCES customer (customer_id),
        FOREIGN KEY (payment_type_id) REFERENCES payment_type (type_id)) `,
            (err) => {
                if (err) reject(err);

                resolve("done");
            });
    });
};

