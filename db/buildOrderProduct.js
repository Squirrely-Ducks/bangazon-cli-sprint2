"use strict";
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/bangazon.sqlite');
const { readFileSync } = require('fs');
const orderProducts = JSON.parse(readFileSync('./data/json/orderProduct.json'));


module.exports.build_order_product_table = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('DROP TABLE IF EXISTS order_product')
                .run(`CREATE TABLE IF NOT EXISTS order_product (
                    order_id INTEGER,
                    product_id INTEGER,
                    FOREIGN KEY (order_id) REFERENCES [order](order_id) ON DELETE CASCADE,
                    FOREIGN KEY (product_id) REFERENCES product(prod_id) ON DELETE CASCADE
                )`, (err) => {
                    if (err) reject(err);
                    resolve(insert_order_product_data());
                });
        });
    });
};

const insert_order_product_data = () => {
    return new Promise((resolve, reject) => {
        orderProducts.forEach(({order_id, product_id}) =>{
            db.run(`INSERT INTO order_product VALUES (
                ${order_id},
                ${product_id}
            )`, (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    });
};