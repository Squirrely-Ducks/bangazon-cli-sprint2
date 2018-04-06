const { assert: { equal, isFunction, isArray, isObject, deepEqual } } = require("chai");
const { createNewOrder, getAllOrders, getOneOrder, getAllOrderProduct, addOrderProd, deleteOrder, deleteOrderProd, completeOrder } = require('../app/models/Order');
const bO = require('../db/buildOrder');

// after((done) => {
//     bO.build_order_table()
//         .then(() => {
//             done();
//         });
// });

// dummy data for order
let testOrder = {
    order_id: 1, customer_id: 1,
    payment_type_id: 1,
    create_date: "1/1/18"
}

let newOrder = {
    customer_id: 2,
    payment_type_id: 1,
    create_date: "1/1/18"
}

let testOrderProd = {
    order_id: 70,
    product_id: 1
}

describe('Tests for Orders', () => {
    describe("User should get all orders by customer", () => {
        it("get orders for customer", () => {
            isFunction(getAllOrders);
        });
        it('should return orders by customer id', () => {
            let id = 1
            return getAllOrders(id)
                .then((orders) => {
                    isArray(orders);
                })
        });
        it('should contain array obj', () => {
            let id = 1;
            let expected = [{}]
            return getAllOrders(id)
                .then((order) => {
                    isArray(order, expected);
                });
        });
    });

    describe('User can select one order', () => {
        it('should be a function', () => {
            isFunction(getOneOrder)
        });
        it('should return one order', () => {
            return getOneOrder(testOrder.order_id)
                .then((order) => {
                    isObject(order);
                })
        });
    });


    describe("User can create a new order", () => {
        it("should be create new order", () => {
            isFunction(createNewOrder);
        });
        it('should return an object', () => {
            return createNewOrder(newOrder)
                .then((id) => {
                    newOrder.order_id = id
                    return getOneOrder(id);
                })
                .then((order) => {
                    deepEqual(order, newOrder)
                    deleteOrder(order.order_id)
                })
        });


    });


    describe('user should get all products for order by id', () => {
        it('should be a function', () => {
            isFunction(getAllOrderProduct);
        });
        it('should return an array of obj', () => {
            getAllOrderProduct(testOrderProd.order_id)
                .then((orderProd) => {
                    isArray(orderProd)
                })
        });
        it('should return obj according to orderID', () => {
            let id = testOrderProd.order_id
            getAllOrderProduct(id)
                .then((orderProd) => {
                })
        })
    })

    describe('user should add to order_product table', () => {
        it('should be a function', () => {
            isFunction(addOrderProd);
        })
        it('should post to db', () => {
            return addOrderProd(testOrderProd)
                .then((changes) => {
                    equal(changes, 1)
                    deleteOrderProd(testOrderProd.order_id)
                })
        })
    })
    describe('complete order', () => {
        it('should be a function', () => {
            isFunction(completeOrder)
        })

        it('should have updated payment type', () => {
            return completeOrder(1, 1)
                .then(data => {
                    return getOneOrder(1)
                }).then(order => {
                    equal(order.payment_type_id, 1)
                });
        });
    });
});
