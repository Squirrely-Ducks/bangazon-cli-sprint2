

const { assert: {equal,deepEqual,isNaN,isArray, isFunction, isNumber, isObject} } = require('chai');
const { newProduct,getAllProducts, getOneProduct, updateProduct } = require('../app/models/Products.js')

  
describe('get products suite',()=>{
  const activeCustomer = {id: 6};
  const prodObj = [{product_id:11, seller_id:1, product_type_id:1, title:"shoe",price:"6.99", description:"classy fun", create_date:"2017-09-01", quantity:1 }]

  it('it should be a function', ()=>{
   isFunction( getAllProducts )
  });
  it('it should return an array',()=>{
    return getAllProducts(activeCustomer)
    .then((data)=>{
      isArray(data);
    })
  })
  it('the array should contain specific object keys/values',()=>{
    return getAllProducts(activeCustomer)
    .then((data)=>{
      let expected = prodObj
      deepEqual( data[10], expected[0] )
    })
  });
});

describe('get one product suite',()=>{
  const prodObj = [{product_id:11, seller_id:1, product_type_id:1, title:"shoe",price:"6.99", description:"classy fun", create_date:"2017-09-01", quantity:1 }]
  it('it should be a function', ()=>{
    isFunction( getOneProduct )
   });
   it('should return an object', () => {
    return getOneProduct(11)
        .then(data => {
            isObject(data)
        });
  });
  it('should return the correct object', () => {
    return getOneProduct(11)
        .then(data => {
            deepEqual(data, prodObj[0])
        });
  });
})


describe('add products suite',()=>{
  const activeCustomer = {id: 2};
 
  it('it should be a function',()=>{
    isFunction( newProduct );
  });
  it('should return a number',()=>{
    return newProduct( 1, 1, "shoe", "6.99", "classy fun", "2017-09-01", 1)
    .then(productId=>{
      isNumber(productId);
    })
  });
  it('should create the correct object in the database', () => {
    return newProduct( 2, 1, "cookie", "3.50", "good eats", "2017-09-03", 1)
        .then(productId => {
            return getOneProduct(11)
        .then(newProd => {
            equal(11, newProd.product_id)
        });

        });
  });
});

describe('update products suite',()=>{

})
//update: get all prods by cus8tomer id, update selected product










