"use strict";

// 3rd party libs
const { red, magenta, blue } = require("chalk");
const prompt = require("prompt");
const colors = require("colors/safe");
const path = require("path");
const { Database } = require("sqlite3").verbose();
prompt.message = colors.blue("Bangazon Corp");

// app modules
const {promptAddToCart, subMenuChooseOrderPrompt, getProdArray, subMenuChooseProductPrompt, prepData, adjustQuantity, sendNewQuantity, promptNewProduct, addNewProduct, sendNewProductData, updateProductArray,subMenuPrompt, promptUpdateProduct, updateProducts, sendUpdateProd, removeProduct, subMenuDeletePrompt, deleteProd} = require("./controllers/productCtrl");
const {alert}= require("./animation");
const { promptNewCustomer, promptAllCustomers } = require("./controllers/customerCtrl");
const { new_customer } = require("./models/Customer");
const db = new Database(path.join(__dirname, "..", "db", "bangazon.sqlite"));
const { setActiveCustomer, getActiveCustomer } = require("./activeCustomer");
const {promptAddPayment,createPayment} = require("./controllers/addpaymentCtrl");
const {promptAddToCart, addNewProduct, updateProductArray, updateProducts, removeProduct} = require("./controllers/productCtrl");



function validator(id){
  if (!id){
      console.log(`${colors.bgRed(`please set an active customer`)}`);
      // promptAllCustomers()
      // setActiveCustomer(customerSelect.customer_id);
  } 
};


// Start Program
prompt.start();

// Main Menu Options for CLI
let mainMenuHandler = (err, userInput) => {
  let id = getActiveCustomer().id
  // Allows user to Create a new customer and push to db
  switch (userInput.choice) {
    case "1":
      promptNewCustomer()
        .then(custData => {
          console.log("customer data to save", custData);
          //save customer to db
          return new_customer(custData);
        })
        .then(() => {
          displayWelcome();
        });
      break;
    // Allows user to select the customer to make active
    case "2":
      promptAllCustomers()
        .then((customerSelect)=>{
          setActiveCustomer(customerSelect.customer_id);
          displayWelcome();
        })
        break;
      
    case "4":
    //ADD PRODUCT TO ORDER
    let orderId;
    let prodId;

      // validator(id);
      promptAddToCart(id)
      .then((array)=>{
       return subMenuChooseOrderPrompt(array)
      }).then((orderChoiceId)=>{
        orderId = orderChoiceId
        return getProdArray()
      }).then((products)=>{
        return subMenuChooseProductPrompt(products)
      }).then((productId)=>{
        prodId = productId;
        return prepData(orderId,prodId) 
      }).then((data)=>{
        return adjustQuantity(prodId) 
      }).then((data)=>{
        return sendNewQuantity(data,prodId)
      }).then(()=>{
        displayWelcome();        
      })
      break;

    case "6":
      // Add a Product to Sell
      promptNewProduct(id)
      .then((data)=>{
        return sendNewProductData(data,id)
      }).then(()=>{
        displayWelcome();
      })
      break;

    case "7":
    // Update a Product to Sell
      let productId;    
      updateProductArray(id)
      .then((prods)=>{
        return subMenuPrompt(prods)
      }).then((prodId)=>{
        productId = prodId
        return promptUpdateProduct()
      }).then((data)=>{
        return sendUpdateProd(data,productId,id)
      }).then(()=>{
        displayWelcome();
      })
      break;

    case "8":
    // Remove a Product to Sell
      removeProduct(id)
      .then((prods)=>{
        return subMenuDeletePrompt(prods)
      }).then((prodChoice)=>{
        return deleteProd(prodChoice)
      }).then(()=>{
        displayWelcome();
      })
      break;

      case "10":
      alert()
  }
};

// Displays the actual main menu in console
let displayWelcome = () => {
  let headerDivider = `${colors.america(
    "*********************************************************"
  )}`;
  return new Promise((resolve, reject) => {
    console.log(`
  ${headerDivider}
  ${colors.red("**  Welcome to Bangazon! Command Line Ordering System  **")}
  ${colors.red(`current Active Customer ${getActiveCustomer().id}`)}
  ${headerDivider}
  ${colors.america("1.")} ${colors.red("Create a customer account")}
  ${colors.america("2.")} ${colors.red("Choose active customer")}
  ${colors.america("3.")} ${colors.red("Create a payment option")}
  ${colors.america("4.")} ${colors.red("Add product to shopping cart")}
  ${colors.america("5.")} ${colors.red("Complete an order")}
  ${colors.america("6.")} ${colors.red("Add a Product to Sell")}
  ${colors.america("7.")} ${colors.red("Update a Product to Sell")}
  ${colors.america("8.")} ${colors.red("Remove a Customer Product from inventory")}
  ${colors.america("9.")} ${colors.red("Get revenue rep")}
  ${colors.america("10.")} ${colors.red("Leave Bangazon!")}`);
    prompt.get(
      [
        {
          name: "choice",
          description: "Please make a selection"
        }
      ],
      mainMenuHandler
    );
  });
};


module.exports = {
   displayWelcome
};