'use strict';

const prompt = require('prompt');
const colors = require("colors/safe");


let headerDivider = `${colors.america(
    "*********************************************************"
)}`;

module.exports.promptMakePayment = (types) => {
    return new Promise((resolve, reject) => {
        console.log(types, 'in prompt')
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