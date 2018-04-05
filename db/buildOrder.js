"use strict";

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/bangazon.sqlite');
const {
    readFileSync
} = require("fs");
const orderData = JSON.parse(readFileSync("./data/json/orders.json"));

///// BUILD ORDER TABLE /////
module.exports.build_order_table = () => {
    return new Promise((resolve, reject) => {
        db.run(`DROP TABLE IF EXISTS [order]`);
        db.run(`CREATE TABLE IF NOT EXISTS [order] 
        (order_id INTEGER PRIMARY KEY,
        customer_id INT,
        payment_type_id INT, 
        create_date TEXT, 
        FOREIGN KEY (customer_id) REFERENCES customer (customer_id),
        FOREIGN KEY (payment_type_id) REFERENCES payment_type (payment_type_id)) `,
            (err) => {
                if (err) reject(err);
                resolve(insert_order_date());
            });
    });
}

const insert_order_date = () => {
    return new Promise((resolve, reject) => {
        orderData.forEach(({
            customer_id,
            payment_type_id,
            create_date
        }) => {
            db.run(
                `INSERT INTO [order]
        VALUES (${null}, 
          ${customer_id}, 
          ${payment_type_id}, 
          "${create_date}"
        )`, () => {
                    resolve();
                }
            );
        });
    });
};