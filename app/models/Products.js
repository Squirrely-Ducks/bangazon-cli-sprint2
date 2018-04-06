const { Database } = require('sqlite3').verbose();
const path = require('path');
const db = new Database(path.join(__dirname, '../..', 'db', 'bangazon.sqlite'));



module.exports.getAllProducts = ()=>{
    return new Promise((resolve, reject) =>{ 
      db.all(
        `SELECT *
        FROM product`,
        (err, product) =>{
            if(err) return reject(err);
            resolve(product);
        }); 
    });
};

module.exports.getOneProduct = (id) =>{
  return new Promise((resolve, reject) =>{
      db.get(
          `SELECT *
          FROM product
          WHERE product_id = "${id}" `,
          (err, product) => {
              if (err) return reject(err)
              resolve(product)
          });
  });
};

module.exports.getAllProductsByCust = (custId)=>{
    return new Promise((resolve, reject) =>{ 
      db.all(
        `SELECT *
        FROM product
        WHERE seller_id = ${custId}`,
        (err, product) =>{
            if(err) return reject(err);
            resolve(product);
        }); 
    });
};

module.exports.getOneProductByCust = (prodId,custId) =>{
    return new Promise((resolve, reject) =>{
        db.get(
            `SELECT *
            FROM product
            WHERE product_id = ${prodId} 
            AND seller_id = ${custId} `,
            (err, product) => {
                if (err) return reject(err)
                resolve(product)
            });
    });
  };

module.exports.newProduct = (seller_id, product_type_id, title, price, description, create_date, quantity)=>{
  return new Promise((resolve, reject) =>{ 
    db.run(` INSERT INTO product VALUES (

      null,
      ${seller_id},
      ${product_type_id},
      "${title}",
      "${price}",
      "${description}",
      "${create_date}",
      ${quantity}
      ) `, function(err, product) {
          if (err) {
              console.log(err);
              reject(err);
          }
        resolve( this.lastID )
    });
  });
};  

module.exports.updateProduct = (id, columns, values) => {
    return new Promise((resolve, reject) => {
        
        for (let i = 0; i < columns.length; i++) {
            db.run(`UPDATE product
                SET "${columns[i]}" = "${values[i]}"
                WHERE product_id = ${id}`, 
                function (err, rows) {
                    resolve();
                });
        };
    });
};

module.exports.deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        db.run (` DELETE FROM product
        WHERE product.product_id = ${id}`,
            (err, type) => {
                if (err) return reject(err);
                resolve(this);
            });
    });
};
