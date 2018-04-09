'use strict';


// 3rd party libs
const colors = require("colors/safe");
const prompt = require('prompt');

// app modules
const { get_all_customers, get_one_customer } = require('../models/Customer');
const { newProduct,getAllProducts, getOneProduct, updateProduct, deleteProduct,getAllProductsByCust, getOneProductByCust, getProdsNotOnOrder  } = require('../models/Products');
const { createNewOrder, getAllOrders, getOneOrder, getAllOrderProduct, addOrderProd, deleteOrder, deleteOrderProd, completeOrder } = require('../models/Order');
const {setActiveCustomer, getActiveCustomer } = require('../activeCustomer');


//HELPER FUNCTIONS

// get current time for create date
const time = ()=>{
   let  now = new Date();
   return now.toISOString()
}

// validate active cusotmer is chosen
const validator = (id)=>{
  if (null === id){
      console.log(`${colors.bgRed(`please set an active customer`)}`)
  } else return id
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
      console.log("sorry all customer products are on orders data cannot be altered")
    } else {}
    return openArray;
}


//UI LAYOUT

let addProdHeader = `${colors.america(
    `*********************************************************`
  )}`;



  
//// PROMPTS FOR UI 
let promptNewProduct = () => {
    return new Promise( (resolve, reject) => {
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

  let promptUpdateProduct = () => {
    return new Promise( (resolve, reject) => {
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

  let subMenuPrompt = (prods)=>{
    return new Promise( (resolve, reject) => {
      console.log("Please select a product to update")
    for(let i = 0; i < prods.length; i++){
      console.log(`${prods[i].product_id}. ${prods[i].title}`);
    }
    prompt.get
      ([{
        name: "product_id",
        description: "Please make a selection",
      }],
      function(err,product) {
        if(err) {
          return reject(err)
        }
        else {
          // console.log(product);
          resolve (product.product_id);
        } 
      })
    })
  }

  let subMenuDeletePrompt = (prods)=>{
    return new Promise( (resolve, reject) => {
      console.log("Please select a product to delete")
    for(let i = 0; i < prods.length; i++){
      console.log(`${prods[i].product_id}. ${prods[i].title}`);
    }
    prompt.get
      ([{
        name: "product_id",
        description: "Please make a selection",
      }],
      function(err,product) {
        if(err) {
          return reject(err)
        }
        else {
          // console.log(product);
          resolve (product.product_id);
        } 
      })
    })
  }

  let subMenuChooseOrderPrompt = (openOrders)=>{
    return new Promise( (resolve, reject) => {
      console.log("Please select an order to add to")
    for(let i = 0; i < openOrders.length; i++){
      console.log(`Order numer: ${openOrders[i].order_id} `);
    }
    prompt.get
      ([{
        name: "order_id",
        description: "Please make a selection",
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

  let subMenuChooseProductPrompt = (products)=>{
    return new Promise( (resolve, reject) => {
      console.log("Please select a product to add to order")
    for(let i = 0; i < products.length; i++){
      console.log(`${products[i].product_id}. ${products[i].title}: ${products[i].description}, ONLY $${products[i].price}! `);
    }
    prompt.get
      ([{
        name: "product_id",
        description: "Please make a selection",
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

//////// FUNCTIONS FOR UI
module.exports.promptAddToCart = (id) => {
  let orderId;
  let prodId;
    // validator(id)
    console.log(addProdHeader);

    //GETTING ORDERS TO UPDATE
    getAllOrders(id)
    .then((orders)=>{
      return openOrderFilter(orders); 
    }).then((openOrders)=>{
      return subMenuChooseOrderPrompt(openOrders)
    }).then((orderChoiceId)=>{
      orderId = orderChoiceId

      //refactor here, new chain
      return getAllProducts()
    }).then((products)=>{
      return subMenuChooseProductPrompt(products)
    }).then((productId)=>{
        return prodId = productId;
      //refactor here, new chain
        
    }).then((data)=>{
      let order_id = orderId;
      let product_id = prodId;
      return addOrderProd( {order_id, product_id} )
    }).then((data)=>{
      //update quantity
      return getOneProduct((prodId))
    }).then((data)=>{
        
      let columns = Object.keys(data);      
      let values = Object.values(data);
      values.splice(7,1,(data.quantity - 1))
      return updateProduct(+prodId, columns, values)
    })
  

};


  //ADDING A PRODUCT
module.exports.addNewProduct = (id)=>{
    console.log(addProdHeader);
    console.log('Add a product');
    console.log(addProdHeader);
    promptNewProduct(id)
    .then((data)=>{
        data.seller_id = id;
        data.create_date = time();
        return data
    }).then((data)=>{
        newProduct(data.seller_id, data.product_type_id, data.title, data.price, data.description, data.create_date, data.quantity);
    })
}
     
    //UPDATING A PRODUCT
module.exports.updateProductArray = (id)=>{  
  return new Promise( (resolve, reject) => {
  let prodId;

  console.log(addProdHeader);
  console.log('Update a product');
  console.log(addProdHeader);

  getProdsNotOnOrder()
    .then((prods)=>{
      return productFilter(prods,id)
    }).then(prods=>{
      return subMenuPrompt(prods)
    }).then((choosenProd)=>{
      prodId = choosenProd;
      return promptUpdateProduct()
    }).then((data)=>{
      let columns = Object.keys(data);
      columns.splice(0, 0, "product_id")
      columns.splice(1,0, "seller_id")
      let values = Object.values(data);
      values.splice(0, 0, +prodId)
      values.splice(1,0, +id)
      updateProduct(prodId, columns, values);
    })
  })
}


//DELETING A PRODUCT
module.exports.removeProduct = (id)=>{
    console.log(addProdHeader);
    console.log('Delete a product')
    console.log(addProdHeader);

    getProdsNotOnOrder()
    .then((prods)=>{
      return productFilter(prods,id)
    }).then(prods=>{
      return subMenuDeletePrompt(prods)
    }).then((chosenProd)=>{
      return deleteProduct(chosenProd)
    })
}
