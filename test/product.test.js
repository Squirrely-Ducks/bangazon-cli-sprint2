// import { get } from 'https';

const { assert: {equal,deepEqual,isNaN,isArray, isFunction} } = require('chai');
const { newProduct,getAllProducts } = require('../app/models/Products.js')

  
describe('get products suite',()=>{
  const activeCustomer = {id: 2};
  const prodObj = [{product_id:1, seller_id:1, product_type_id:1, title:"shoe",price:"6.99", quantity:1 }]

  it('it should be a function', ()=>{
   isFunction( getAllProducts )
  });
  it('it should return an array',()=>{
    return getAllProducts(activeCustomer)
    .then((data)=>{
      isArray(data);
    })
  })
  it('the array should contain objects',()=>{
    return getAllProducts(activeCustomer)
    .then((data)=>{
      let expected = prodObj
      deepEqual( data[0], expected[0] )
    })
  });
});

describe('add products suite',()=>{
  const activeCustomer = {id: 2};
  const prodObj = [{product_id:1, seller_id:1, product_type_id:1, title:"shoe",price:"6.99", quantity:1 }]

  it('it should be a function',()=>{
    isFunction( newProduct )
  })
  // it('')
})










