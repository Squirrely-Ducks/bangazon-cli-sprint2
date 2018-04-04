'use strict';
const { Database } = require('sqlite3').verbose();
const path = require('path');

const db = new Database(path.join(__dirname, '../..', 'db', 'bangazon.sqlite'));

module.exports.createNewOrder = ({customer_id, payment_type_id, create_date}) => {
    return new Promise ((resolve,reject)=>{
        db.run(`INSERT INTO [order] VALUES (
            null,
            "${customer_id}",
            "${payment_type_id}",
            "${create_date}")`,
            function (err,order) {
                if(err){
                    console.log(err)
                    reject(err);
                }
                resolve(this.lastID);
            })
    })
}

module.exports.getAllOrders = (id) => {
    return new Promise ((resolve, reject)=>{
        db.all(` SELECT *
                FROM [order]
                WHERE customer_id = ${id}`,
            (err, order)=>{
                if(err) return reject(err);
                resolve(order);
            })
    })
}

module.exports.getOneOrder = (id) => {
    return new Promise ((resolve, reject) => {
        db.all(`SELECT *
                FROM [order]
                WHERE order_id = ${id}`,
                (err, oneOrder)=>{
                if(err) return reject(err);
                resolve(oneOrder)
            })
    })
}