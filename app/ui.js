"use strict";

// 3rd party libs
const { red, magenta, blue } = require("chalk");
const prompt = require("prompt");
const colors = require("colors/safe");
const path = require("path");
const { Database } = require("sqlite3").verbose();
prompt.message = colors.blue("Bangazon Corp");

// app modules
const {
  promptNewCustomer,
  promptAllCustomers
} = require("./controllers/customerCtrl");
const { new_customer } = require("./models/Customer");
const db = new Database(path.join(__dirname, "..", "db", "bangazon.sqlite"));
const { setActiveCustomer, getActiveCustomer } = require("./activeCustomer");
const {promptNewCustomer,promptAllCustomers} = require("./controllers/customerCtrl");
const { new_customer } = require("./models/Customer");
const db = new Database(path.join(__dirname, "..", "db", "bangazon.sqlite"));
const { setActiveCustomer, getActiveCustomer } = require("./activeCustomer");
const {promptAddPayment,createPayment} = require("./controllers/addpaymentCtrl");
const {promptAddToCart, addNewProduct, updateProductArray, updateProducts, removeProduct} = require("./controllers/productCtrl");
const { displayRevReport } = require("./controllers/revenueCtrl");

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
          module.exports.displayWelcome();
        });
      break;
    // Allows user to select the customer to make active
    case "2":
      promptAllCustomers().then(customerSelect => {
        setActiveCustomer(customerSelect.customer_id);
        module.exports.displayWelcome();
      });
      break;
    //Allow User to Show Revenue Report
    case "3":
      promptAddPayment().then(paydata => {
        createPayment(paydata);
        module.exports.displayWelcome();
      });
      break
        // Add product to shopping cart
    case "4":
      promptAddToCart(id)   
      break;

    case "6":
      // Add a Product to Sell
      addNewProduct(id)
      //main menus prompts
      
      break;
  
    case "7":
      // Update a Product to Sell
      
      updateProductArray(id)
      break;

    case "8":
    // Remove a Product to Sell
    
      removeProduct(id);
      break;
    case "9":
      displayRevReport().then(done => {
          if (!done) {
          console.log("");
          console.log(colors.red("THIS USER HAS NO SALES"));
          console.log("");
          } else {
            backToMenu();
          }
        });
        break;  
  }
};

// Displays the actual main menu in console
module.exports.displayWelcome = () => {
  let headerDivider = `${colors.america(
    "*********************************************************"
  )}`;
  return new Promise((resolve, reject) => {
    console.log(`
  ${headerDivider}
  ${colors.red("**  Welcome to Bangazon! Command Line Ordering System  **")}
  ${colors.red(`current Active Customer ${getActiveCustomer().id}`)}
  ${headerDivider}
  ${colors.america("1.")} ${colors.white("Create a customer account")}
  ${colors.america("2.")} ${colors.white("Choose active customer")}
  ${colors.america("3.")} ${colors.white("Create a payment option")}
  ${colors.america("4.")} ${colors.white("Add product to shopping cart")}
  ${colors.america("5.")} ${colors.white("Complete an order")}
  ${colors.america("6.")} ${colors.white("Add a Product to Sell")}
  ${colors.america("7.")} ${colors.white("Update a Product to Sell")}
  ${colors.america("8.")} ${colors.white("Remove a Customer Product from inventory")}
  ${colors.america("9.")} ${colors.white("Get revenue rep")}
  ${colors.america("10.")} ${colors.white("Leave Bangazon!")}`);
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

const backToMenu = () => {
  prompt.get(
    {
      name: "selection",
      description: "Would you like to go back to main menu? (Y/N)",
      message: "Please enter Y/N",
      pattern: /[YyNn]/
    },
    (err, { selection }) => {
      if (err) console.log("ERRRRRRRR", err);
      if (selection.toUpperCase() === "Y") {
        module.exports.displayWelcome();
      } else {
        return;
      }
    }
  );
};


