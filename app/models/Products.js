const { Database } = require('sqlite3').verbose();
const path = require('path');
const db = new Database(path.join(__dirname, '../..', 'db', 'bangazon.sqlite'));

const prodObj =[{product_id:1, seller_id:1, product_type_id:1, title:"shoe",price:"6.99", description:"classy fun", create_date:"2017-09-01", quantity:1 }]

module.exports.getAllProducts = (id)=>{
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
              WHERE product.product_id = ${id}`, 
              function (err, rows) {
                  resolve(this.changes);
              });
      }
  });
};

