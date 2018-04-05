

const { assert: {equal,deepEqual,isNaN,isArray, isFunction, isNumber, isObject, changesBy} } = require('chai');
const { newProduct,getAllProducts, getOneProduct, updateProduct, deleteProduct  } = require('../app/models/Products.js')

  
describe('get products suite',()=>{
  const prodObj = [{"product_id":1,"seller_id":10,"product_type_id":1,"title":"Fantastic Frozen Bacon","price":"327.00","description":"vertical e-enable models","create_date":"2017-12-13T00:13:40.659Z","quantity":19}]

  it('it should be a function', ()=>{
   isFunction( getAllProducts )
  });
  it('it should return an array',()=>{
    return getAllProducts()
    .then((data)=>{
      isArray(data);
    })
  })
  it('the array should contain specific object keys/values',()=>{
    return getAllProducts()
    .then((data)=>{
      let expected = prodObj
      deepEqual( data[0], expected[0] )
    })
  });
});

describe('get one product suite',()=>{
  const prodObj = [{"product_id":1, "seller_id":10,"product_type_id":1,"title":"Fantastic Frozen Bacon","price":"327.00","description":"vertical e-enable models","create_date":"2017-12-13T00:13:40.659Z","quantity":19}]
  it('it should be a function', ()=>{
    isFunction( getOneProduct )
   });
   it('should return an object', () => {
    return getOneProduct(1)
        .then(data => {
            isObject(data)
        });
  });
  it('should return the correct object', () => {
    return getOneProduct(1)
        .then(data => {
            deepEqual(data, prodObj[0])
        });
  });
})


describe('add products suite',()=>{
 let id;
  it('it should be a function',()=>{
    isFunction( newProduct );
  });
  it('should return a number',()=>{
    return newProduct( 1, 1, "shoe", "6.99", "classy fun", "2017-09-01T00:13:40.659Z", 1)
    .then(productId=>{
      isNumber(productId);
      deleteProduct(productId)
    })
  });

  it('should create the correct object in the database', () => {
    let id;
    return newProduct( 2, 1, "cookie", "3.50", "good eats", "2017-09-03T00:13:40.659Z", 1)
        .then(productId => {
          id = productId
          return getOneProduct(productId)
        })
        .then(newProd => {
          equal(id, newProd.product_id)
          deleteProduct(id)
        })
       
  });
});

describe('update products suite',()=>{
  let id;
  it('it should be a function',()=>{
        isFunction( updateProduct );
  })
  it('the new object should reflect the changes',()=>{
    return updateProduct(2, ["title"],["Fantastic Frozen Bacon Trees"])
    .then(data => {
      return getOneProduct(2);
      equal(1,data)
    })
  })
})









