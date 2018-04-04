'use strict';
const { Database } = require('sqlite3').verbose();
// const { setActiveCustomer, getActiveCustomer } = require('./activeCustomer');
const path = require('path');

const db = new Database(path.join(__dirname, '../..', 'db', 'bangazon.sqlite'));


module.exports.createType = (customer_id, type, account_number) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO payment_type VALUES(
        null,
        ${customer_id},
        "${type}",
        ${account_number}
        )`, function (err) {
                console.log(err)
                if (err) return reject(err)
                resolve(this.lastID);
            });
    });
}

module.exports.getTypesByCustomer = (id) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM payment_type
        WHERE customer_id = ${id} `,
            (err, types) => {
                if (err) return reject(err);
                resolve(types);
            });
    });
}
module.exports.getType = (id) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * from payment_type
        WHERE payment_type_id=${id}`,
            (err, type) => {
                if (err) return reject(err);
                resolve(type);
            });
    });
}