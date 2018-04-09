'use strict';
const { Database } = require('sqlite3').verbose();
const path = require('path');

const db = new Database(path.join(__dirname, '../..', 'db', 'bangazon.sqlite'));

module.exports.createNewOrder = ({ customer_id, payment_type_id, create_date }) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO [order] VALUES (
            null,
            "${customer_id}",
            "${payment_type_id}",
            "${create_date}")`,
            function (err, order) {
                if (err) {
                    console.log(err)
                    reject(err);
                }
                resolve(this.lastID);
            });
    });
}

module.exports.getAllOrders = (id) => {
    return new Promise((resolve, reject) => {
        db.all(` SELECT *
                FROM [order]
                WHERE customer_id = ${id}`,
            (err, order) => {
                if (err) return reject(err);
                resolve(order);
            });
    });
}
module.exports.getActiveOrder = (id) => {
    return new Promise((resolve, reject) => {
        console.log('here', id)
        db.get(` SELECT *
                FROM [order]
                WHERE customer_id = ${id} 
                AND payment_type_id isnull`,
            (err, order) => {
                if (err) return reject(err);
                resolve(order);
            });
    });
}

module.exports.getOneOrder = (id) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT *
                FROM [order]
                WHERE order_id = ${id}`,
            (err, oneOrder) => {
                if (err) return reject(err);
                resolve(oneOrder)
            });
    });
}

module.exports.deleteOrder = (id) => {
    return new Promise((resolve, reject) => {
        db.run(`DELETE
                FROM [order]
                WHERE [order].order_id = ${id}`,
            function (err, order) {
                if (err) {
                    return reject(err)
                }
                resolve(this.changes);
            });
    });
}

module.exports.getAllOrderProduct = (id) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT product.*
                FROM order_product
                JOIN product
                ON product.product_id = order_product.product_id
                WHERE order_product.order_id = ${id}`,
            (err, orderProd) => {
                if (err) return reject(err);
                resolve(orderProd)
            });
    });
}

module.exports.addOrderProd = ({ order_id, product_id }) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT into order_product VALUES (
                ${order_id},
                ${product_id})`,
            function (err, orderProd) {
                if (err) {
                    console.log('error', err);
                    reject(err)
                }
                resolve(this.changes)
            });
    });
}
module.exports.deleteOrderProd = (id) => {
    return new Promise((resolve, reject) => {
        db.run(`DELETE
                FROM order_product
                WHERE order_product.order_id = ${id}`,
            function (err, order) {
                if (err) {
                    return reject(err)
                }
                resolve(this.changes);
            });
    });
}

module.exports.completeOrder = (id, type) => {
    return new Promise((resolve, reject) => {
        db.run(`UPDATE [order]
        SET payment_type_id = "${type}"
        WHERE order_id = "${id}"`,
            function (err, values) {
                resolve()
            });
    });
}

