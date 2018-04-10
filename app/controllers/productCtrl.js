'use strict';


// 3rd party libs
const colors = require("colors/safe");
const prompt = require('prompt');

// app modules
const { get_all_customers, get_one_customer } = require('../models/Customer');
const { newProduct,getAllProducts, getOneProduct, updateProduct, deleteProduct,getAllProductsByCust, getOneProductByCust, getProdsNotOnOrder  } = require('../models/Products');
const { createNewOrder, getAllOrders, getOneOrder, getAllOrderProduct, addOrderProd, deleteOrder, deleteOrderProd, completeOrder } = require('../models/Order');
const {setActiveCustomer, getActiveCustomer } = require('../activeCustomer');
// const {validator} = require('../validator');
      


colors.setTheme({
  
  input: 'grey',
  prompt: 'red',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'blue'
});
//HELPER FUNCTIONS
// get current time for create date
const time = ()=>{
  let  now = new Date();
  return now.toISOString()
}

//filter products not on orders
const productFilter = (products,id)=>{
  let prodArray = [];
  products.forEach(product=>{
    if (+id === +product.seller_id ){
      prodArray.push(product);
    } else { console.log("sorry all customer products are on orders data cannot be altered");}
  });
  return prodArray
}

//filter orders that are open
const openOrderFilter = (orders)=>{
  let openArray =[];
  orders.forEach(order => {
      if ( order.payment_type_id == null ){
          openArray.push(order);
      } else  {
          // orders.slice(order);   
      }
  });
    if (orders.length === 0){
      console.log("sorry all customer orders are closed")
    } else {}
    return openArray;
}

//filter products with no quantity
const filterNoneAvail = (prodArray)=>{
  let availArray = [];
  prodArray.forEach(prod=>{
    if (prod.quantity > 1){
      availArray.push(prod)
    }
  })
  return availArray;
}
///////////////////


//UI LAYOUT
let addProdHeader = `${colors.america(
    `*********************************************************`
  )}`;

//// PROMPTS FOR UI 
module.exports.promptNewProduct = ()=>{
    console.log(addProdHeader);
    console.log('Add a product');
    console.log(addProdHeader);

    return new Promise( (resolve, reject)=>{
      prompt.get([{
        name: 'product_type_id',
        description: 'Enter product type id',
        pattern: /^\d$/,
        message: 'please enter a valid product type id',
        type: 'number',
        required: true
      },{
        name: 'title',
        description: 'Enter Product Title',
        type: 'string',
        pattern: /^[a-zA-Z]+/,
        message: 'please enter a valid title',
        required: true
      }, {
        name: 'price',
        description: 'Enter price in the format xx.yy',
        type: 'string',
        pattern: /[0-9.]{3}[0-9]{2}/,
        message: 'enter a valid price',
        required: true
      }, {
        name: 'description',
        description: 'Enter product description',
        type: 'string',
        pattern: /^[a-zA-Z]+\s+/,
        message: 'please enter a valid description',
        required: true
      }, {
        name: 'quantity',
        description: 'Enter the quantity to sell',
        type: 'string',
        pattern: /[0-9]+/,
        message: 'please enter a valid quantity',
        required: true
      }], function(err, results) {
        if (err) return reject(err);
        resolve(results);
      })
    });
};

module.exports.promptUpdateProduct = ()=>{
    return new Promise( (resolve, reject)=>{
      prompt.get([{
        name: 'product_type_id',
        description: 'Enter product type id',
        type: 'string',
        pattern: /^\d$/,
        message: 'please enter a valid product type id',
        required: true
      }, {
        name: 'title',
        description: 'Enter Product Title',
        type: 'string',
        pattern: /^[a-zA-Z]+\s+/,
        message: 'please enter a valid title',
        required: true
      }, {
        name: 'price',
        description: 'Enter price in the format xx.yy',
        type: 'string',
        pattern: /[0-9.]{3}[0-9]{2}/,
        message: 'enter a valid price',
        required: true
      }, {
        name: 'description',
        description: 'Enter product description',
        type: 'string',
        pattern: /^[a-zA-Z]+\s+/,
        message: 'please enter a valid description',
        required: true
      }, {
        name: 'quantity',
        description: 'Enter the quantity to sell',
        type: 'string',
        pattern: /[0-9]+/,
        message: 'please enter a valid quantity',
        required: true
      }], function(err, results) {
        if (err) return reject(err);
        resolve(results);
      })
    });
};

module.exports.subMenuPrompt = (prods)=>{
    return new Promise( (resolve, reject)=>{
      console.log("Please select a product to update")
    for(let i = 0; i < prods.length; i++){
      console.log(`${prods[i].product_id}. ${prods[i].title}`);
    }
    prompt.get
      ([{
        name: "product_id",
        description: "Please make a selection",
        pattern:/^-?\d+\.?\d*$/,
        // conform: function(v){return !(+v > prods.length || +v < 1)},
        message: "Please choose a number from the above list" 
      }],
      function(err,product) {
        if(err) {
          return reject(err)
        }
        else {
          resolve (product.product_id);
        } 
      })
    })
}

module.exports.subMenuDeletePrompt = (prods)=>{
    return new Promise( (resolve, reject)=>{
      console.log("Please select a product to delete")
    for(let i = 0; i < prods.length; i++){
      console.log(`${prods[i].product_id}. ${prods[i].title}`);
    }
    prompt.get
      ([{
        name: "product_id",
        pattern:/^-?\d+\.?\d*$/,
        description: "Please make a selection",
      }],
      function(err,product) {
        if(err) {
          return reject(err)
        }
        else {
          resolve (product.product_id);
        } 
      })
    })
}

module.exports.subMenuChooseOrderPrompt = (openOrders)=>{
    return new Promise( (resolve, reject) => {
      console.log("Please select an order to add to")

      let idArray =[]
      for(let i = 0; i<openOrders.length;i++){
        idArray.push(openOrders[i].order_id)
      }
      // let str = idArray;
      // let regexp = `/[${str}]/gi`;
      // let matches_array = str.match(regexp);
      // console.log(str,regexp, matches_array)
      
    for(let i = 0; i < openOrders.length; i++){
      console.log(`Order number: ${openOrders[i].order_id} `);
    }
    prompt.get
      ([{
        name: "order_id",
        description: "Please make a selection",
        pattern: /^-?\d+\.?\d*$/,
        // conform: function(v){return !(v != matches_array)},
        message: "Please choose a number from the above list" 
      }],
      function(err,order) {
        if(err) {
          return reject(err)
        }
        else {
          resolve (order.order_id);
        } 
      })
    })
}

module.exports.subMenuChooseProductPrompt = (products)=>{
    console.log(addProdHeader);    
    return new Promise( (resolve, reject) => {
      console.log("Please select a product to add to order")


    for(let i = 0; i < products.length; i++){
      console.log(`${products[i].product_id}. ${products[i].title}: ${products[i].description}, ONLY $${products[i].price}! `);
    }
    prompt.get
      ([{
        name: "product_id",
        pattern: /^-?\d+\.?\d*$/,        
        description: "Please make a selection",
        // conform: function(v){return !(v != matches_array)},
        
      }],
      function(err, product) {
        if(err) {
          return reject(err)
        }
        else {
          resolve (product.product_id);
        } 
      })
    })
}

module.exports.subMenuConfirmPrompt = (products)=>{
  console.log(addProdHeader);
  return new Promise( (resolve, reject) => {
    prompt.get
      ([{
        name: "Complete",
            conform: function (v) { return v === "y" || v === "n" }, 
            message: "Please choose to y/n to complete this order or not"
      }],
      function(err, choice) {
        if(err) {
          return reject(err)
        }
        else {
          resolve (choice);
        } 
      })
    })
}
///////////////////

//////// FUNCTIONS FOR UI
//ADDING PRODUCTS TO CART 
module.exports.promptAddToCart = (id)=>{
  console.log(addProdHeader);
  return getAllOrders(id)
        .then((orders)=>{
          return openOrderFilter(orders); 
        })
}

module.exports.getProdArray = ()=>{
  return getAllProducts()
          .then((products)=>{
            return filterNoneAvail(products)
          })  
}

module.exports.prepData =  (orderId,prodId)=>{
  let order_id = orderId;
  let product_id = prodId;
  return addOrderProd( {order_id, product_id} )
}

module.exports.adjustQuantity = (prodId)=>{
  return getOneProduct(prodId)
}
    
module.exports.sendNewQuantity = (data,prodId)=>{   
  let columns = Object.keys(data);      
  let values = Object.values(data);
  values.splice(7,1,(data.quantity - 1))
  return updateProduct(+prodId, columns, values)
  .then(()=>{
    return console.log("Product added to order Successfully")    
  })
}
///////////////////

//CREATING A PRODUCT  
module.exports.sendNewProductData = (data,id)=>{
  data.seller_id = id;
  data.create_date = time();
  newProduct(data.seller_id, data.product_type_id, data.title, data.price, data.description, data.create_date, data.quantity)
  .then(()=>{
    return console.log("You added a new Product!")
  })
}
///////////////////

//UPDATING A PRODUCT
//GETS ALL AVAILABLE PRODUCTS TO UPDATE
module.exports.updateProductArray = (id)=>{  
  console.log(addProdHeader);
  console.log('Update a product');
  console.log(addProdHeader);
  return getProdsNotOnOrder()
        .then((prods)=>{
        return productFilter(prods,id)
        })
}

//PASSES IN UPDATED PRODUCT TO MODELER       
module.exports.sendUpdateProd = (data,prodId,id)=>{
  let columns = Object.keys(data);
  columns.splice(0, 0, "product_id")
  columns.splice(1,0, "seller_id")
  let values = Object.values(data);
  values.splice(0, 0, +prodId)
  values.splice(1,0, +id)
  updateProduct(prodId, columns, values)
  .then(()=>{
    return console.log("You added that product!")
  });
}
///////////////////

//DELETING A PRODUCT
//GETS ALL AVAILABLE PRODUCTS TO DELETE
module.exports.removeProduct = (id)=>{
  console.log(addProdHeader);
  console.log('Delete a product')
  console.log(addProdHeader);
  return getProdsNotOnOrder()
  .then((prods)=>{
    console.log("these", prods)
    return productFilter(prods,id)
  })
}
//PASSES IN PROMPT CHOICE TO MODELER       
module.exports.deleteProd = (chosenProd)=>{
  console.log(`You deleted a product!`)
  return deleteProduct(chosenProd)
}    
///////////////////





