const { Database } = require('sqlite3').verbose();
const path = require('path');

const prodObj = [{product_id:1, seller_id:1, product_type_id:1, title:"shoe",price:"6.99", quantity:1 }]

module.exports.getAllProducts = (id)=>{
    return new Promise((resolve, reject) =>{ 
      resolve(prodObj)   
    });
};

module.exports.newProduct = ()=>{
  return new Promise((resolve, reject) =>{ 
    resolve(prodObj)   
  });
};

