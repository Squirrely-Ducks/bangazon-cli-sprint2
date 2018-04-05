"use strict";
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/bangazon.sqlite');
const { readFileSync } = require('fs');
const productTypeData = JSON.parse(readFileSync('./data/json/productType.json'));

///// BUILD PRODUCT TYPE TABLE /////
module.exports.build_prod_type_table = () => {
    return new Promise((resolve, reject) => {
        db.run('DROP TABLE IF EXISTS product_type')
        .run(`CREATE TABLE IF NOT EXISTS product_type (
        type_id INTEGER PRIMARY KEY,
        type TEXT)`, 
            (err) => {
                if (err) reject(err);
                resolve(insert_prod_type_data());
            });
    });
};

const insert_prod_type_data = () => {
    return new Promise((resolve, reject) => {
        productTypeData.forEach(({type}) => {
            db.run(`INSERT INTO product_type VALUES (
                ${null},
                "${type}"
            )`, (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    });
};