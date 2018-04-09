'use strict';

let activeCustomer = {
  id: null
}

module.exports.setActiveCustomer = (id) => {
  activeCustomer.id = id;
  console.log('activeCust', activeCustomer);
  
}

module.exports.getActiveCustomer = () => activeCustomer;
