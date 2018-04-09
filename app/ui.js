"use strict";

// 3rd party libs
const { red, magenta, blue } = require("chalk");
const prompt = require("prompt");
const colors = require("colors/safe");
const path = require("path");
const { Database } = require("sqlite3").verbose();
prompt.message = colors.blue("Bangazon Corp");

// app modules
const { promptNewCustomer, promptAllCustomers } = require("./controllers/customerCtrl");
const { new_customer } = require("./models/Customer");
const db = new Database(path.join(__dirname, "..", "db", "bangazon.sqlite"));
const {setActiveCustomer, getActiveCustomer } = require('./activeCustomer')
// Start Program
prompt.start();

// Main Menu Options for CLI
let mainMenuHandler = (err, userInput) => {
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
      promptAllCustomers()
        .then((customerSelect)=>{
          setActiveCustomer(customerSelect.customer_id);
          module.exports.displayWelcome();
        })
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
  ${colors.america("6.")} ${colors.white("Get revenue rep")}
  ${colors.america("7.")} ${colors.white("Leave Bangazon!")}`);
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
