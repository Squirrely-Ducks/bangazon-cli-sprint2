
'use strict';
const prompt = require('prompt');
const colors = require("colors/safe");
const { getActiveOrder, getAllOrderProduct, completeOrder } = require('../models/Order')
const { getTypesByCustomer } = require('../models/PaymentType')
let headerDivider = `${colors.america(
    "*********************************************************"
)}`;


const subCompleteOrder = (prods) => {
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
const promptMakePayment = (types) => {
    return new Promise((resolve, reject) => {
        // console.log(types, 'in prompt')
        console.log(`  
${headerDivider}
                    ${colors.red("Active Order")}
${headerDivider}
    `)
        let idArr = [];
        for (let i = 0; i < types.length; i++) {
            idArr.push(types[i].payment_type_id);
            console.log(`${types[i].payment_type_id}.  ${types[i].type}, ${types[i].account_number}`)
        }
        console.log(`Select payment type to complete order`)
        prompt.get([{
            name: "type",
            conform: function (v) { return idArr.includes(+v) },
            message: "Please select one of the listed payment types"
        }], function (err, type) {
            if (err) {
                return reject(err)
            }
            else {
                resolve(type)
            }
        });
    })
}

module.exports.promptCompleteOrder = (acId) => {
    return new Promise((resolve, reject) => {
        let actOrder;
        getActiveOrder(acId)
            .then(order => {
                if (order === undefined) throw (`${colors.bgRed("There is no open order for this customer")}`)
                else {
                    actOrder = order;
                    return getAllOrderProduct(order.order_id)
                }
            }).then(prods => {
                if (prods.length < 1) throw (`${colors.bgRed("There are no products on this order. Please add a product before completing order")}`)
                else {
                    return subCompleteOrder(prods)
                }
            }).then(choice => {
                if (choice.Complete === 'n') throw (`${colors.bgRed("You have chosen not to complete this order")}`)
                else return getTypesByCustomer(actOrder.order_id);
            })
            .then(types => {
                if (types.length < 1) throw (`${colors.bgRed("This customer does not have a saved payment account. Please add one to continue completing this order.")}`)
                else return promptMakePayment(types)

            }).then(type => {
                if (type === undefined) throw (`${colors.bgRed("You shouldnt be seeing this, if youre seeing this, something went horribly wrong")}`)
                else {
                   console.log(`${colors.bgBlue("You have successfuly completed this order. Have a nice day!")}`)
                    
                    resolve(completeOrder(actOrder.order_id, type.type))
                }
            })
            .catch(err => {
                console.log(err);
                resolve();
            });
    });

}