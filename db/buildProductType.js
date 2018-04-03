"use strict";
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/bangazon.sqlite');

///// BUILD PRODUCT TYPE TABLE /////
module.exports.build_prod_type_table = () => {
    return new Promise((resolve, reject) => {
        db.run('DROP TABLE IF EXISTS product_type')
        .run(`CREATE TABLE IF NOT EXISTS product_type 
        (type_id INTEGER PRIMARY KEY,
        type TEXT)`, 
            (err) => {
                if (err) reject(err);
                resolve("done");
            });
    });
};