"use strict";
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/bangazon.sqlite');

module.exports.build_order_product_table = () => {
    return new Promise((resolve, reject) =>{
        db.serialize(() =>{
            db.run('DROP TABLE IF EXISTS order_product')
                .run(`CREATE TABLE IF NOT EXISTS order_product (
                    order_id INTEGER,
                    product_id INTEGER,
                    FOREIGN KEY (order_id) REFERENCES [order](order_id) ON DELETE CASCADE,
                    FOREIGN KEY (product_id) REFERENCES product(prod_id) ON DELETE CASCADE
                )`, (err) =>{
                    if (err) reject(err);
                    resolve();
                });
            });
        });
    };

