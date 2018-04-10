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

module.exports.getCompletedOrders = (id) => {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT [order].order_id, customer.first_name, customer.last_name
            FROM order_product
            JOIN [order]
            ON [order].order_id = order_product.order_id
            JOIN product
            ON product.product_id = order_product.product_id
            JOIN customer
            ON customer.customer_id = product.seller_id
            WHERE [order].payment_type_id is not null
            AND product.seller_id = ${id}
            GROUP BY [order].order_id 
        `, (err, data ) => {
            err ? reject(err) : resolve(data);
        });
    });
};

module.exports.getRevProducts = (orderId, sellerId)=> {
    return new Promise((resolve, reject) => {
        db.all(`
        SELECT order_product.order_id, product.product_id,  
        COUNT(order_product.product_id) as count, product.title, product.price
        FROM order_product
        JOIN product
        ON product.product_id = order_product.product_id
        JOIN [order]
        ON [order].order_id = order_product.order_id
        WHERE  order_product.order_id = ${orderId}
        AND product.seller_id = ${sellerId}
        GROUP BY order_product.product_id
        `, (err, report) => {
            err ? reject(err) : resolve(report);
        });
    });
}

