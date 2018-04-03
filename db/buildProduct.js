const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("db/bangazon.sqlite");

module.exports.build_product_table = () => {
    return new Promise((resolve, reject) => {
        db.run(`DROP TABLE IF EXISTS product`)
        .run(`CREATE TABLE IF NOT EXISTS product (
            product_id INTEGER PRIMARY KEY,
            seller_id INTEGER,
            product_type_id INTEGER,
            title TEXT,
            price TEXT,
            description TEXT,
            create_date TEXT,
            quantity INTEGER
            FOREIGN KEY (product_type_id) REFERENCES product_type(type_id)
            FOREIGN KEY (seller_id) REFERENCES customer(customer_id)
            )`, (err) => {
                 if (err) reject(err);
                resolve('Product Table Engaged!');
            });
    });
}