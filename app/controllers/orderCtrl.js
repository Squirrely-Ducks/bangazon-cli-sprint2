
'use strict';
const prompt = require('prompt');
const colors = require("colors/safe");
const { getActiveOrder, getAllOrderProduct } = require('../models/Order')
let headerDivider = `${colors.america(
    "*********************************************************"
)}`;

module.exports.promptCompleteOrder = (prods) => {
    return new Promise((resolve, reject) => {
        console.log(`  
${headerDivider}
                ${colors.red("Active Order")}
${headerDivider}
                `)
        for (let i = 0; i < prods.length; i++) {
            console.log(`${prods[i].title}, ${prods[i].price}`)
        }
        console.log("Complete This order y/n")
        prompt.get([{
            name: "Complete",
            conform: function (v) { return v === 'y' || v === 'n' },
            message: "Please choose to y/n to complete this order or not"
        }], function (err, choice) {
            if (err) {
                return reject(err)
            }
            else {
                resolve(choice)
            }
        });
    });
}

